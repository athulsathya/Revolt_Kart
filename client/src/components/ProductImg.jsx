import React, { useState } from "react";

function ProductImg({ images = [] }) {
  const [mainImg, setMainImg] = useState(images?.[0]?.url || "");

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt=""
            onClick={() => setMainImg(img.url)}
            className="w-20 h-20 object-cover border rounded cursor-pointer"
          />
        ))}
      </div>

      <div className="flex-1">
        <img
          src={mainImg}
          alt=""
          className="w-full max-w-lg h-auto object-cover border rounded"
        />
      </div>
    </div>
  );
}

export default ProductImg;