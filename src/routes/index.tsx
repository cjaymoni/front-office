import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "../pages/auth/login/Login";
import { NoMatch } from "../pages/no-match/NoMatch";
import { routes } from "./routes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {routes.map((route, index) => {
        if (route.children) {
          return (
            <Route key={index} element={<route.layout />}>
              <Route
                key={route.name}
                path={route.path}
                element={route.element}
              />
              {route.children.map((childRoute, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path + childRoute.path}
                    element={childRoute.element}
                  />
                );
              })}
            </Route>
          );
        } else {
          return (
            <Route key={route.name} element={<route.layout />}>
              <Route key={index} path={route.path} element={route.element} />
            </Route>
          );
        }
      })}

      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};
