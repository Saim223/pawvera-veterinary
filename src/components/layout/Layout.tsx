import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollManager } from "./ScrollManager";
import { CatCursor } from "@/components/ui/CatCursor";

export function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-paper" id="top">
      <ScrollManager />
      <CatCursor />
      <Navbar transparentAtTop={isHome} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
