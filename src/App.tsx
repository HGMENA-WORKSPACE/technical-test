import { Outlet } from "react-router-dom";
import "./App.css";
import { Menu } from "./components";
import { useRouterAppProvider } from "./providers/routerAppProvider/routerAppProvider";

export default function App() {
  const browserRouter = useRouterAppProvider();
  return (
    <main>
      <div className="row">
        <div className="col-12">
          <Menu routes={browserRouter.getRouter().routes as any|| browserRouter.getRouter() as any} />
        </div>
      </div>
      <div className="container">
        <Outlet />
      </div>
    </main>
  );
}
