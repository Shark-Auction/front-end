interface TitleLayoutProps extends React.HTMLAttributes<HTMLParagraphElement>{
  children?: React.ReactNode;
  className?: string;
}
const TitleLayout = ({ children, className, ...rest }: TitleLayoutProps) => {
  return (
    <p className={`text-white drop-shadow-xl ${className}`} {...rest}>
      {children}
    </p>
  );
};

export default TitleLayout;
