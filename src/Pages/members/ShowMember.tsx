import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Components/Custom/Button";
import { deleteHandler } from "../../store/reducers/members";
import {
  CheckCircleIcon,
  UserCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import PopupModal from "../../Components/Custom/popupModal";
import { useLocalization } from "../../Hooks/useLocalization";

const ShowMember = () => {
  const { members } = useAppSelector((state) => state.members);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useLocalization();
  const dataMember = members.find((item) => (id ? item.id === +id : item));
  const toggleModalHandler = () => {
    setOpen(!open);
  };
  if (!dataMember) {
    return (
      <div className="w-full bg-white rounded-[25px] p-8 grid gap-4 text-center">
        {t("not found member")}
        <Button className="max-w-[400px] m-auto" onClick={() => navigate(-1)}>
          {t("back")}
        </Button>
      </div>
    );
  }
  const handleDelete = () => {
    dispatch(deleteHandler(dataMember?.id));
    setOpen(!open);
    navigate("/");
  };
  return (
    <>
      <PopupModal
        isOpen={open}
        closeModal={toggleModalHandler}
        title={t("delete member")}
      >
        <div className="flex gap-2 grow">
          <Button
            className="max-w-[400px] m-auto bg-green-700"
            onClick={handleDelete}
          >
            {t("yes")}
          </Button>
          <Button
            className="max-w-[400px] m-auto bg-red-700"
            onClick={toggleModalHandler}
          >
            {t("no")}
          </Button>
        </div>
      </PopupModal>
      <div className="w-full bg-white rounded-[25px] p-5 grid gap-4">
        <div className="p-2 flex flex-wrap-reverse  justify-between border-[#E8E8E8] border rounded-md bg-[#FBFAFC]">
          <div className="grid">
            <p className="flex text-lg font-bold text-main-color">
              {t("user name")}: {dataMember?.userName}
            </p>
            <p className="flex text-lg font-bold text-main-color">
              {t("email")}: {dataMember?.email}
            </p>
            <p className="flex text-lg font-bold text-main-color">
              {t("gender")}: {dataMember?.gender}
            </p>
            <p className="flex text-lg font-bold text-main-color">
              {t("address")}: {dataMember?.address}
            </p>
          </div>
          <div className="w-32 h-32">
            {dataMember?.photoView ? (
              <img
                src={dataMember?.photoView}
                alt="photo"
                className="rounded-full w-full h-full object-cover"
              />
            ) : (
              <UserCircleIcon />
            )}
          </div>
        </div>
        <div className="p-2 flex flex-wrap gap-2  justify-between border-[#E8E8E8] border rounded-md bg-[#FBFAFC]">
          <div className="flex grow gap-2 border-[#E8E8E8] border rounded-md p-2">
            <span className="text-main-color">{t("id number")}:</span>{" "}
            {dataMember?.idNumber}
          </div>
          <div className="flex grow gap-2 border-[#E8E8E8] border rounded-md p-2">
            <span className="text-main-color">{t("date of birth")}:</span>{" "}
            {dataMember?.dateOfBirth}
          </div>
          <div className="flex grow gap-2 border-[#E8E8E8] border rounded-md p-2">
            <span className="text-main-color">{t("contact number")}: </span>{" "}
            {dataMember?.contactNumber}
          </div>
          <div className="flex grow gap-2 border-[#E8E8E8] border rounded-md p-2">
            <span className="text-main-color">
              {t("membership start date")}:{" "}
            </span>{" "}
            {dataMember?.membershipDate}
          </div>
          <div className="flex grow gap-2 items-center border-[#E8E8E8] border rounded-md p-2">
            <span className="text-main-color">{t("subscribe")}:</span>
            {dataMember?.subscribe ? (
              <CheckCircleIcon className="text-green-700 w-5" />
            ) : (
              <XCircleIcon className="text-red-700 w-5" />
            )}
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            className="max-w-[400px] m-auto bg-green-700"
            onClick={() => navigate(`/edit/${dataMember?.id}`)}
          >
            {t("edit")}
          </Button>
          <Button
            className="max-w-[400px] m-auto bg-red-700"
            onClick={() => setOpen(true)}
          >
            {t("delete")}
          </Button>
          <Button
            className="max-w-[400px] m-auto"
            onClick={() => navigate("/")}
          >
            {t("back")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShowMember;
