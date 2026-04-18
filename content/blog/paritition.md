+++
title = "Partitioning in Distributed Systems: Notes from DDIA"
date = 2026-02-16
taxonomies = { tags = ["Design Data Intensive Applications"] }
+++

I've been continuing through "Designing Data-Intensive Applications" and now I'm on partitioning. After learning about replication, partitioning feels like the natural next step - it's how you actually scale a database horizontally. Here's what I've learned.

Partitioning (or sharding) is about splitting your data across multiple nodes. Each piece of data belongs to exactly one partition, and the whole point is to distribute both the data and the query load evenly. When you do this well, you can handle way more data and queries than a single machine ever could.

The tricky part? If you get it wrong, you end up with **skew** - where some partitions get way more load than others. A partition that gets hammered is called a **hot spot**, and it basically defeats the whole purpose of partitioning in the first place.

---

## Partitioning by Key Range

The simplest approach is to divide your data into continuous ranges of keys. Each partition gets a range - maybe one partition handles keys A-F, another handles G-M, and so on. If you know the boundaries, you can route requests directly to the right node.

The nice thing about this is that keys within a partition stay sorted, which makes range queries really fast. Say you're building a sensor system that uses timestamps as keys. You could have one partition per day, which makes it trivial to query "give me all readings from last week" - you just scan the relevant partitions.

But here's the problem: all your new writes go to the same partition (today's partition), while yesterday's partition sits there idle. That's a hot spot.

The fix is to use a **composite key** - something like `sensor_id + timestamp`. Now when thousands of sensors write data at the same time, those writes get spread across multiple partitions based on the sensor ID. Problem solved.

The trade-off? If you want to query multiple sensors over a time range, you now need to do separate range queries for each sensor. Nothing's free in distributed systems.

---

## Partitioning by Hash of Key

Instead of using the key directly, you hash it first. The hash determines which partition gets the data. A good hash function takes skewed keys and spreads them out evenly.

Say you're using user IDs as keys, and some users are way more active than others. If you partition by the raw user ID, you might get clustering. But if you hash the user ID first, those active users get distributed evenly across all your partitions. No hot spots from skewed keys.

The downside is brutal though: **you lose range queries**. Hashing destroys the natural order of keys. Adjacent keys that were next to each other are now scattered across different partitions. To do a range query, you'd have to hit every partition, which defeats the purpose. Some systems just don't support range queries at all when you use hash-based partitioning.

### Cassandra's Clever Hybrid Approach

Cassandra does something interesting - it uses both hash and range partitioning. It uses a **compound primary key** like `(partition_key, clustering_columns...)`.

The partition key gets hashed to decide which node stores the data. But then within that partition, the clustering columns define a sort order. So if you use `(user_id, timestamp)`:

- `user_id` gets hashed → picks the partition → distributes users evenly across nodes
- `timestamp` defines sort order → rows are stored sorted by time within each user's partition

When you write, Cassandra hashes the user_id to find the partition, then inserts the row in timestamp order within that partition.

For reads, queries that specify the user_id go to one partition and can do fast range scans on the timestamp. Perfect for "give me all posts by this user in the last week." But if you don't specify the user_id? You're hitting multiple partitions, and global range queries on just the timestamp aren't supported efficiently.

It's a nice middle ground - you get the even distribution of hash partitioning plus efficient range queries within a partition.

### The Hot Key Problem

Even with perfect hashing, you can still get hot spots. Hashing can't fix extreme skew where most of your traffic targets a single key.

Classic example: a celebrity posts something. Millions of people start commenting. All those comments belong to the same `post_id`. Even after hashing, that post_id maps to one partition, and that partition gets absolutely hammered.

The solution has to happen in your application. You split the hot key by adding a random suffix - turn `post_id` into `post_id_00`, `post_id_01`, ... `post_id_99`. Now your writes get spread across 100 different partitions instead of one.

The catch is that reads now have to query all 100 split keys and merge the results. You also need to keep track of which keys are split, because you don't want to do this for every key (that would be wasteful).

Most databases don't handle this automatically. It's on you to detect hot keys and manage the splitting.

---

## Secondary Indexes

Primary key partitioning is pretty straightforward. But what about secondary indexes? Say you're storing car data and you want to query by color or make, not just by the car ID.

In a distributed database, secondary indexes also need to be partitioned. There are two main approaches.

### Document-Based Partitioning (Local Index)

Each partition maintains its own secondary index, covering only the documents in that partition. When you write, you only touch one partition. Easy.

But when you query by a secondary index, you need to do a **scatter/gather** - send the query to all partitions and merge the results. This is expensive and has higher latency. Reads are slow, writes are fast.

### Term-Based Partitioning (Global Index)

Instead of each partition having its own index, you build a global index across all partitions. The index itself is partitioned by the term. So all the cars with `color:red` might be indexed in partition 1, while `color:blue` is in partition 2.

You can partition the index by term range or by hash of the term (hash usually gives better distribution).

Now when you query for a specific term, you only hit one index partition. No scatter/gather. Reads are efficient.

The problem is writes. A single document write might update multiple index partitions (if that document has multiple indexed fields). This requires coordination across partitions, so writes become slower and more complex.

Also, these global indexes are often updated asynchronously, so they might lag behind the actual data. You might not see your write in the index immediately.

Trade-offs everywhere: local indexes make writes easy but reads expensive. Global indexes make reads fast but writes complicated.

---

## Rebalancing Partitions

As your data grows, or as nodes are added or fail, you need to move partitions around. This is called **rebalancing**. The goals are:

- Distribute data and load fairly across all nodes
- Keep serving reads and writes during rebalancing
- Move as little data as possible

### Why Not Hash Mod N?

You might think: just use `hash(key) % N` where N is the number of nodes. Simple, right?

The problem is when N changes. Add or remove a node, and suddenly most of your keys remap to different partitions. You'd have to move a massive amount of data. It's way too expensive. Don't do this.

### Fixed Number of Partitions

Here's a better approach: create way more partitions than you have nodes. Like, 1000 partitions for 10 nodes. Each node gets multiple partitions.

When you add a new node, it "steals" some partitions from existing nodes. Only entire partitions move, not individual keys. This is much more efficient.

The advantage is simplicity. Minimal data movement. You can even assign more partitions to more powerful nodes.

The downside is that the number of partitions is fixed. If you choose too few, partitions get huge and rebalancing becomes expensive. If you choose too many, the overhead of managing all those partitions adds up. And as your dataset grows, each partition grows too.

### Dynamic Partitioning

Some systems (especially those using key-range partitioning) split partitions automatically when they get too large. If a partition exceeds, say, 10GB, it splits in two. Small partitions can even be merged.

The advantage is that the number of partitions adapts to your data size. Partitions stay a reasonable size no matter how much your data grows.

The catch is that a brand new database starts with just one partition. All your initial writes hit a single node until the first split happens. You can work around this with pre-splitting, but it's something to be aware of.

### Partitions Proportional to Nodes

Cassandra takes yet another approach: a fixed number of partitions per node (like 256 per node). When you add a new node, it picks a bunch of existing partitions, splits them, and takes ownership of half of each split.

This keeps partition sizes relatively stable as you scale. It works well with hash-based partitioning and is related to consistent hashing.

### Automatic vs Manual Rebalancing

Should the system rebalance automatically, or should a human approve each move?

Automatic rebalancing is convenient, but it's also risky. Rebalancing puts extra load on the cluster (copying data, rebuilding indexes). If the system incorrectly detects a node as failed and starts rebalancing, you can trigger cascading failures.

Manual rebalancing is slower, but it's safer. A human reviews the plan and approves it. This reduces surprises and gives you more control. Some teams prefer this even when automatic rebalancing is available, because distributed systems are hard and mistakes are expensive.
