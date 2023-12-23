import { useState } from "react";
import { useAppDispatch } from "../../store";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "../../Components/Custom/Button";
import { useFormik } from "formik";
import { loginSchema } from "../../helper/validation";
import { loginHandler } from "../../store/reducers/login";
import { useLocalization } from "../../Hooks/useLocalization";
const Login = () => {
  const dispatch = useAppDispatch();
  const [toggleEye, setToggleEye] = useState(true);
  const navigate = useNavigate();
  const { t, language } = useLocalization();
  const toggleEyeHandler = () => setToggleEye((prev) => !prev);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      localStorage.setItem("userInfo", JSON.stringify(values.email));
      dispatch(loginHandler({ email: values.email }));
      navigate("/", { replace: true });
    },
  });
  return (
    <>
      <h1 className="text-[28px] text-center font-bold mb-8">{t("login")}</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-[400px] bg-white rounded-[25px] p-8 grid gap-4"
      >
        <div className="grid gap-2">
          <label htmlFor="email">{t("email")}</label>
          <input
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
          />
          {formik.touched.email && (
            <p className="text-red-600">{formik.errors.email}</p>
          )}
        </div>
        <div className="grid gap-2 relative">
          <label htmlFor="password">{t("password")}</label>
          <div className="relative">
            <input
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 pl-4 pr-8 outline-0 focus:border-main-color w-full"
              type={toggleEye ? "password" : "text"}
            />

            <button
              className={`absolute ${
                language === "en" ? "right-[10px]" : "left-[10px]"
              } bottom-[50%] translate-y-[50%]`}
              onClick={toggleEyeHandler}
              type="button"
            >
              {toggleEye ? (
                <EyeSlashIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </button>
          </div>
          {formik.touched.password && (
            <p className="text-red-600">{formik.errors.password}</p>
          )}
        </div>
        <Button type="submit">{t("sign in")}</Button>
      </form>
    </>
  );
};

export default Login;
