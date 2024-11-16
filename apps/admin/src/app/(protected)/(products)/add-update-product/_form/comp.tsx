"use client";
import { CustomButton, CustomErrorAlert } from "@/components";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UploadIcon } from "@/images";
import {
  capitalizeWords,
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
} from "@/utils";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import useAddUpdateProductFormCompController from "./comp-controller";

interface AddUpdateProductFormCompProps {
  productId?: string;
}

const AddUpdateProductFormComp: React.FC<AddUpdateProductFormCompProps> = ({
  productId,
}) => {
  const {
    descriptionLength,
    handleDescriptionOnChange,
    form,
    onSubmit,
    error,
    isAddProductLoading,
    handleImageOnChange,
    handleDeleteImage,
    images,
    isAddImageLoading,
  } = useAddUpdateProductFormCompController({ productId });

  return (
    <div className="flex flex-1 items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="box-shadow-container space-y-8 !p-8"
        >
          <div className="flex w-full justify-center text-2xl font-semibold uppercase">
            Add watch
          </div>

          <div className="grid grid-cols-3 gap-x-8 divide-x-4">
            <div className="flex h-full flex-col">
              <h1 className="text-center text-lg uppercase">General details</h1>

              <div className="flex flex-1 flex-col gap-y-8 py-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-4 space-y-0">
                      <FormLabel>Name:</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-4 space-y-0">
                      <FormLabel>Model:</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter model" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-1 flex-col">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="flex h-full flex-col">
                        <FormLabel className="mb-2">Description: </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter description"
                            maxLength={1200}
                            className="flex-1 resize-none bg-white"
                            onChange={(e) => {
                              field.onChange(e);
                              handleDescriptionOnChange(e);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-2 text-end text-xs text-zinc-500">
                    <span>{descriptionLength}</span>
                    <span>/ 1200 Characters</span>
                  </div>
                </div>

                <div className="flex gap-x-4">
                  <div className="grid flex-1 grid-cols-2 gap-x-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter price"
                              type="number"
                              className="hide-input-number-arrows"
                              value={field.value ?? undefined}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter stock"
                              type="number"
                              className="hide-input-number-arrows"
                              value={field.value ?? undefined}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="isVisible"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>isVisible:</FormLabel>
                        <FormControl>
                          <div>
                            <Switch
                              className="mt-4 data-[state=checked]:bg-blue-primary"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="pl-8">
              <h1 className="text-center text-lg uppercase">
                Watch Specific details
              </h1>

              <div className="grid grid-cols-2 gap-x-4 py-8">
                <div className="flex flex-col gap-y-8">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand:</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select brand" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {WATCH_BRANDS.map((brand) => (
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
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category:</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {WATCH_CATEGORIES.map((category) => (
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
                    name="strap"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Strap:</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select strap" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {WATCH_STRAPS.map((strap) => (
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
                      <FormItem>
                        <FormLabel>Buckle:</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select buckle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {WATCH_BUCKLES.map((buckle) => (
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
                      <FormItem>
                        <FormLabel>Strap size:</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select strap size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {WATCH_STRAP_SIZES.map((size) => (
                              <SelectItem value={size} key={size}>
                                {capitalizeWords(size)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-y-8">
                  <FormField
                    control={form.control}
                    name="movement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Movement:</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select movement" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {WATCH_MOVEMENTS.map((movement) => (
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
                      <FormItem>
                        <FormLabel>Water resistance:</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select water resistance" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {WATER_RESISTANCE.map((resistance) => (
                              <SelectItem value={resistance} key={resistance}>
                                {capitalizeWords(resistance)}
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
                    name="caseMaterial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Case material:</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select case material" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CASE_MATERIALS.map((material) => (
                              <SelectItem value={material} key={material}>
                                {capitalizeWords(material)}
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
                    name="caseDiameter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Case diameter:</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select case diameter" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {CASE_DIAMETERS.map((diameter) => (
                              <SelectItem value={diameter} key={diameter}>
                                {capitalizeWords(diameter)}
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
                    name="dialColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dial color:</FormLabel>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select dial color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DIAL_COLORS.map((color) => (
                              <SelectItem value={color} key={color}>
                                {capitalizeWords(color)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="pl-8">
              <h1 className="text-center text-lg uppercase">Images</h1>

              <div className="flex flex-col gap-y-8 py-8">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative flex w-full items-center justify-center">
                          <label
                            htmlFor="dropzone-file"
                            className={`h-62 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                              images.size >= 3
                                ? "cursor-not-allowed border-gray-300 bg-gray-200 opacity-50"
                                : "border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                            }`}
                          >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                              {isAddImageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-100 bg-opacity-75">
                                  <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-gray-500"></div>
                                </div>
                              )}
                              <UploadIcon />
                              <p
                                className={`mb-2 text-sm ${
                                  images.size >= 3
                                    ? "text-gray-400"
                                    : "text-gray-500 dark:text-gray-400"
                                }`}
                              >
                                <span className="font-semibold">
                                  {images.size >= 3
                                    ? "Limit reached"
                                    : "Click to upload"}
                                </span>{" "}
                                {images.size < 3 && "or drag and drop"}
                              </p>
                            </div>
                            <Input
                              {...field}
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => {
                                handleImageOnChange(e);
                                field.onChange(e);
                              }}
                              disabled={images.size >= 3}
                              id="dropzone-file"
                              className="hidden"
                            />
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Images container */}
                {images.size ? (
                  <div className="grid grid-cols-3 gap-x-4">
                    {Array.from(images.entries()).map(([id, base64Image]) => (
                      <div
                        className="group relative col-span-1 h-[120px]"
                        key={id}
                      >
                        {/* Image */}
                        <Image
                          src={base64Image}
                          alt={`Image ${id}`}
                          fill
                          className="rounded-md object-cover transition duration-300 group-hover:brightness-50"
                        />

                        {/* Delete Icon */}
                        <MdDelete
                          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-2xl font-bold text-white opacity-0 transition duration-300 group-hover:opacity-100"
                          onClick={() => handleDeleteImage(id)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>

          {error && <CustomErrorAlert desc={error} />}

          <CustomButton
            type="submit"
            className="w-full bg-blue-primary hover:bg-blue-700/90"
            loading={isAddProductLoading}
          >
            {productId ? "Update" : "Add"}
          </CustomButton>
        </form>
      </Form>
    </div>
  );
};

export default AddUpdateProductFormComp;
