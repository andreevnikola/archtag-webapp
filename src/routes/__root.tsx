import { CustomModal } from "@/components/lib/modal/CustomModal";
import { Footer } from "@/components/structure/Footer";
import { Header } from "@/components/structure/Header";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => <RootComponent />,
});

function RootComponent() {
  // const modal = ModalController.instanciate()
  //   .setContent(<UnverifiedAccountModal />)
  //   .setCanClose(false)
  //   .useModal();

  // useEffect(() => {
  //   setTimeout(() => {
  //     modal.open();
  //   }, 1000);
  // }, []);

  return (
    <div className="w-full p-0">
      <div className="min-h-screen">
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
      <CustomModal />
    </div>
  );
}
