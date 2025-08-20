"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, User } from "lucide-react";

// Recursive Tree Node Component
function TreeNode({ node }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="ml-4 mt-3">
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        {node.children?.length > 0 ? (
          expanded ? (
            <ChevronDown size={18} className="text-gray-600 group-hover:text-orange-500 transition" />
          ) : (
            <ChevronRight size={18} className="text-gray-600 group-hover:text-orange-500 transition" />
          )
        ) : (
          <span className="w-[18px]" />
        )}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-300 to-orange-400 rounded-xl shadow-md"
        >
          <User className="text-white" size={18} />
          <span className="font-semibold text-white">{node.name}</span>
          <span className="text-xs text-orange-100">({node.email})</span>
        </motion.div>
      </div>

      {/* Animate children */}
      <AnimatePresence>
        {expanded && node.children?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-6 border-l-2 border-dashed border-orange-300 pl-4"
          >
            {node.children.map((child) => (
              <TreeNode key={child.id} node={child} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper: Traverse tree and build level counts
function computeLevelCounts(tree) {
  let levelMap = {};

  function dfs(node, level = 1) {
    levelMap[level] = (levelMap[level] || 0) + 1;
    node.children?.forEach((child) => dfs(child, level + 1));
  }

  tree.forEach((root) => dfs(root));
  return levelMap;
}

export default function TeamPage() {
  const [tree, setTree] = useState([]);
  const [levelCounts, setLevelCounts] = useState({});

  useEffect(() => {
    const fetchTeam = async () => {
      const res = await fetch("/api/team");
      const data = await res.json();
      const treeData = data.tree || [];
      setTree(treeData);
      setLevelCounts(computeLevelCounts(treeData));
    };
    fetchTeam();
  }, []);

  return (
    <main className="p-8 min-h-screen bg-gradient-to-b from-white to-orange-50">
      <h1 className="text-3xl font-extrabold mb-6 text-orange-600 drop-shadow-sm">
        🌳 Team Structure
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Tree View */}
        <div className="md:col-span-3">
          {tree.length > 0 ? (
            <div className="space-y-4">
              {tree.map((root) => (
                <TreeNode key={root.id} node={root} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic">No team members found.</p>
          )}
        </div>

        {/* Level Summary */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-orange-200">
          <h2 className="text-xl font-semibold mb-4 text-orange-600">
            📊 Level-wise Count
          </h2>
          <ul className="space-y-2">
            {Object.entries(levelCounts).map(([level, count]) => (
              <li
                key={level}
                className="flex justify-between items-center px-3 py-2 rounded-lg bg-orange-100"
              >
                <span className="font-medium text-gray-700">Level {level}</span>
                <span className="font-bold text-orange-600">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
