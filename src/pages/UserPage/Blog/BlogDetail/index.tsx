import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ImageComponent from "../../../../components/Image";
import { Blog } from "../../../../model/blog";
import { blogApiUser } from "../../../../service/api/blogApiUser";
import { formatDateHour } from "../../../../utils/format";
import { getImageBlog } from "../../../../utils/getImage";

const BlogDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Blog>();
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await blogApiUser.getDetailBlog(Number(id));
      setData(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <Skeleton loading={loading}>
      {data && (
        <div className="w-full bg-white shadow-shadowLight rounded-2xl p-10">
          <p className="text-2xl">
            <strong>{data.title}</strong>
          </p>
          <p className="text-base italic">
            Ngày tạo:{" "}
            <span className="text-gray-500">
              {formatDateHour(data.createdAt)}
            </span>
          </p>
          <p className="text-base italic">
            Bởi: <span className="text-gray-500">{data.user.full_name}</span>
          </p>
          <div className="flex justify-center">
            <ImageComponent
              width={"fit"}
              height={700}
              className="object-cover !w-fit !rounded-2xl shadow-shadowLight"
              preview={false}
              src={getImageBlog(data?.blogImages[0]?.url)}
            />
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      )}
    </Skeleton>
  );
};

export default BlogDetail;
