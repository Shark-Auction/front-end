import { Divider } from "antd";
import ProfileInformation from "./components/ProfileInformation";

export const MyProfile = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-bold">Profile</p>
        <p className="text-base text-gray-500">View and edit your profile</p>
      </div>
      <Divider className="my-5" />
      <div className="flex ">
        <ProfileInformation
          name="Name"
          phoneNumber="0349061446"
          email="namquangbinh"
          address="Binh Duong Oke"
        />
      </div>
    </div>
  );
};
