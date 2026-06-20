import { NavLink as RouterNavLink, NavLinkProps, useNavigate } from "react-router-dom";
import { forwardRef, useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LogOut, User } from "lucide-react";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("user");
      navigate("/login");
    };

    return (
      <div
        className="flex items-center justify-between w-full relative"
        ref={menuRef}
      >
        {/* Navigation Link */}
        <RouterNavLink
          ref={ref}
          to={to}
          className={({ isActive, isPending }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
              className,
              isActive && cn("bg-primary text-white", activeClassName),
              isPending && pendingClassName
            )
          }
          {...props}
        />

        {/* Avatar Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center h-10 w-10 rounded-full 
                     bg-gradient-to-br from-primary/20 to-primary/10 
                     hover:scale-105 transition-all duration-200 shadow-sm"
        >
          <User className="h-5 w-5 text-primary" />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-0 top-14 w-52 
                       bg-white/90 backdrop-blur-xl 
                       border border-gray-200 
                       rounded-2xl shadow-xl p-2 
                       animate-in fade-in zoom-in-95 z-50"
          >
            {/* User Info */}
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-800">Welcome</p>
              <p className="text-xs text-gray-500">Your Account</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2 mt-2 
                         text-sm rounded-xl 
                         text-red-500 hover:text-red-600 
                         hover:bg-red-50 
                         transition-all duration-200 group"
            >
              <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition">
                <LogOut className="h-4 w-4" />
              </div>
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };