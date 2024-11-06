import { BiSquareRounded } from "react-icons/bi";
import { LuSearch } from "react-icons/lu";

const WatchesFilter = () => {
  return (
    <div className="container flex items-end gap-x-2 pb-4">
      <div className="grid flex-1 grid-cols-3 gap-x-8">
        {/* Function Regulator Section */}
        <div className="flex flex-col gap-y-4">
          <h1 className="text-sm uppercase">Function regulator</h1>
          <div className="flex items-center gap-x-2">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-400"
              >
                <BiSquareRounded />
              </div>
            ))}
          </div>
        </div>

        {/* Sizes Section */}
        <div className="flex flex-col gap-y-4">
          <h1 className="text-sm uppercase">Sizes</h1>
          <div className="flex items-center gap-x-2">
            {[34, 37, 40, 42].map((size) => (
              <div
                key={size}
                className="rounded-full border border-dashed border-slate-400 p-[5px]"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-400 text-sm">
                  {size}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Materials Section */}
        <div className="flex flex-col gap-y-4">
          <h1 className="text-sm uppercase">Materials</h1>
          <div className="flex items-center gap-x-2">
            <div className="h-10 w-10 rounded-full bg-red-400" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 p-[5px] backdrop-blur-lg">
              <div className="h-7 w-7 rounded-full bg-blue-400" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 p-[5px] backdrop-blur-lg">
              <div className="h-7 w-7 rounded-full bg-black" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 p-[5px] backdrop-blur-lg">
              <div className="h-7 w-7 rounded-full bg-zinc-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Icon */}
      <div className="flex h-full items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 p-[5px] backdrop-blur-lg">
          <div className="text-center text-xl">
            <LuSearch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchesFilter;
