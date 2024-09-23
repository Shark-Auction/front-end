import { Button, ButtonProps } from "antd";

interface ButtonPrimaryProps extends ButtonProps {
  children?: React.ReactElement | string[] | string;
  className?: string;
  hover?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  children,
  className,
  hover= '!bg-gradient-primary',
  ...rest
}) => {
  return (
    <Button
      {...rest}
      type="primary"
      className={`!w-fit px-3 sm:px-3 md:px-3 lg:px-6 py-3 shadow-xl 
        bg-gradient-primary text-white hover:${hover} hover:!text-white ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonPrimary;
