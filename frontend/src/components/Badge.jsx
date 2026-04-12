export default function Badge({ children, variant = "primary", className = "" }) {
  const variants = {
    primary: "bg-primary/20 text-primary border border-primary/30",
    success: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    danger: "bg-accent/20 text-accent border border-accent/30",
    gray: "bg-surfaceHover text-textMuted border border-border"
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-block ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
