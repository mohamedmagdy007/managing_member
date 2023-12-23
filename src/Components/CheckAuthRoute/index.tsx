import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";

export default function CheckAuthRoute({ children }: { children: ReactNode }) {
  const { isLogin } = useAppSelector((state) => state.login);
  return <>{!isLogin ? children : <Navigate to={"/"} />}</>;
}
