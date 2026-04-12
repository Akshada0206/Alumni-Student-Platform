export default function Button({ children, onClick, type = "button", variant = "primary", className = "", disabled = false }) {
  const baseStyle = "px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary hover:bg-primaryHover text-white shadow-lg shadow-primary/30",
    secondary: "bg-secondary hover:bg-purple-600 text-white shadow-lg shadow-secondary/30",
    outline: "border-2 border-border hover:border-primary text-textMain hover:text-primary",
    ghost: "hover:bg-surfaceHover text-textMuted hover:text-textMain",
    danger: "bg-accent hover:bg-rose-600 text-white shadow-lg shadow-accent/30"
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
