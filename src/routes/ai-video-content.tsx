import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-video-content")({
  component: () => <Outlet />,
});
