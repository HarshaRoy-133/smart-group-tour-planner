import java.util.*;

public class SmartGroupTourPlanner {
    static class Destination {
        String name, type;
        int cost, score;
        double time;

        Destination(String name, String type, int cost, double time, int score) {
            this.name = name;
            this.type = type;
            this.cost = cost;
            this.time = time;
            this.score = score;
        }

        public String toString() {
            return name + " (" + type + ", cost=" + cost + ", time=" + time + ", score=" + score + ")";
        }
    }

    static class AVLNode {
        Destination data;
        AVLNode left, right;
        int height;

        AVLNode(Destination data) {
            this.data = data;
            this.height = 1;
        }
    }

    static class AVLTree {
        AVLNode root;

        int height(AVLNode node) {
            return node == null ? 0 : node.height;
        }

        int balance(AVLNode node) {
            return node == null ? 0 : height(node.left) - height(node.right);
        }

        AVLNode rightRotate(AVLNode y) {
            AVLNode x = y.left;
            AVLNode t2 = x.right;
            x.right = y;
            y.left = t2;
            y.height = Math.max(height(y.left), height(y.right)) + 1;
            x.height = Math.max(height(x.left), height(x.right)) + 1;
            return x;
        }

        AVLNode leftRotate(AVLNode x) {
            AVLNode y = x.right;
            AVLNode t2 = y.left;
            y.left = x;
            x.right = t2;
            x.height = Math.max(height(x.left), height(x.right)) + 1;
            y.height = Math.max(height(y.left), height(y.right)) + 1;
            return y;
        }

        void insert(Destination data) {
            root = insert(root, data);
        }

        AVLNode insert(AVLNode node, Destination data) {
            if (node == null) return new AVLNode(data);

            int cmp = data.name.compareToIgnoreCase(node.data.name);
            if (cmp < 0) node.left = insert(node.left, data);
            else if (cmp > 0) node.right = insert(node.right, data);
            else return node;

            node.height = 1 + Math.max(height(node.left), height(node.right));
            int bf = balance(node);

            if (bf > 1 && data.name.compareToIgnoreCase(node.left.data.name) < 0) return rightRotate(node);
            if (bf < -1 && data.name.compareToIgnoreCase(node.right.data.name) > 0) return leftRotate(node);
            if (bf > 1 && data.name.compareToIgnoreCase(node.left.data.name) > 0) {
                node.left = leftRotate(node.left);
                return rightRotate(node);
            }
            if (bf < -1 && data.name.compareToIgnoreCase(node.right.data.name) < 0) {
                node.right = rightRotate(node.right);
                return leftRotate(node);
            }
            return node;
        }

        void delete(String name) {
            root = delete(root, name);
        }

        AVLNode delete(AVLNode node, String name) {
            if (node == null) return null;

            int cmp = name.compareToIgnoreCase(node.data.name);
            if (cmp < 0) node.left = delete(node.left, name);
            else if (cmp > 0) node.right = delete(node.right, name);
            else {
                if (node.left == null || node.right == null) {
                    node = (node.left != null) ? node.left : node.right;
                } else {
                    AVLNode successor = minValueNode(node.right);
                    node.data = successor.data;
                    node.right = delete(node.right, successor.data.name);
                }
            }

            if (node == null) return null;
            node.height = 1 + Math.max(height(node.left), height(node.right));
            int bf = balance(node);

            if (bf > 1 && balance(node.left) >= 0) return rightRotate(node);
            if (bf > 1 && balance(node.left) < 0) {
                node.left = leftRotate(node.left);
                return rightRotate(node);
            }
            if (bf < -1 && balance(node.right) <= 0) return leftRotate(node);
            if (bf < -1 && balance(node.right) > 0) {
                node.right = rightRotate(node.right);
                return leftRotate(node);
            }
            return node;
        }

        AVLNode minValueNode(AVLNode node) {
            while (node.left != null) node = node.left;
            return node;
        }

