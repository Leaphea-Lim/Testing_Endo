"use client";

import { usePathname } from "next/navigation";
import Footer from "@/layouts/Footer";
import { InstallPWA } from "@/components/InstallPWA";

export default function RootLayoutClient() {
  const pathname = usePathname();

//   const isWorkspacePage = pathname.startsWith("/workspace/");

 // get the first path segment (between first two "/")
  const firstSegment = pathname.split("/")[1];

  // If first segment exists AND it's not "dashboard" or "auth" or "api"
  // → treat it as a workspaceId
  const isWorkspacePage =
    firstSegment &&
    firstSegment !== "dashboard" &&
    firstSegment !== "auth" &&
    firstSegment !== "api";

    // Hide footer + PWA if inside /workspace/*
  if (isWorkspacePage) return null;

  return (
    <>
      <Footer />
      <InstallPWA />
    </>
  );
}