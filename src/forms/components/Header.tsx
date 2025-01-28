import Image from "next/image";

interface HeaderProps {
  title: string;
  subtitle: string;
}

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <>
      <div className="bg-gray-800 flex p-8">
        <Image
          alt="BUAP Logo"
          src="/buap-logo.webp"
          width={100}
          height={50}
          style={{ height: "auto" }}
        />
      </div>
      <div className="flex flex-col items-center mt-6">
        <h1 className="text-4xl font-bold">{title}</h1>
        <h2 className="text-2xl">{subtitle}</h2>
        <div className="w-[80%] h-0.5 bg-gray-800 mt-4 mb-2"></div>
      </div>
    </>
  );
};
