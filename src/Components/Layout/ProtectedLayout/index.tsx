import { ReactNode } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../store";
import { logoutHandler } from "../../../store/reducers/login";
import { toggleLang } from "../../../utils/toggleLang";
import { useLocalization } from "../../../Hooks/useLocalization";
const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const { user } = useAppSelector((state) => state.login);
  const { t, language } = useLocalization();
  const dispatch = useAppDispatch();
  const logoutBtnHandler = () => {
    dispatch(logoutHandler());
  };

  return (
    <div className="flex">
      <div
        className={`grid grid-rows-[auto_1fr] grid-cols-1 min-h-[100vh] duration-300 grow ml-auto`}
      >
        <div className="p-4 bg-white flex-wrap gap-4  shadow-sm flex justify-between items-center sticky top-0 z-50">
          <h2 className="text-[18px] ">
            Good Morning,{" "}
            <span className="text-[20px] text-[#213F7D] font-bold">
              {user.email}
            </span>
          </h2>
          <div className="flex gap-4 items-center">
            <div className="flex gap-4">
              <button
                className="border border-[#E8E8E8] rounded-full w-8 h-8 flex items-center justify-center "
                onClick={() =>
                  toggleLang(language === "en" ? "en" : "ar", dispatch)
                }
              >
                {language === "en" ? "en" : "ar"}
              </button>
            </div>
            <button
              className="flex gap-1 border-2 border-main-color text-main-color rounded-md py-1 px-2"
              type="button"
              onClick={logoutBtnHandler}
            >
              <span>{t("log out")}</span>
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-4 w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
