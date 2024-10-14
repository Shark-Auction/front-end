import { useEffect, useState } from "react";
import CardBlog from "./components/CardBlog";
import { Blog } from "../../../../model/blog";
import { toast } from "react-toastify";
import { blogApiUser } from "../../../../service/api/blogApiUser";
import { Pagination, Skeleton } from "antd";
import EmptyComponent from "../../../../components/Empty";

const BlogList = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await blogApiUser.getBlog();
      setData(
        response.data.sort(
          (a: Blog, b: Blog) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Skeleton loading={loading}>
      {paginatedData.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {paginatedData.map((element: Blog) => (
              <CardBlog data={element} />
            ))}
          </div>
          <div className="flex justify-center mt-5">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={data.length}
              onChange={handlePageChange}
              showSizeChanger
              pageSizeOptions={["8", "16", "24", "32"]}
            />
          </div>
        </>
      ) : (
        <EmptyComponent />
      )}
    </Skeleton>
  );
};

export default BlogList;
