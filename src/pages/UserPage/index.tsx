import { Outlet } from "react-router-dom";

const UserPage = () => {
  return (
    <div className="mx-auto xl:container py-5 md:py-10">
      <Outlet />
    </div>
  );
};

export default UserPage;
