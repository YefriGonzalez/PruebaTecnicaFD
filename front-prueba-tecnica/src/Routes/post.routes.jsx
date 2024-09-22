import React, { lazy } from "react";
import { Route } from "react-router";

const routes = [
  {
    path: "/posts",
    element: lazy(() => import("../Pages/Protected/Posts/PostList")),
  },
  {
    path: "/post/:id",
    element: lazy(() => import("../Pages/Protected/Posts/PostId")),
  },
  
];

export const PostRenderRoutes = () => {
  return routes.map((val) => {
    const Componente = val.element;
    return <Route key={val.path} path={val.path} element={<Componente />} />;
  });
};