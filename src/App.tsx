import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "./components/theme-picker/theme-provider";
import { Messages } from "./components/lib/Messages";
import NotFound from "./components/structure/NotFound";
import Loading from "./components/structure/Loading";

const router = createRouter({
  routeTree,
  defaultPendingComponent: Loading,
  defaultNotFoundComponent: NotFound,
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
