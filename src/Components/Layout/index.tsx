import { ReactNode } from "react";
import AuthLayout from "./AuthLayout";
import ProtectedLayout from "./ProtectedLayout";
import { useLocation } from "react-router-dom";

const formsUrls: string[] = ["/login"];

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <>
      {formsUrls.includes(pathname) ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <ProtectedLayout>{children}</ProtectedLayout>
      )}
    </>
  );
}
