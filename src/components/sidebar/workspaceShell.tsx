// "use client";
// import { useEffect, useMemo, useState } from "react";
// import { Sidebar } from "@/components/sidebar/sidebarComponent";

// type Mode = "expanded" | "collapsed" | "hover";

// interface WorkspaceShellProps {
//   children: React.ReactNode;
//   workspaceId: string; // <-- required
// }

// export function WorkspaceShell({ children, workspaceId }: WorkspaceShellProps) {
//   const [mode, setMode] = useState<Mode>(() => {
//     if (typeof window === "undefined") return "expanded";
//     return (localStorage.getItem("sidebar:mode") as Mode) || "expanded";
//   });
//   const [hovering, setHovering] = useState(false);

//   useEffect(() => localStorage.setItem("sidebar:mode", mode), [mode]);

//   const cols = useMemo(() => {
//     if (mode === "expanded") return "grid-cols-[16rem_1fr]";
//     if (mode === "collapsed") return "grid-cols-[4.5rem_1fr]";
//     return hovering ? "grid-cols-[16rem_1fr]" : "grid-cols-[4.5rem_1fr]"; // hover
//   }, [mode, hovering]);

//   return (
//     <div
//       data-mode={mode}
//       className={`grid min-h-screen transition-[grid-template-columns] duration-300 ${cols} isolate`}
//     >
//       <aside
//         onMouseEnter={() => mode === "hover" && setHovering(true)}
//         onMouseLeave={() => mode === "hover" && setHovering(false)}
//         className="relative z-50 border-r bg-slate-900 overflow-visible"
//       >
//         <Sidebar
//           workspaceId={workspaceId}
//           mode={mode}
//           setMode={setMode}
//           hovering={hovering}
//         />
//       </aside>

//       <main className="relative z-0 min-w-0 overflow-auto">{children}</main>
//     </div>
//   );
// }
