import { useEffect } from "react";
import RouterCompontent from "./Components/Router";
import { useAppDispatch } from "./store";
import { loginHandler, logoutHandler } from "./store/reducers/login";
import { useLocalization } from "./Hooks/useLocalization";

function App() {
  const dispatch = useAppDispatch();
  const { language } = useLocalization();

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (language === "ar") {
      document.getElementsByTagName("html")[0].setAttribute("lang", "ar");
    } else {
      document.getElementsByTagName("html")[0].setAttribute("lang", "en");
    }
    if (user) {
      const userData = JSON.parse(user);
      dispatch(
        loginHandler({
          email: userData,
        })
      );
    } else {
      dispatch(logoutHandler());
    }
  }, [dispatch, language]);
  return <RouterCompontent />;
}

export default App;
