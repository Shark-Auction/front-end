import { IoIosPeople } from "react-icons/io";
import ButtonPrimary from "../../components/Button";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdOutlinePayments } from "react-icons/md";

interface CardContentProps {
  icon: React.ReactElement;
  title: string;
  description: string;
}

interface CardStepWorkProps {
  step: number;
  title: string;
  description: string;
}

const LandingPage = () => {
  return (
    <>
      <div className="relative w-full h-[30vh] md:h-[80vh] overflow-hidden">
        <img
          src="src/assets/background.jpg"
          alt="Background"
          className="hidden md:block absolute object-cover inset-0 w-full h-full"
        />
        <div className="absolute md:inset-0 flex items-center md:px-[10%]">
          <div className=" text-center md:text-left px-2 md:px-4 py-8 flex flex-col items-center md:items-start gap-5">
            <h1 className="text-3xl md:text-4xl text-primaryColor font-bold">
              Discover new values from old things via the auction world.
            </h1>
            <p className="text-lg">Where you can find what you want.</p>
            <ButtonPrimary onClick={() => console.log("as")}>
              Join Now
            </ButtonPrimary>
          </div>
        </div>
      </div>

      <div className="container mx-auto md:mt-10 flex flex-col gap-20">
        <div className="flex flex-col items-center text-center gap-2">
          <p className="text-3xl font-bold">Heading 1</p>
          <p className="text-lg">Description (Introduce about website)</p>
        </div>
        <div className="grid grid-cols-3">
          <CardContent
            icon={<IoIosPeople className="text-9xl" />}
            title="Trusting Organization and Community"
            description="In the process of internal desktop applications development, 
            many different design specs and implementations would be involved"
          />
          <CardContent
            icon={<IoShieldCheckmarkOutline className="text-9xl" />}
            title="Reliable Security System"
            description="In the process of internal desktop applications development, 
            many different design specs and implementations would be involved"
          />
          <CardContent
            icon={<MdOutlinePayments className="text-9xl" />}
            title="Payment Easily and Quickly"
            description="In the process of internal desktop applications development, 
            many different design specs and implementations would be involved"
          />
        </div>
        <div>
          <p className="text-3xl font-bold text-center mb-10">How the app work?</p>
          <div className="grid grid-cols-4">
            <CardStepWork
              step={1}
              title="Sign up"
              description="In the process of internal desktop applications development, 
              many different design specs and implementations would be involved"
            />
             <CardStepWork
              step={2}
              title="Create Product"
              description="In the process of internal desktop applications development, 
              many different design specs and implementations would be involved"
            />
             <CardStepWork
              step={3}
              title="Bidding"
              description="In the process of internal desktop applications development, 
              many different design specs and implementations would be involved"
            />
             <CardStepWork
              step={4}
              title="Payment"
              description="In the process of internal desktop applications development, 
              many different design specs and implementations would be involved"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const CardContent = ({ title, icon, description }: CardContentProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      {icon}
      <p className="font-semibold text-2xl text-center">{title}</p>
      <p className="text-lg text-center">{description}</p>
    </div>
  );
};

const CardStepWork = ({ step, title, description }: CardStepWorkProps) => {
  return (
    <div className="flex flex-col gap-2">
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
