import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";

export default function ValidateRoute({ children }: { children: ReactNode }) {
  const { isLogin } = useAppSelector((state) => state.login);
  return <>{isLogin ? children : <Navigate to={"/login"} />}</>;
}
