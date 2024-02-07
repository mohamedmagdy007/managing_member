import { ReactNode } from "react";
import AuthLayout from "./AuthLayout";
import ProtectedLayout from "./ProtectedLayout";
import { useLocation } from "react-router-dom";
import ValidateRoute from "../ValidateRoute";
import CheckAuthRoute from "../CheckAuthRoute";

const formsUrls: string[] = ["/login"];

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <>
      {formsUrls.includes(pathname) ? (
        <CheckAuthRoute>
          <AuthLayout>{children}</AuthLayout>
        </CheckAuthRoute>
      ) : (
        <ValidateRoute>
          <ProtectedLayout>{children}</ProtectedLayout>
        </ValidateRoute>
      )}
    </>
  );
}
