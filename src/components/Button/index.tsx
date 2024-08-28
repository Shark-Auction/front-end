import { Button, ButtonProps } from "antd";

interface ButtonPrimaryProps extends ButtonProps {
  children?: React.ReactElement | string;
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
      className={`border-none !w-fit px-10 py-3 shadow-xl bg-primaryColor hover:!bg-primaryColor hover:!text-black ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
