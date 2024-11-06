import Image from "next/image";

const ProductDetailsContainer = () => {
  return (
    <div className="container flex items-center gap-x-16 py-16">
      <div className="flex flex-1 flex-col gap-y-2">
        <h1 className="text-base uppercase">Title</h1>
        <div className="text-sm">Description</div>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-base uppercase">Various models</h1>
        <div className="text-sm">Description</div>
      </div>
      <div className="flex items-center gap-x-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            className="relative h-[140px] w-[140px] mix-blend-darken"
            key={index}
          >
            <Image
              src={`/watches/28000253_fr.jpg`}
              alt="logo-maker"
              fill
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsContainer;
