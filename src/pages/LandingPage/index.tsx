import ButtonPrimary from "../../components/Button";
import { IoShieldCheckmark } from "react-icons/io5";
import { MdGavel, MdOutlineTouchApp } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { GiScales } from "react-icons/gi";
import { FaInfoCircle } from "react-icons/fa";
import { getImageFE } from "../../utils/getImage";

interface CardContentProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  className?: string;
}

interface CardStepWorkProps {
  step: number;
  title: string;
  description: string;
}

const LandingPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("fade-left")) {
              entry.target.classList.add("animate-fadeInLeft");
            } else if (entry.target.classList.contains("fade-right")) {
              entry.target.classList.add("animate-fadeInRight");
            } else {
              entry.target.classList.add("animate-fadeInUp"); // Default to fade-in-up
            }
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    const hiddenElements = document.querySelectorAll(".hidden-on-scroll");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  return (
    <>
      <div className="relative w-full h-[30vh] md:h-[80vh] overflow-hidden">
        <img
          src={getImageFE('background.jpg')}
          alt="Background"
          className="hidden md:block absolute object-cover inset-0 w-full h-full"
        />
        <div className="absolute md:inset-0 flex items-center container mx-auto">
          <div
            className="bg-white lg:w-[700px] rounded-lg p-2 bg-opacity-30 text-center md:text-left 
          px-2 md:px-4 py-8 flex flex-col items-center md:items-start gap-5 hidden-on-scroll fade-left"
          >
            <span className="bg-clip-text text-xl lg:text-4xl font-extrabold text-transparent bg-gradient-to-r from-sky-500 to-indigo-500">
              Bắt đầu hành trình của bạn ngay hôm nay!
            </span>
            <p className="text-base lg:text-xl font-medium text-justify">
              Đừng bỏ lỡ cơ hội sở hữu những món đồ độc đáo với giá cực kỳ hấp
              dẫn. Tham gia ngay hôm nay và biến mọi cuộc đấu giá trở thành trải
              nghiệm thú vị và đáng nhớ tại Shark Auction.
            </p>
            <ButtonPrimary onClick={() => navigate("/u/home")}>
              Tham gia ngay
            </ButtonPrimary>
          </div>
        </div>
      </div>
      <div className="flex flex-col container mx-auto justify-center items-center">
        <div className="px-2 lg:px-0 lg:container mx-auto md:mt-10 flex flex-col gap-20">
          <div className="flex flex-col items-center text-center gap-10 hidden-on-scroll fade-up">
            <span
              className="bg-clip-text text-transparent text-5xl p-1 font-extrabold 
            bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500"
            >
              Shark Auction - Đấu giá nhanh, săn hàng chất!
            </span>
            <p className="text-xl lg:w-[800px] text-center">
              Chào mừng bạn đến với Shark Auction, nền tảng đấu giá trực tuyến
              Việt Nam mới được ra mắt, nơi mọi người có cơ hội săn lùng được
              những sản phẩm hấp dẫn với mức giá bất ngờ. Hơn thế nữa. Chúng tôi
              mang đến cho bạn một thế giới đa dạng sản phẩm từ đồ điện tử, thời
              trang, phụ kiện và nhiều hơn thế nữa. Tất cả đều dành cho bạn!
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="grid md:grid-cols-3 gap-5 hidden-on-scroll fade-right">
              <CardContent
                icon={<MdGavel className="text-9xl" />}
                title="Đấu giá đa dạng, sản phẩm độc đáo"
                description=" Từ những đồ sưu tầm cho đến thiết bị công nghệ, tất cả đều có 
                thể xuất hiện tại đây. Bạn sẽ không bao giờ biết mình có thể tìm thấy điều gì tiếp theo!"
              />
              <CardContent
                icon={<GiScales className="text-9xl" />}
                title="Giá thầu minh bạch, công bằng"
                description="Chúng tôi cam kết đem đến một nền tảng đấu giá công 
                bằng và minh bạch, nơi mà mọi người đều có cơ hội thắng cuộc."
              />
              <CardContent
                icon={<MdOutlineTouchApp className="text-9xl" />}
                title="Giao diện thân thiện, dễ sử dụng"
                description="Với giao diện đơn giản và trực quan, bạn 
                có thể dễ dàng tham gia đấu giá chỉ với vài cú nhấp chuột"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-5 hidden-on-scroll fade-right">
              <CardContent
                icon={<FaInfoCircle className="text-9xl" />}
                title="Thông tin chi tiết, cập nhật liên tục"
                description="Theo dõi đấu giá mọi lúc mọi nơi với thông báo thời 
                gian thực và cập nhật liên tục về tình trạng sản phẩm."
              />
              <CardContent
                icon={<IoShieldCheckmark className="text-9xl" />}
                title="Bảo mật và an toàn"
                description="Hệ thống bảo mật cao, bảo vệ quyền lợi và thông tin của người dùng."
              />
            </div>
          </div>

          <div className="hidden-on-scroll fade-left">
            <p className="text-3xl font-bold text-center mb-10">
              Cách Shark Auction vận hành
            </p>
            <div className="md:grid md:grid-cols-4">
              <CardStepWork
                step={1}
                title="Đăng ký"
                description="Đăng ký tài khoản. Chỉ cần nhập các thông tin cơ bản đã có thể
                tham gia vào Shark Auction."
              />
              <CardStepWork
                step={2}
                title="Tạo sản phẩm"
                description="Tạo cho bản thân sản phẩm để có thể đăng lên trang đấu giá Shark Auction."
              />
              <CardStepWork
                step={3}
                title="Đấu thầu"
                description="Tham gia đấu giá các sản phẩm được các người dùng khác đăng."
              />
              <CardStepWork
                step={4}
                title="Giao dịch"
                description="Thanh toán các sản phẩm đấu giá thắng để sở hữu ngay sản phẩm"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between w-full gap-32 hidden-on-scroll fade-left">
            <div className="relative h-[300px] lg:w-1/2 overflow-hidden rounded-xl bg-center">
              <img
                src={getImageFE('about.png')}
                alt="Background"
                className="block absolute object-cover inset-0 w-full h-full"
              />
              <div className="absolute inset-0 w-full flex items-center justify-center">
                <div className="w-fit bg-white bg-opacity-90 rounded-xl p-10">
                  <span className="bg-clip-text text-4xl font-extrabold text-transparent bg-gradient-to-r from-pink-900 via-pink-700 to-pink-500">
                    Về chúng tôi
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center w-full lg:w-1/2 h-[300px]">
              <p className="w-full lg:w-full text-xl leading-relaxed text-justify">
                <span className="float-left text-6xl font-extrabold leading-none">
                  C
                </span>
                húng tôi bắt đầu từ những mong muốn nhỏ bé là có thể tạo ra một
                nền tảng đấu giá dành riêng cho Việt Nam.{" "}
                <span className="font-bold text-blue-600">Shark Auction</span> ở
                đây là nơi cho mọi người có thể thoải mái mua bán đa dạng sản
                phẩm qua hình thức đấu giá. Uy tín, dễ dùng và đa dạng.{" "}
                <span className="font-bold text-blue-600">Shark Auction</span>{" "}
                sẽ mang lại cơ hội cho bạn trải nghiệm “Thuận mua vừa bán”.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CardContent = ({
  title,
  icon,
  description,
  className,
}: CardContentProps) => {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      {icon}
      <p className="font-semibold text-2xl text-center">{title}</p>
      <p className="text-lg text-center">{description}</p>
    </div>
  );
};

const CardStepWork = ({ step, title, description }: CardStepWorkProps) => {
  return (
    <div className="flex flex-col gap-2 p-5">
      <div className="flex items-center gap-4">
        <div className="bg-primaryColor px-4 py-1 rounded-full">
          <p className="text-white text-3xl">{step}</p>
        </div>
        <p className="font-semibold text-3xl">{title}</p>
      </div>
      <p className="text-lg">{description}</p>
    </div>
  );
};

export default LandingPage;
