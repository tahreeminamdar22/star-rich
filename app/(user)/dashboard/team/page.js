"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, User } from "lucide-react";
import { useSession } from "next-auth/react";

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
            <ChevronDown
              size={18}
              className="text-gray-300 group-hover:text-[var(--brand-orange)] transition"
            />
          ) : (
            <ChevronRight
              size={18}
              className="text-gray-300 group-hover:text-[var(--brand-orange)] transition"
            />
          )
        ) : (
          <span className="w-[18px]" />
        )}

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 px-3 py-2 
            bg-gradient-to-r from-[var(--brand-orange)] to-orange-700 
            rounded-xl shadow-md"
        >
          <User className="text-white" size={18} />
          <span className="font-semibold text-white">{node.name}</span>
          <span className="text-xs text-orange-200">({node.email})</span>
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
            className="ml-6 border-l-2 border-dashed border-[var(--brand-orange)] pl-4"
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

// Helper: Compute level-wise counts
function computeLevelCounts(tree) {
  const levelMap = {};
  function dfs(node, level = 1) {
    levelMap[level] = (levelMap[level] || 0) + 1;
    node.children?.forEach((child) => dfs(child, level + 1));
  }
  tree.forEach((root) => dfs(root));
  return levelMap;
}

export default function TeamPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [tree, setTree] = useState([]);
  const [levelCounts, setLevelCounts] = useState({});

  useEffect(() => {
    if (!userId) return;

    const fetchTeam = async () => {
      try {
        const res = await fetch(`/api/team?userId=${userId}`);
        const data = await res.json();
        const treeData = data.tree ? [data.tree] : [];
        setTree(treeData);
        setLevelCounts(computeLevelCounts(treeData));
      } catch (err) {
        console.error("Failed to fetch team:", err);
      }
    };

    fetchTeam();
  }, [userId]);

  return (
    <main
      className="p-8 min-h-screen text-[var(--foreground)]"
      style={{ background: "var(--background)" }}
    >
      <h1 className="text-3xl font-extrabold mb-6 text-[var(--brand-orange)] drop-shadow">
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
        <div className="bg-[var(--brand-navy)] shadow-lg rounded-xl p-6 border border-[var(--brand-orange)]">
          <h2 className="text-xl font-semibold mb-4 text-[var(--brand-orange)]">
            📊 Level-wise Count
          </h2>
          <ul className="space-y-2">
            {Object.entries(levelCounts).map(([level, count]) => (
              <li
                key={level}
                className="flex justify-between items-center px-3 py-2 rounded-lg bg-[var(--brand-orange)]/20"
              >
                <span className="font-medium text-gray-200">Level {level}</span>
                <span className="font-bold text-[var(--brand-orange)]">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
