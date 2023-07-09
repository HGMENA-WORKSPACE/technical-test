import { useState } from "react";

import { RouterProvider } from "react-router-dom";
import {
  useRouterAppProvider
} from "../../providers/routerAppProvider/routerAppProvider";

export function RouterApp() {
  const browserRouter = useRouterAppProvider();
  const [router] = useState<any>(browserRouter.getRouter());
  return <RouterProvider router={router} />;
}
