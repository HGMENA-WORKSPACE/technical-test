import {
  ReactNode,
  createContext,
  useContext,
  useState
} from "react";

import { Router } from "@remix-run/router";
import { DataRouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { store } from "../../components";

export type RouterAppProviderType = Router;

type RouterAppProviderValue = {
  setRouter: () => void;
  getRouter: () => RouterAppProviderType;
};

const RouterAppProviderContext = createContext<RouterAppProviderValue>({
  setRouter: () => {},
  getRouter: () => ({} as RouterAppProviderType),
});

type DataRouteObjectWithElement = DataRouteObject & {
  canActivate?: boolean;
  showElement?: ReactNode;
};

export interface RouterAppProviderProps {
  routerAppProvider: DataRouteObjectWithElement[];
  children?: ReactNode;
}

export function RouterAppProvider({
  routerAppProvider,
  children,
}: RouterAppProviderProps) {
  const [router, setRouterAppProvider] = useState<RouterAppProviderType>(
    createBrowserRouter(formatRoutes(routerAppProvider))
  );
  function getRouter() {
    return router;
  }
  return (
    <RouterAppProviderContext.Provider
      value={{
        setRouter: () => {
          setRouterAppProvider(formatRoutes(router.routes || router));
        },
        getRouter,
      }}
    >
      {children}
    </RouterAppProviderContext.Provider>
  );
}

function formatRoutes(routerAppProvider: any) {
  routerAppProvider[0].children.forEach((route: any) => {
    if (route.path === "results") {
      route.canActivate = store.getState();
      route.element = route.canActivate
        ? route.showElement
        : route.errorElement;
    }
  });
  return routerAppProvider;
}

export function useRouterAppProvider() {
  return useContext(RouterAppProviderContext);
}
