import { useThemeUtils, useRegisterPWA } from "@redlotus/ui";
import { Route, Routes } from "react-router-dom";

import { justRoutes, routes } from "routes";

export const Router = () => {
  useThemeUtils();
  useRegisterPWA();

  return (
    <Routes>
      {routes.map(route => (
        <Route key={route.to} path={route.to} element={route.element} />
      ))}
      {justRoutes.map(route => (
        <Route key={route.to} path={route.to} element={route.element} />
      ))}
    </Routes>
  );
};
