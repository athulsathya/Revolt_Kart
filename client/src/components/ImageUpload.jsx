import React from "react";
import { Trash2, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";

function ImageUpload({ productData, setProductData }) {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    console.log("Selected Files:", files);

    setProductData((prev) => ({
      ...prev,
      productImg: [...(prev?.productImg || []), ...files],
    }));

    // Allow selecting the same file again
    e.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    setProductData((prev) => ({
      ...prev,
      productImg:
        prev?.productImg?.filter(
          (_, index) => index !== indexToRemove
        ) || [],
    }));
  };

  const clearAllImages = () => {
    setProductData((prev) => ({
      ...prev,
      productImg: [],
    }));
  };

  return (
    <div className="space-y-4">
      <Label className="font-medium text-slate-700">
        Product Images
      </Label>

      <Input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFiles}
      />

      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-pink-300 rounded-xl bg-pink-50 hover:bg-pink-100 cursor-pointer transition"
      >
        <Upload size={32} className="text-pink-600 mb-2" />

        <span className="font-medium text-slate-700">
          Click to Upload Images
        </span>

        <span className="text-sm text-slate-500">
          PNG, JPG, JPEG (Multiple allowed)
        </span>
      </label>

      {productData?.productImg?.length > 0 && (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm text-green-600 font-medium">
              {productData.productImg.length} image(s) selected
            </p>

            <Button
              type="button"
              variant="outline"
              onClick={clearAllImages}
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {productData.productImg.map((file, idx) => {
              let preview = "";

              if (file instanceof File) {
                preview = URL.createObjectURL(file);
              } else if (typeof file === "string") {
                preview = file;
              } else if (file?.url) {
                preview = file.url;
              } else {
                return null;
              }

              return (
                <Card
                  key={idx}
                  className="overflow-hidden border shadow-sm relative group"
                >
                  <CardContent className="p-0">
                    <img
                      src={preview}
                      alt={`preview-${idx}`}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div className="p-2 text-xs text-center text-slate-500 truncate">
                      {file instanceof File
                        ? file.name
                        : `Image ${idx + 1}`}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageUpload;