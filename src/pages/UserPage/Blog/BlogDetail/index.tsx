import { Divider, Skeleton } from "antd";
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
  useEffect(() => {
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
    fetchData();
  }, [id]);
  return (
    <Skeleton loading={loading}>
      {data && (
        <div className="w-full bg-white shadow-shadowLight rounded-2xl p-10 flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-2xl">
              <strong>{data.title}</strong>
            </p>
            <div className="flex gap-2 w-fit items-center flex-wrap">
              <p className="text-base">
                Ngày tạo:{" "}
                <span className="font-bold">
                  {formatDateHour(data.createdAt)}
                </span>
              </p>
              <Divider type="vertical" className=" border-black h-5" />
              <p className="text-base">
                Bởi: <span className="font-bold">{data.user.full_name}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <ImageComponent
              width={"fit"}
              height={500}
              className="object-cover "
              preview={false}
              src={getImageBlog(data?.blogImages[0]?.url)}
            />
          </div>
          <div className="xl:container">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </div>
      )}
    </Skeleton>
  );
};

export default BlogDetail;
