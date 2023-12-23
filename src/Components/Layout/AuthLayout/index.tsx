import { ReactNode } from "react";
import logo from "../../../assets/images/logo.png";
const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-[100vh] bg-background-liner flex flex-col items-center px-4 py-8">
      <div className="">
        <img src={logo} alt="logo" className="w-52" />
      </div>
      <div className="grow flex flex-col justify-center items-center w-full">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
