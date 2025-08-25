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
    <nav className="p-2">
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

      {/* Expand/Collapse quick toggle (hidden in hover mode) */}
      {sidebarMode !== "hover" && (
        <button
          onClick={toggleMode}
          className="flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
          aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isExpanded ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Main Sidebar -- sticky */}
      <div
        className={cn(
          "bg-slate-900 border-r border-slate-800 transition-all duration-500 ease-in-out flex flex-col relative",
          sidebarMode === "hover" ? "w-16" : isExpanded ? "w-64" : "w-16",
          // "sticky top-0 h-screen"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Nav*/}
        <div className="flex-1">
          <NavList expanded={sidebarMode === "expanded"} />
        </div>

        {/* Controls pinned bottom */}
        <div className="p-2 border-t border-slate-800">
          <ControlsRow />
        </div>

        {/* Hover Overlay (replicates nav + controls so 3-dots remain) */}
        {showOverlay && (
          <div className="absolute left-0 top-0 w-64 h-full bg-slate-900 border-r border-slate-800 z-50 flex flex-col transition-all duration-400 ease-in-out animate-in slide-in-from-left-2">
            <div className="flex-1">
              <NavList expanded />
            </div>
            <div className="p-2 border-t border-slate-800">
              <ControlsRow />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
