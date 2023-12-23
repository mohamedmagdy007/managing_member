import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ValidateRoute from "../ValidateRoute";
import Layout from "../Layout";
import CheckAuthRoute from "../CheckAuthRoute";
import Loading from "../Loading";
const Login = lazy(() => import("../../Pages/auth/Login"));
const Members = lazy(() => import("../../Pages/members"));
const CreateUpdateMember = lazy(
  () => import("../../Pages/members/CreateUpdateMember")
);
const ShowMember = lazy(() => import("../../Pages/members/ShowMember"));
const routes = [
  {
    routeName: "home",
    route: "/",
    element: <Members />,
  },
  {
    routeName: "create",
    route: "/create",
    element: <CreateUpdateMember />,
  },
  {
    routeName: "member",
    route: "/open/:id",
    element: <ShowMember />,
  },
  {
    routeName: "edit",
    route: "/edit/:id",
    element: <CreateUpdateMember edit />,
  },
];
const authRoutes = [
  {
    route: "/login",
    element: <Login />,
  },
];
const RouterCompontent = () => {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          {routes.map((route, ind) => (
            <Route
              key={ind}
              path={route.route}
              element={<ValidateRoute>{route.element}</ValidateRoute>}
            />
          ))}

          {authRoutes.map((route, ind) => (
            <Route
              path={route.route}
              element={<CheckAuthRoute>{route.element}</CheckAuthRoute>}
              key={ind}
            />
          ))}
          <Route path="*" element={<div>"This page not founded!"</div>} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default RouterCompontent;
