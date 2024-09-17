import { Divider, Skeleton } from "antd";
import ProfileInformation from "./components/ProfileInformation";
import { useEffect, useState } from "react";
import { User } from "../../../../../model/user";
import { toast } from "react-toastify";
import { profileApi } from "../../../../../service/api/profileApi";

export const MyProfile = () => {
  const [profile, setProfile] = useState<User>()
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const response = await profileApi.getMyProfile()
        setProfile(response.data)
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])
  return (
    <Skeleton loading={loading}>
      <div>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">Thông tin cá nhân</p>
          <p className="text-base text-gray-500">Xem và chỉnh sửa thông tin cá nhân của bạn</p>
        </div>
        <Divider className="my-5" />
        <div className="flex ">
          <ProfileInformation
            data={profile}
          />
        </div>
      </div>
    </Skeleton>
  );
};
