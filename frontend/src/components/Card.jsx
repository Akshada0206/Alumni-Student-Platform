import { motion } from "framer-motion";

export default function Card({ title, children, className = "", noPadding=false, hover=false }) {
  return (
    <motion.div 
      whileHover={hover ? { y: -5 } : {}}
      className={`bg-surface border border-border rounded-2xl shadow-xl overflow-hidden ${hover ? 'cursor-pointer hover:border-primary/50 transition-colors' : ''} ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-border bg-surfaceHover/30">
          <h3 className="text-lg font-semibold text-textMain">{title}</h3>
        </div>
      )}
      <div className={noPadding ? "" : "p-6"}>
        {children}
      </div>
    </motion.div>
  );
}