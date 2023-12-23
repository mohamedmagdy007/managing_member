import { AppDispatch } from "../store";
import { langHandler } from "../store/reducers/lang";

export const toggleLang = (lang: string, dispatch: AppDispatch) => {
  if (lang === "en") {
    dispatch(langHandler("ar"));
    document.getElementsByTagName("html")[0].setAttribute("lang", "ar");
    window.localStorage?.setItem("lang", "ar");
  } else {
    document.getElementsByTagName("html")[0].setAttribute("lang", "en");
    dispatch(langHandler("en"));
    window.localStorage?.setItem("lang", "en");
  }
};
