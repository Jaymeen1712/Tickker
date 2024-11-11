"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  CASE_DIAMETERS,
  CASE_MATERIALS,
  DIAL_COLORS,
  WATCH_BRANDS,
  WATCH_BUCKLES,
  WATCH_CATEGORIES,
  WATCH_MOVEMENTS,
  WATCH_STRAP_SIZES,
  WATCH_STRAPS,
  WATER_RESISTANCE,
} from "@/enum";
import { cn } from "@/lib/utils";
import { capitalizeWords } from "@/utils";
import { MdClose } from "react-icons/md";
import { TiFilter } from "react-icons/ti";
import useWatchesFilterController from "./filter-controller";

const WatchesFilter = () => {
  const {
    form,
    onSubmit,
    isFilterSheetOpen,
    setIsFilterSheetOpen,
    handleResetFilters,
    productAdvanceFilterCount,
    handlePrimaryFilterClick,
    productAdvanceFilters,
  } = useWatchesFilterController();

  return (
    <>
      <div className="container flex items-end gap-x-8 pb-4">
        <div className="grid flex-1 grid-cols-2 gap-x-8">
          {/* Function Regulator Section */}
          {/* <div className="flex flex-col gap-y-4">
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
        </div> */}

          {/* Sizes Section */}
          <div className="hide-scrollbar flex cursor-pointer flex-col gap-y-4 overflow-x-auto">
            <h1 className="text-sm uppercase">Sizes</h1>
            <div className="flex items-center gap-x-2">
              {CASE_DIAMETERS.map((size) => (
                <div
                  key={size}
                  className="border-brown-primary group rounded-full border border-dashed p-[5px]"
                  onClick={() =>
                    handlePrimaryFilterClick({
                      caseDiameter:
                        productAdvanceFilters?.caseDiameter === size
                          ? undefined
                          : size,
                    })
                  }
                >
                  <div
                    className={cn(
                      "bg-brown-primary flex h-7 w-7 items-center justify-center rounded-full text-sm transition-all group-hover:scale-125",
                      productAdvanceFilters?.caseDiameter === size &&
                        "scale-125",
                    )}
                  >
                    {size.slice(0, -2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Materials Section */}
          <div className="hide-scrollbar flex flex-col gap-y-4 overflow-x-auto">
            <h1 className="text-sm uppercase">Materials</h1>
            <div className="flex items-center gap-x-2">
              {DIAL_COLORS.map((color) => (
                <div
                  className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/30 p-[5px] backdrop-blur-lg"
                  onClick={() =>
                    handlePrimaryFilterClick({
                      dialColor:
                        productAdvanceFilters?.dialColor === color
                          ? undefined
                          : color,
                    })
                  }
                  key={color}
                >
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full opacity-70 transition-all group-hover:scale-125",
                      productAdvanceFilters?.dialColor === color && "scale-125",
                    )}
                    style={{
                      background: color,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-x-2">
          {/* <div className="flex h-full items-center">
            <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/30 p-[5px] backdrop-blur-lg">
              <div className="text-center text-xl">
                <LuSearch />
              </div>
            </div>
          </div> */}
          <div className="flex h-full items-center">
            <Sheet open={isFilterSheetOpen} onOpenChange={setIsFilterSheetOpen}>
              <SheetTrigger asChild>
                <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/30 p-[5px] backdrop-blur-lg">
                  <div className="text-center text-xl">
                    <TiFilter />
                  </div>

                  {productAdvanceFilterCount > 0 ? (
                    <div className="absolute -bottom-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-400">
                      <span className="text-xs font-semibold">
                        {productAdvanceFilterCount}
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </SheetTrigger>
              <SheetContent className="single-cart-product-card-remaining-container-gradient flex h-screen flex-col">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-semibold uppercase">
                    Advance filters
                  </SheetTitle>
                </SheetHeader>

                <div className="hide-scrollbar flex-1 overflow-y-auto">
                  <Form {...form}>
                    <form className="space-y-8 py-8">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Category</FormLabel>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="flex items-center gap-x-4">
                                  <SelectTrigger className="border-none bg-black">
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  {field.value && (
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.onChange("");
                                      }}
                                    >
                                      <MdClose
                                        className="fill-red-600"
                                        size={18}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <SelectContent className="border-none bg-black text-white-primary">
                                {WATCH_CATEGORIES.map((category: string) => (
                                  <SelectItem value={category} key={category}>
                                    {capitalizeWords(category)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="brand"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Brand</FormLabel>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="flex items-center gap-x-4">
                                  <SelectTrigger className="border-none bg-black">
                                    <SelectValue placeholder="Select brand" />
                                  </SelectTrigger>
                                  {field.value && (
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.onChange("");
                                      }}
                                    >
                                      <MdClose
                                        className="fill-red-600"
                                        size={18}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <SelectContent className="border-none bg-black text-white-primary">
                                {WATCH_BRANDS.map((brand: string) => (
                                  <SelectItem value={brand} key={brand}>
                                    {capitalizeWords(brand)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="strap"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Strap</FormLabel>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="flex items-center gap-x-4">
                                  <SelectTrigger className="border-none bg-black">
                                    <SelectValue placeholder="Select strap" />
                                  </SelectTrigger>
                                  {field.value && (
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.onChange("");
                                      }}
                                    >
                                      <MdClose
                                        className="fill-red-600"
                                        size={18}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <SelectContent className="border-none bg-black text-white-primary">
                                {WATCH_STRAPS.map((strap: string) => (
                                  <SelectItem value={strap} key={strap}>
                                    {capitalizeWords(strap)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="buckle"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Buckle</FormLabel>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="flex items-center gap-x-4">
                                  <SelectTrigger className="border-none bg-black">
                                    <SelectValue placeholder="Select buckle" />
                                  </SelectTrigger>
                                  {field.value && (
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.onChange("");
                                      }}
                                    >
                                      <MdClose
                                        className="fill-red-600"
                                        size={18}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <SelectContent className="border-none bg-black text-white-primary">
                                {WATCH_BUCKLES.map((buckle: string) => (
                                  <SelectItem value={buckle} key={buckle}>
                                    {capitalizeWords(buckle)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="strapSize"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Strap size</FormLabel>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="flex items-center gap-x-4">
                                  <SelectTrigger className="border-none bg-black">
                                    <SelectValue placeholder="Select strap size" />
                                  </SelectTrigger>
                                  {field.value && (
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.onChange("");
                                      }}
                                    >
                                      <MdClose
                                        className="fill-red-600"
                                        size={18}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <SelectContent className="border-none bg-black text-white-primary">
                                {WATCH_STRAP_SIZES.map((strapSize: string) => (
                                  <SelectItem value={strapSize} key={strapSize}>
                                    {capitalizeWords(strapSize)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="movement"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Movement</FormLabel>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="flex items-center gap-x-4">
                                  <SelectTrigger className="border-none bg-black">
                                    <SelectValue placeholder="Select movement" />
                                  </SelectTrigger>
                                  {field.value && (
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.onChange("");
                                      }}
                                    >
                                      <MdClose
                                        className="fill-red-600"
                                        size={18}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <SelectContent className="border-none bg-black text-white-primary">
                                {WATCH_MOVEMENTS.map((movement: string) => (
                                  <SelectItem value={movement} key={movement}>
                                    {capitalizeWords(movement)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="waterResistance"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Water resistance</FormLabel>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="flex items-center gap-x-4">
                                  <SelectTrigger className="border-none bg-black">
                                    <SelectValue placeholder="Select water resistance" />
                                  </SelectTrigger>
                                  {field.value && (
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.onChange("");
                                      }}
                                    >
                                      <MdClose
                                        className="fill-red-600"
                                        size={18}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <SelectContent className="border-none bg-black text-white-primary">
                                {WATER_RESISTANCE.map(
                                  (waterResistance: string) => (
                                    <SelectItem
                                      value={waterResistance}
                                      key={waterResistance}
                                    >
                                      {capitalizeWords(waterResistance)}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="caseMaterial"
                        render={({ field }) => (
                          <FormItem className="flex flex-col gap-y-2">
                            <FormLabel>Case material</FormLabel>
                            <Select
                              {...field}
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <div className="flex items-center gap-x-4">
                                  <SelectTrigger className="border-none bg-black">
                                    <SelectValue placeholder="Select case material" />
                                  </SelectTrigger>
                                  {field.value && (
                                    <div
                                      className="cursor-pointer"
                                      onClick={() => {
                                        field.onChange("");
                                      }}
                                    >
                                      <MdClose
                                        className="fill-red-600"
                                        size={18}
                                      />
                                    </div>
                                  )}
                                </div>
                              </FormControl>
                              <SelectContent className="border-none bg-black text-white-primary">
                                {CASE_MATERIALS.map((caseMaterial: string) => (
                                  <SelectItem
                                    value={caseMaterial}
                                    key={caseMaterial}
                                  >
                                    {capitalizeWords(caseMaterial)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>

                <SheetFooter className="flex gap-x-4">
                  <Button className="flex-grow" onClick={handleResetFilters}>
                    Reset
                  </Button>
                  <Button
                    onClick={form.handleSubmit(onSubmit)}
                    className="flex-grow"
                  >
                    Apply
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchesFilter;