        Destination search(String name) {
            AVLNode current = root;
            while (current != null) {
                int cmp = name.compareToIgnoreCase(current.data.name);
                if (cmp == 0) return current.data;
                current = cmp < 0 ? current.left : current.right;
            }
            return null;
        }

        void inorder() {
            inorder(root);
            System.out.println();
        }

        void inorder(AVLNode node) {
            if (node == null) return;
            inorder(node.left);
            System.out.println(node.data);
            inorder(node.right);
        }
    }

    static class Graph {
        Map<String, List<Edge>> adj = new HashMap<>();

        void addRoad(String a, String b, int km) {
            adj.computeIfAbsent(a, k -> new ArrayList<>()).add(new Edge(b, km));
            adj.computeIfAbsent(b, k -> new ArrayList<>()).add(new Edge(a, km));
        }

        Map<String, Integer> dijkstra(String source) {
            Map<String, Integer> dist = new HashMap<>();
            for (String v : adj.keySet()) dist.put(v, Integer.MAX_VALUE);
            dist.put(source, 0);

            PriorityQueue<Edge> pq = new PriorityQueue<>(Comparator.comparingInt(e -> e.weight));
            pq.add(new Edge(source, 0));

            while (!pq.isEmpty()) {
                Edge current = pq.poll();
                if (current.weight != dist.get(current.to)) continue;
                for (Edge edge : adj.getOrDefault(current.to, List.of())) {
                    int nd = current.weight + edge.weight;
                    if (nd < dist.get(edge.to)) {
                        dist.put(edge.to, nd);
                        pq.add(new Edge(edge.to, nd));
                    }
                }
            }
            return dist;
        }
    }

    static class Edge {
        String to;
        int weight;

        Edge(String to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }

    static class UnionFind {
        int[] parent, rank;

        UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }

        int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }

