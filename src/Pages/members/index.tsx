import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store";
import RowMember from "../../Components/Custom/RowTable";
import { useLocalization } from "../../Hooks/useLocalization";
import { useState } from "react";
const headerList = [
  "id",
  "user name",
  "email",
  "membership type",
  "id number",
  "membership start date",
  "phone number",
];
const Members = () => {
  const { members } = useAppSelector((state) => state.members);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { t } = useLocalization();
  const filterMember = members.filter((item) =>
    search
      ? item.userName.includes(search) ||
        item.email.includes(search) ||
        item.contactNumber.includes(search) ||
        item.membership.includes(search) ||
        item.idNumber.includes(search) ||
        item.membershipDate.includes(search)
      : item
  );

  return (
    <div className="w-full bg-white rounded-[25px] p-5 grid gap-4 overflow-x-auto">
      <div className="w-full mx-auto">
        <div className="flex justify-between mb-2">
          <h2 className="text-main-color text-lg font-bold">
            {t("all members")}
          </h2>
          <div className="flex gap-2">
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search"
              className="border border-[#E8E8E8] rounded-md bg-[#FBFAFC] py-2 px-4 outline-0 focus:border-main-color"
            />
            <button
              onClick={() => navigate("/create")}
              className="flex gap-1 border-2 border-main-color text-main-color rounded-md py-1 px-2"
            >
              <span>{t("create member")} +</span>
            </button>
          </div>
        </div>
        <table className="min-w-full  p-md-2 m-md-1 bg-white border border-gray-300">
          <thead>
            <tr>
              {headerList.map((headItem, index) => (
                <th className="py-2 px-4 border-b border-r" key={index}>
                  {t(headItem)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterMember.length ? (
              filterMember.map((memberItem, index) => (
                <RowMember member={memberItem} key={index} />
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <p className="text-center text-main-color my-4 text-lg font-bold w-full">
                    {t("not found members")}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
