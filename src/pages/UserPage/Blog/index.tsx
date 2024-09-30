import { Outlet } from "react-router-dom";

const BlogPage = () => {
  return (
    <div>
      <div className="flex justify-center">
        <span
          className="bg-clip-text text-4xl lg:text-4xl font-extrabold
        text-transparent bg-gradient-to-r from-pink-700 via-pink-600 to-pink-500"
        >
          Shark Auction Blog
        </span>
      </div>
      <div className="my-5"></div>
      <Outlet />
    </div>
  );
};

export default BlogPage;
