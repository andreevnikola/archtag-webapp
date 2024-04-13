import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/theme-picker/theme-provider";
import { Messages } from "./components/lib/Messages";

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <>Pending...</>,
  defaultNotFoundComponent: () => <>This page was not found!</>,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Messages />
    </ThemeProvider>
  );
}

export default App;
