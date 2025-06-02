import { ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type MultiImageUploadProps = {
  name: string;
  control: Control<any>;
  maxImages?: number;
  label?: string;
};

export function MultiImageUpload({
  name,
  control,
  maxImages = 5,
  label,
}: MultiImageUploadProps) {
  const {
    field: { onChange, value = [] },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [previews, setPreviews] = useState<string[]>(value); // base64 array
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // ensure local preview stays in sync with form value
    if (
      Array.isArray(value) &&
      JSON.stringify(value) !== JSON.stringify(previews)
    ) {
      setPreviews(value);
    }
  }, [value]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject("Lỗi đọc file");
      reader.readAsDataURL(file);
    });

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const validImageFiles = fileArray.filter((file) => {
      const isValid = file.type.startsWith("image/");
      if (!isValid) {
        toast.error(`"${file.name}" không phải là ảnh hợp lệ`);
      }
      return isValid;
    });

    if (validImageFiles.length === 0) {
      toast.error(`Chỉ được tải lên ảnh`);
      return;
    }

    const totalImages = value.length + validImageFiles.length;
    if (totalImages > maxImages) {
      toast.error(`Chỉ được tải lên tối đa ${maxImages} ảnh`);
      return;
    }

    const base64List = await Promise.all(validImageFiles.map(fileToBase64));
    const updated = [...value, ...base64List];
    setPreviews(updated);
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...value];
    updated.splice(index, 1);
    setPreviews(updated);
    onChange(updated);
  };

  return (
    <div className="grid w-full items-start gap-4">
      <div>
        {label && <Label className="mb-2 block">{label}</Label>}

        <label htmlFor={`file-${name}`}>
          <div className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 px-4 py-2 transition hover:bg-gray-100">
            <ImagePlus className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-sm">Chọn ảnh</span>
          </div>
        </label>

        <Input
          id={`file-${name}`}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFilesChange}
        />

        {error && <FormMessage>{error.message}</FormMessage>}
      </div>

      <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
        {previews.map((img, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded border"
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img}
              alt={`Ảnh ${index}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-1 right-1 z-10 h-6 w-6 rounded-full p-0"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(index);
              }}
              type="button"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Xem ảnh"
              className="max-h-[80vh] w-full rounded object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
