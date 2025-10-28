const Filters = ({ platformFilter, setPlatformFilter}) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 px-2">
    <div className="flex items-center gap-2">
      <label className="text-sm text-gray-600 font-medium">Filter by platform:</label>
      <select
        className="border border-gray-300 rounded px-2 py-1 text-sm"
        value={platformFilter}
        onChange={(e) => setPlatformFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="leetcode">LeetCode</option>
        <option value="codeforces">Codeforces</option>
        <option value="codechef">CodeChef</option>
        <option value="atcoder">AtCoder</option>
        <option value="hackerrank">HackerRank</option>
        <option value="geeksforgeeks">GeeksforGeeks</option>
      </select>
    </div>
  </div>
);

export default Filters;
