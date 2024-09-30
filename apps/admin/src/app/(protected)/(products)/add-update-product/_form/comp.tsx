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
import { capitalizeWords, PRODUCT_CATEGORIES } from "@/utils";
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
  } = useAddUpdateProductFormCompController({ productId });

  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-fit rounded-md bg-white p-12 shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[650px] space-y-8"
          >
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

            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description: </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Enter description"
                        maxLength={1200}
                        className="resize-none"
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

            <div className="grid grid-cols-2 gap-x-4">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter brand"
                        type="string"
                        {...field}
                      />
                    </FormControl>
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRODUCT_CATEGORIES.map((category) => (
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
            </div>

            <div className="grid grid-cols-2 gap-x-4">
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

            <div className="flex space-x-8">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Images:</FormLabel>
                    <FormControl>
                      <div className="flex w-full items-center justify-center">
                        <label
                          htmlFor="dropzone-file"
                          className="h-62 flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800"
                        >
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <UploadIcon />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
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

              <FormField
                control={form.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>isVisible:</FormLabel>
                    <FormControl>
                      <div>
                        <Switch
                          className="mt-4"
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

            {/* Images container */}
            <div className="grid grid-cols-3 gap-x-4">
              {Array.from(images.entries()).map(([id, base64Image]) => (
                <div className="group relative col-span-1 h-[120px]" key={id}>
                  {/* Image */}
                  <Image
                    src={base64Image}
                    alt={`Image ${id}`}
                    fill
                    objectFit="cover"
                    className="rounded-md transition duration-300 group-hover:brightness-50"
                  />

                  {/* Delete Icon */}
                  <MdDelete
                    className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer text-2xl font-bold text-white opacity-0 transition duration-300 group-hover:opacity-100"
                    onClick={() => handleDeleteImage(id)}
                  />
                </div>
              ))}
            </div>

            {error && <CustomErrorAlert desc={error} />}

            <CustomButton
              type="submit"
              className="w-full bg-blue-contrast hover:bg-blue-contrast/90"
              loading={isAddProductLoading}
            >
              {productId ? "Update" : "Add"}
            </CustomButton>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AddUpdateProductFormComp;
