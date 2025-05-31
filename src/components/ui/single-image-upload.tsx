import { ImagePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Control, useController } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type SingleImageUploadProps = {
  name: string;
  control: Control<any>;
  label?: string;
  className?: string;
};

export function SingleImageUpload({
  name,
  control,
  label,
  className,
}: SingleImageUploadProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // 🟢 Load ảnh base64 có sẵn (nếu có)
  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(`"${file.name}" không phải là ảnh hợp lệ`);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onChange(base64String); // ✅ Truyền string base64
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(""); // hoặc onChange("") tùy form
  };

  return (
    <div className={cn("grid w-full items-start gap-2", className)}>
      <div>
        {label && <Label className="mb-2 block">{label}</Label>}

        <label htmlFor={`file-${name}`}>
          <div className="flex w-fit cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 px-4 py-2 transition hover:bg-gray-100">
            <ImagePlus className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-sm">
              {preview ? "Đổi ảnh" : "Chọn ảnh"}
            </span>
          </div>
        </label>

        <Input
          id={`file-${name}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {error && <FormMessage>{error.message}</FormMessage>}
      </div>

      {preview && (
        <div
          className="relative w-40 cursor-pointer overflow-hidden rounded border"
          onClick={() => setSelectedImage(preview)}
        >
          <img
            src={preview}
            alt="Ảnh xem trước"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <Button
            size="icon"
            variant="destructive"
            className="absolute top-1 right-1 z-10 h-6 w-6 rounded-full p-0"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage("")}>
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
