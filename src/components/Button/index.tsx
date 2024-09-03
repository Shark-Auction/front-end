import { Button, ButtonProps } from "antd";

interface ButtonPrimaryProps extends ButtonProps {
  children?: React.ReactElement | string[] | string;
  className?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      className={`!w-fit px-3 sm:px-3 md:px-3 lg:px-6 py-3 shadow-xl bg-primaryColor hover:!bg-primaryColor hover:!text-black ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
