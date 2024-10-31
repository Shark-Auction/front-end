import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import ImageComponent from "../../../../../components/Image";
import { Blog } from "../../../../../model/blog";
import { formatDateHour } from "../../../../../utils/format";
import { getImageBlog } from "../../../../../utils/getImage";

interface CardBlogProps {
  data: Blog;
}

const CardBlog = ({ data }: CardBlogProps) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`${data.id}`)}
      hoverable
      className="shadow-shadowLight !overflow-hidden"
      bodyStyle={{ padding: 0 }}
    >
      <div className="w-full">
        <ImageComponent
          preview={false}
          width={"100%"}
          height={300}
          className="object-contain rounded-xl"
          src={getImageBlog(data.blogImages[0]?.url)}
        />
      </div>
      <div className="p-5 flex flex-col justify-between gap-2">
        <p
          className="text-2xl"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            wordBreak: "break-word",
            maxHeight: "3em",
          }}
        >
          <strong>{data.title}</strong>
        </p>
        <div>
          <p className="text-base italic">
            Ngày tạo:{" "}
            <span className="text-gray-500">
              {formatDateHour(data.createdAt)}
            </span>
          </p>
          <p className="text-base italic">
            Bởi: <span className="text-gray-500">{data.user.full_name}</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CardBlog;
