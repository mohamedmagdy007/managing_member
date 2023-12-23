import * as yup from "yup";
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a vaild email address")
    .required("Email is requried"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 char length")
    .required("Password is requried"),
});
export const createMemberSchema = yup.object().shape({
  userName: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Alphanumeric characters only")
    .required("name is required"),
  email: yup
    .string()
    .email("Enter a vaild email address")
    .required("Email is requried"),
  membership: yup.string().required("membership type is requried"),
  idNumber: yup
    .string()
    .required("ID Number is required")
    .matches(/^\d{14}$/, "ID Number must be exactly 14 digits"),
  gender: yup.string().required("gender is requried"),
  address: yup.string().required("address is requried"),
  membershipDate: yup
    .string()
    .required("Date is required")
    .test("is-valid-date", "Invalid date", (value) => {
      return value ? !isNaN(new Date(value).getTime()) : true;
    }),
  contactNumber: yup
    .string()
    .required("Contact Number is required")
    .matches(/^\d{11}$/, "Contact Number must be exactly 11 digits"),
  photo: yup.mixed().test("fileType", "Invalid file type", (value) => {
    if (value instanceof File) {
      const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
      return allowedFileTypes.includes(value.type);
    }
    return true;
  }),
});
