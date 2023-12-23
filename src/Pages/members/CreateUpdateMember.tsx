/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../../Components/Custom/Button";
import { useFormik } from "formik";
import { createMemberSchema } from "../../helper/validation";
import {
  createMemberHandle,
  updateMemberHandle,
} from "../../store/reducers/members";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { useMemo, useState } from "react";
import { membersType } from "../../store/reducers/type";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { useLocalization } from "../../Hooks/useLocalization";
const CreateUpdateMember = ({ edit = false }: { edit?: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useLocalization();
  const [imagePreview, setImagePreview] = useState("");
  const { id } = useParams();
  const { members } = useAppSelector((state) => state.members);
  const dataMember = useMemo(
    () => members.find((item) => (id ? item.id === +id : item)),
    [id, members]
  );
  const calculateDateOfBirth = (idNumber: string): string => {
    const start = idNumber.slice(0, 1) === "2" ? "19" : "20";
    const year = idNumber.slice(1, 3);
    const month = idNumber.slice(3, 5);
    const day = idNumber.slice(5, 7);
    const dateOfBirth = `${start}${year}-${month}-${day}`;
    return dateOfBirth;
  };
  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const idNumber = e.target.value;
    const dateOfBirth = calculateDateOfBirth(idNumber);
    formik.setFieldValue("dateOfBirth", dateOfBirth);
  };
  const handlePhotoMember = (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fileList: File = e.currentTarget.files![0];
    if (fileList) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          formik.setFieldValue("photo", fileList || null);
          setImagePreview(`${fileReader.result}`);
        }
      };
      fileReader.readAsDataURL(fileList);
    }
  };
  const formik = useFormik({
    initialValues: edit
      ? ({ ...dataMember } as membersType)
      : ({
          userName: "",
          email: "",
          membership: "",
          subscribe: false,
          idNumber: "",
          gender: "",
          address: "",
          dateOfBirth: "",
          membershipDate: "",
          contactNumber: "",
          photo: "",
        } as membersType),
    validationSchema: createMemberSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (!edit) {
        dispatch(
          createMemberHandle({
            ...values,
            id: Math.floor(Math.random() * Date.now()),
            photo: Object(values.photo).name,
            photoView: imagePreview,
          })
        );
      } else {
        dispatch(
          updateMemberHandle({
            ...values,
            photo: dataMember ? dataMember?.photo : "",
            photoView: imagePreview ? imagePreview : dataMember!.photoView,
          })
        );
      }
      navigate("/");
    },
  });
  return (
    <>
      {edit ? dataMember ? null : <Navigate to={"/"} /> : null}
      <form
        onSubmit={formik.handleSubmit}
        className="w-full bg-white rounded-[25px] p-5 grid gap-4"
      >
        <h2 className="text-main-color text-[24px] font-bold text-center">
          {!edit ? t("create member") : t("update member")}
        </h2>
        <div className="border grid gap-2 border-[#E8E8E8] rounded-md p-2 max-w-[800px] w-full m-auto">
          <div className="grid gap-1 items-center">
            <label htmlFor="userName">{t("user name")}:</label>
            <input
              id="userName"
              name="userName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
            />
            {formik.touched.userName && formik.errors.userName && (
              <p className="text-red-600">{formik.errors.userName}</p>
            )}
          </div>

          <div className="grid gap-1 items-center">
            <label htmlFor="email">{t("email")}:</label>
            <input
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div className="grid gap-2 items-center">
            <label htmlFor="membership">{t("membership type")}:</label>
            <select
              id={"membership"}
              name="membership"
              value={formik.values.membership}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
            >
              <option value={""} disabled hidden></option>
              <option value={"basic"}>Basic</option>
              <option value={"premium"}>Premium</option>
              <option value={"vip"}>VIP</option>
            </select>
            {formik.touched.membership && formik.errors.membership && (
              <p className="text-red-600">{formik.errors.membership}</p>
            )}
          </div>

          <div className="grid gap-2 items-center">
            <label htmlFor="idNumber">{t("id number")}:</label>
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formik.values.idNumber}
              onChange={handleIdNumberChange}
              onBlur={formik.handleBlur}
              className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
            />
            {formik.touched.idNumber && formik.errors.idNumber && (
              <p className="text-red-600">{formik.errors.idNumber}</p>
            )}
          </div>
          <div className="grid gap-2 items-center">
            <label htmlFor="dateOfBirth">{t("date of birth")}</label>
            <input
              type="text"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              disabled
              className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
            />
          </div>
          <div className="grid gap-2 border p-2 border-[#E8E8E8] rounded-md bg-[#FBFAFC]">
            <p>{t("gender")}:</p>
            <div className="grid gap-2  items-center">
              <div className="flex gap-2  items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value={"male"}
                  checked={formik.values.gender === "male"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="male">{t("male")}</label>
              </div>
              <div className="flex gap-2  items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value={"female"}
                  checked={formik.values.gender === "female"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="female">{t("female")}</label>
              </div>
              <div className="flex gap-2  items-center">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value={"other"}
                  checked={formik.values.gender === "other"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label htmlFor="other">{t("other")}</label>
              </div>
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-600">{formik.errors.gender}</p>
            )}
          </div>

          <div className="grid gap-2 items-center">
            <label htmlFor="address">{t("address")}:</label>
            <textarea
              id="male"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border w-full border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
            ></textarea>
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-600">{formik.errors.address}</p>
            )}
          </div>

          <div className="grid gap-2 items-center">
            <label htmlFor="membershipDate">{t("membership start date")}</label>
            <input
              type="date"
              id="membershipDate"
              name="membershipDate"
              value={formik.values.membershipDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
            />
            {formik.touched.membershipDate && formik.errors.membershipDate && (
              <p className="text-red-600">{formik.errors.membershipDate}</p>
            )}
          </div>
          <div className="grid gap-2 items-center">
            <label htmlFor="contactNumber">{t("contact number")}</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formik.values.contactNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={11}
              className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
            />
            {formik.touched.contactNumber && formik.errors.contactNumber && (
              <p className="text-red-600">{formik.errors.contactNumber}</p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap justify-around">
            <div className="grid max-w-60 w-full  gap-2 items-center">
              <label
                htmlFor="photo"
                className="flex items-center gap-2 p-3 justify-center text-blue-950 cursor-pointer border border-[#E8E8E8] rounded-md bg-[#FBFAFC]"
              >
                <ArrowUpOnSquareIcon className="w-7" />
                {t("upload photo")}
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept=".png, .jpg, .jpeg"
                onChange={handlePhotoMember}
                onBlur={formik.handleBlur}
                hidden
                className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
              />
              {formik.touched.photo && formik.errors.photo ? (
                <p className="text-red-600">{formik.errors.photo}</p>
              ) : null}
            </div>
            {formik.values.photo && (
              <div className="w-20 h-20">
                <img
                  src={`${imagePreview || dataMember?.photoView}`}
                  alt="Preview"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center justify-center">
            <label htmlFor="subscribe">{t("subscribe")}: </label>
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formik.values.subscribe}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.subscribe && formik.errors.subscribe && (
              <p className="text-red-600">{formik.errors.subscribe}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="max-w-[400px] m-auto">
              {!edit ? t("create") : t("update")}
            </Button>
            {edit && (
              <Button
                type="button"
                onClick={() => navigate("/")}
                className="max-w-[400px] m-auto"
              >
                {t("back")}
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateUpdateMember;
