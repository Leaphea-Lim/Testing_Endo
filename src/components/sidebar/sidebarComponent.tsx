"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { getSidebarItems } from "@/lib/sidebarItem";

type SidebarMode = "expanded" | "collapsed" | "hover";

export function Sidebar({ workspaceId }: { workspaceId: string }) {
  const pathname = usePathname();
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("expanded");
  const [isHovered, setIsHovered] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);

  const isExpanded =
    sidebarMode === "expanded" || (sidebarMode === "hover" && isHovered);
  const showOverlay = sidebarMode === "hover" && isHovered;

  const items = getSidebarItems(workspaceId);

  const isActive = (href: string) =>
    href === pathname || pathname.startsWith(href);

  const handleMouseEnter = () => sidebarMode === "hover" && setIsHovered(true);
  const handleMouseLeave = () => sidebarMode === "hover" && setIsHovered(false);

  const toggleMode = () => {
    if (sidebarMode === "expanded") setSidebarMode("collapsed");
    else if (sidebarMode === "collapsed") setSidebarMode("expanded");
  };

  const NavList = ({ expanded }: { expanded: boolean }) => (
    <nav className="p-2 flex-1 overflow-y-auto">
      <ul className="space-y-1">
        {items.map(({ icon: Icon, label, href }) => (
          <li key={`${href}-${label}`}>
            <Link
              href={href}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                isActive(href)
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              )}
              title={!expanded ? label : ""}
              aria-current={isActive(href) ? "page" : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {expanded && <span className="truncate">{label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  // Bottom controls (3-dots + chevron)
  const ControlsRow = () => (
    <div className="flex items-center gap-1">
      {/* Mode dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowModeDropdown(!showModeDropdown)}
          className="flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
          title="Sidebar mode"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>

        {showModeDropdown && (
          <div className="absolute bottom-full left-0 mb-2 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 min-w-[180px] z-50">
            <div className="px-3 py-2 text-sm font-medium text-slate-300 border-b border-slate-700">
              Sidebar mode
            </div>
            {(["expanded", "collapsed", "hover"] as SidebarMode[]).map(
              (mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setSidebarMode(mode);
                    setShowModeDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  <div className="w-3 h-3 rounded-full border border-slate-500 flex items-center justify-center">
                    {sidebarMode === mode && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>
                  {mode === "hover"
                    ? "Expand on hover"
                    : mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Main Sidebar */}
      <div
        className={cn(
          "bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col",
          sidebarMode === "hover" ? "w-16" : isExpanded ? "w-64" : "w-16",
          "h-screen sticky top-0"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation area */}
        <NavList expanded={sidebarMode === "expanded"} />

        {/* Controls always visible at bottom */}
        <div className="p-2 border-t border-slate-800 flex-shrink-0">
          <ControlsRow />
        </div>
      </div>

      {/* Hover Overlay - positioned absolutely */}
      {showOverlay && (
        <div 
          className="fixed left-0 top-0 w-64 h-screen bg-slate-900 border-r border-slate-800 z-50 flex flex-col shadow-2xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation area */}
          <NavList expanded />
          
          {/* Controls at bottom */}
          <div className="p-2 border-t border-slate-800 flex-shrink-0">
            <ControlsRow />
          </div>
        </div>
      )}
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useRef, useState } from "react";
// import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { getSidebarItems } from "@/lib/sidebarItem";

// type SidebarMode = "expanded" | "collapsed" | "hover";

// interface SidebarProps {
//   workspaceId: string;
//   mode: SidebarMode;                  // from WorkspaceShell
//   setMode: (m: SidebarMode) => void;  // from WorkspaceShell
//   hovering: boolean;                  // from WorkspaceShell
// }

// export function Sidebar({ workspaceId, mode, setMode, hovering }: SidebarProps) {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false); // 3-dot popover open/close
//   const popRef = useRef<HTMLDivElement | null>(null);

//   // Close menu on outside click
//   useEffect(() => {
//     function onDocClick(e: MouseEvent) {
//       if (!popRef.current) return;
//       if (!popRef.current.contains(e.target as Node)) setOpen(false);
//     }
//     if (open) document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, [open]);

//   // Sidebar is visually expanded when explicitly expanded,
//   // or when in "hover" mode while currently hovered.
//   const expanded = mode === "expanded" || (mode === "hover" && hovering);

//   const items = getSidebarItems(workspaceId);
//   const isActive = (href: string) => href === pathname || pathname.startsWith(href);
//   const toggleMode = () => setMode(mode === "expanded" ? "collapsed" : "expanded");

//   const NavList = ({ expanded }: { expanded: boolean }) => (
//     <nav className="p-2 flex-1 overflow-y-auto">
//       <ul className="space-y-1">
//         {items.map(({ icon: Icon, label, href }) => (
//           <li key={`${href}-${label}`}>
//             <Link
//               href={href}
//               className={cn(
//                 "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
//                 isActive(href)
//                   ? "bg-slate-800 text-white"
//                   : "text-slate-400 hover:text-white hover:bg-slate-800/50"
//               )}
//               title={!expanded ? label : ""}
//               aria-current={isActive(href) ? "page" : undefined}
//             >
//               <Icon className="w-5 h-5 flex-shrink-0" />
//               {expanded && <span className="truncate">{label}</span>}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );

//   return (
//     // IMPORTANT:
//     // - No width classes (w-64/w-16). The SHELL controls width with CSS grid.
//     // - z-50 + overflow-visible ensure the menu appears above content and isn't clipped.
//     <div className="h-screen sticky top-0 bg-slate-900 border-r border-slate-800 flex flex-col relative z-50 overflow-visible">
//       <NavList expanded={expanded} />

//       <div className="p-2 border-t border-slate-800 flex-shrink-0 flex items-center gap-1">
//         {/* 3-dot menu (controlled popover) */}
//         <div className="relative" ref={popRef}>
//           <button
//             type="button"
//             onClick={() => setOpen((v) => !v)}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50"
//             aria-expanded={open}
//             aria-haspopup="menu"
//             aria-label="Sidebar options"
//           >
//             <MoreHorizontal className="w-5 h-5" />
//           </button>

//           {open && (
//             <div
//               role="menu"
//               className="absolute bottom-full left-0 mb-2 min-w-[200px] rounded-xl border border-slate-700 bg-slate-800/95 p-2 shadow-2xl backdrop-blur z-[9999]"
//             >
//               <div className="px-2 pb-2 pt-1 text-sm text-slate-300">Sidebar mode</div>
//               {(["expanded", "collapsed", "hover"] as const).map((m) => (
//                 <button
//                   key={m}
//                   role="menuitemradio"
//                   aria-checked={mode === m}
//                   onClick={() => {
//                     setMode(m);
//                     setOpen(false);
//                   }}
//                   className="w-full flex items-center gap-3 px-2 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded"
//                 >
//                   <div className="w-3 h-3 rounded-full border border-slate-500 grid place-items-center">
//                     {mode === m && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
//                   </div>
//                   {m === "hover" ? "Expand on hover" : m[0].toUpperCase() + m.slice(1)}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Quick expand/collapse (hidden in hover mode) */}
//         {mode !== "hover" && (
//           <button
//             type="button"
//             onClick={toggleMode}
//             className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50"
//             aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
//           >
//             {expanded ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
