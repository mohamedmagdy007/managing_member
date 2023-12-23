import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { membersType } from "../../../store/reducers/type";
import { useAppDispatch } from "../../../store";
import PopupModal from "../popupModal";
import Button from "../Button";
import { deleteHandler } from "../../../store/reducers/members";
import { useLocalization } from "../../../Hooks/useLocalization";

type PropsType = {
  member: membersType;
};
const RowMember = ({ member }: PropsType) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLocalization();
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    navigate(`/edit/${member.id}`);
  };
  const handleView = () => {
    navigate(`/open/${member.id}`);
  };
  const toggleModalHandler = () => {
    setOpen(!open);
  };
  const handleDelete = () => {
    dispatch(deleteHandler(member.id));
    setOpen(!open);
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
      <tr>
        <td className="py-2 px-4 border-b border-r">{member.id}</td>
        <td className="py-2 px-4 border-b border-r">{member.userName}</td>
        <td className="py-2 px-4 border-b border-r">{member.email}</td>
        <td className="py-2 px-4 border-b border-r">{member.membership}</td>
        <td className="py-2 px-4 border-b border-r">{member.idNumber}</td>
        <td className="py-2 px-4 border-b border-r">{member.membershipDate}</td>
        <td className="py-2 px-4 border-b border-r">{member.contactNumber}</td>
        <td className="py-2 px-4 border-b border-r flex">
          <Button className="max-w-[400px] m-auto" onClick={handleView}>
            {t("view")}
          </Button>
          <Button
            className=" bg-green-700 max-w-[400px] m-auto"
            onClick={handleEdit}
          >
            {t("edit")}
          </Button>
          <Button
            className="max-w-[400px] m-auto bg-red-700"
            onClick={() => setOpen(true)}
          >
            {t("delete")}
          </Button>
        </td>
      </tr>
    </>
  );
};

export default RowMember;
