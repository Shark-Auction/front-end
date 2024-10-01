import { Card } from "antd";
import ImageComponent from "../../../../../components/Image";
import { Blog } from "../../../../../model/blog";
import { getImageBlog } from "../../../../../utils/getImage";
import { Link } from "react-router-dom";
import { formatDateHour } from "../../../../../utils/format";

interface CardBlogProps {
  data: Blog;
}

const CardBlog = ({ data }: CardBlogProps) => {
  return (
    <Card
      hoverable
      className="shadow-shadowLight !overflow-hidden"
      bodyStyle={{ padding: 0 }}
    >
      <div className="w-full">
        <ImageComponent
          width={'100%'}
          height={300}
          className="object-contain rounded-xl"
          src={getImageBlog(data.blogImages[0]?.url)}
        />
      </div>
      <div className="p-5">
        <p
          className="text-2xl"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <strong>{data.title}</strong>
        </p>
        <p className="text-base italic">Ngày tạo: <span className="text-gray-500">{formatDateHour(data.createdAt)}</span></p>
        <p className="text-base italic">Bởi: <span className="text-gray-500">{data.user.full_name}</span></p>
        <Link
          to={`${data.id}`}
          className="text-base text-blue-500 underline flex justify-center !mt-5"
        >
          Xem chi tiết
        </Link>
      </div>
    </Card>
  );
};

export default CardBlog;
