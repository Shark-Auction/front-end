import ImageComponent from "../../../../components/Image";

interface CardCategoryProps {
  icon: string;
  name: string;
}
export const CardCategory = ({ icon, name }: CardCategoryProps) => {
  return (
    <div className="flex flex-col items-center gap-5 py-5 border border-gray-200">
      <div className="w-14 h-14 md:w-20 md:h-20 border rounded-full overflow-hidden">
        <ImageComponent preview={false} width={'100%'} height={'100%'} src={icon} className="!w-full !h-full !object-cover" />
      </div>
      <div>
        <p className="md:text-lg">{name}</p>
      </div>
    </div>
  );
};