        boolean union(int a, int b) {
            int pa = find(a), pb = find(b);
            if (pa == pb) return false;
            if (rank[pa] < rank[pb]) parent[pa] = pb;
            else if (rank[pb] < rank[pa]) parent[pb] = pa;
            else {
                parent[pb] = pa;
                rank[pa]++;
            }
            return true;
        }
    }

    static List<Destination> selectItineraryDP(List<Destination> places, int budget, int maxTimeUnits) {
        int n = places.size();
        int bUnits = budget / 100;
        int[][][] dp = new int[n + 1][bUnits + 1][maxTimeUnits + 1];

        for (int i = 1; i <= n; i++) {
            Destination d = places.get(i - 1);
            int cost = (int) Math.ceil(d.cost / 100.0);
            int time = (int) Math.ceil(d.time * 4);
            for (int b = 0; b <= bUnits; b++) {
                for (int t = 0; t <= maxTimeUnits; t++) {
                    dp[i][b][t] = dp[i - 1][b][t];
                    if (cost <= b && time <= t) {
                        dp[i][b][t] = Math.max(dp[i][b][t], dp[i - 1][b - cost][t - time] + d.score);
                    }
                }
            }
        }

        List<Destination> selected = new ArrayList<>();
        int b = bUnits, t = maxTimeUnits;
        for (int i = n; i > 0; i--) {
            if (dp[i][b][t] != dp[i - 1][b][t]) {
                Destination d = places.get(i - 1);
                selected.add(d);
                b -= (int) Math.ceil(d.cost / 100.0);
                t -= (int) Math.ceil(d.time * 4);
            }
        }
        Collections.reverse(selected);
        return selected;
    }

    static List<Destination> greedyRoute(List<Destination> selected, Graph graph) {
        List<Destination> remaining = new ArrayList<>(selected);
        List<Destination> route = new ArrayList<>();
        String current = "Hotel";

        while (!remaining.isEmpty()) {
            Map<String, Integer> dist = graph.dijkstra(current);
            remaining.sort(Comparator.comparingInt(d -> dist.getOrDefault(d.name, Integer.MAX_VALUE)));
            Destination next = remaining.remove(0);
            route.add(next);
            current = next.name;
        }
        return route;
    }

    static void mergeSortByScore(List<Destination> a) {
        if (a.size() <= 1) return;
        int mid = a.size() / 2;
        List<Destination> left = new ArrayList<>(a.subList(0, mid));
        List<Destination> right = new ArrayList<>(a.subList(mid, a.size()));
        mergeSortByScore(left);
        mergeSortByScore(right);
        int i = 0, j = 0, k = 0;
        while (i < left.size() && j < right.size()) {
            a.set(k++, left.get(i).score >= right.get(j).score ? left.get(i++) : right.get(j++));
        }
        while (i < left.size()) a.set(k++, left.get(i++));
        while (j < right.size()) a.set(k++, right.get(j++));
    }

    public static void main(String[] args) {
        List<String> groupPreferences = List.of("Adventure", "Food", "Shopping", "Temples");
        List<Destination> places = new ArrayList<>(List.of(
                new Destination("Hill Trek Point", "Adventure", 1500, 2.5, 0),
                new Destination("Street Food Lane", "Food", 700, 1.5, 0),
                new Destination("City Mall Market", "Shopping", 1800, 2.0, 0),
                new Destination("Ancient Temple", "Temples", 300, 1.5, 0),
                new Destination("Lake Garden", "Nature", 500, 1.25, 0),
                new Destination("Royal Fort Museum", "History", 900, 2.0, 0),
                new Destination("River Raft Camp", "Adventure", 2200, 3.0, 0)
        ));

        for (Destination d : places) {
            int matches = Collections.frequency(groupPreferences, d.type);
            d.score = 40 + matches * 30 + (100 - d.cost / 50);
        }

        AVLTree index = new AVLTree();
        for (Destination d : places) index.insert(d);
        System.out.println("AVL inorder traversal by destination name:");
        index.inorder();
        System.out.println("Search Temple: " + index.search("Ancient Temple"));
        index.delete("Lake Garden");

        Graph graph = new Graph();
        graph.addRoad("Hotel", "Ancient Temple", 3);
        graph.addRoad("Hotel", "Street Food Lane", 4);
        graph.addRoad("Hotel", "Lake Garden", 5);
        graph.addRoad("Ancient Temple", "Royal Fort Museum", 2);
        graph.addRoad("Ancient Temple", "Street Food Lane", 2);
        graph.addRoad("Street Food Lane", "City Mall Market", 3);
        graph.addRoad("City Mall Market", "Lake Garden", 5);
        graph.addRoad("Royal Fort Museum", "Hill Trek Point", 6);
        graph.addRoad("Hill Trek Point", "River Raft Camp", 3);

        mergeSortByScore(places);
        List<Destination> selected = selectItineraryDP(places, 6000, 36);
        List<Destination> route = greedyRoute(selected, graph);

        System.out.println("\nOptimized group itinerary:");
        for (Destination d : route) System.out.println(d);

        System.out.println("\nComplexity summary:");
        System.out.println("BST search/insert/delete: O(h), AVL guaranteed O(log n)");
        System.out.println("AVL rotations LL/RR/LR/RL: O(1)");
        System.out.println("B/B+ Tree indexing: O(log n), range scan O(log n + k)");
        System.out.println("Segment Tree/Fenwick Tree range queries: O(log n)");
        System.out.println("BFS/DFS: O(V + E), Union-Find nearly O(1) amortized");
        System.out.println("Kruskal MST: O(E log E), Prim MST: O(E log V)");
        System.out.println("Dijkstra: O((V + E) log V), Bellman-Ford: O(VE), Floyd-Warshall: O(V^3)");
        System.out.println("Topological sort/SCC: O(V + E)");
        System.out.println("Merge/Quick/Heap sort average: O(n log n), Counting/Radix for bounded keys: O(n + k)");
        System.out.println("Greedy is fast but local; DP guarantees best result under budget/time constraints.");
    }
}
