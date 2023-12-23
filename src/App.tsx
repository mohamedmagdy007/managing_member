import { useEffect } from "react";
import RouterCompontent from "./Components/Router";
import { useAppDispatch } from "./store";
import { loginHandler, logoutHandler } from "./store/reducers/login";
import { toggleLang } from "./utils/toggleLang";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const lang = localStorage?.getItem("lang") || "en";
    const user = localStorage.getItem("userInfo");
    toggleLang(lang, dispatch);
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
  }, [dispatch]);
  return <RouterCompontent />;
}

export default App;
