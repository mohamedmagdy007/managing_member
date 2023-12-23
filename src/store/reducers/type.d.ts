export type loginType = {
  isLogin: boolean;
  user: {
    email: string;
  };
  isLogout: boolean;
};
export type membersType = {
  id: number;
  userName: string;
  email: string;
  membership: string;
  subscribe: boolean;
  idNumber: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  membershipDate: string;
  contactNumber: string;
  photo: string;
  photoView: string;
};
export type allMembersType = {
  members: membersType[];
};
