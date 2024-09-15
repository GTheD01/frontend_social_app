import { useState } from "react";

import { AttachmentProps } from "../../types/types";

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function Carousel({
  attachments,
}: {
  attachments: AttachmentProps[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImageHandler = () => {
    setCurrentImageIndex((prev) =>
      prev === attachments.length - 1 ? 0 : prev + 1
    );
  };

  const previousImageHandler = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? attachments.length - 1 : prev - 1
    );
  };

  return (
    <div className={`relative overflow-hidden w-full aspect-square`}>
      {attachments.length - 1 > currentImageIndex && (
        <span
          onClick={nextImageHandler}
          className="absolute right-0 top-1/2 mx-auto my-0 transform -translate-y-1/2 text-5xl z-10 cursor-pointer text-sky-500"
        >
          <MdKeyboardArrowRight />
        </span>
      )}
      {currentImageIndex > 0 && (
        <span
          onClick={previousImageHandler}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-5xl z-10 cursor-pointer text-sky-500"
        >
          <MdKeyboardArrowLeft />
        </span>
      )}
      {attachments.map((image, index) => (
        <div
          key={image.id}
          className={`absolute top-0 w-full h-full flex items-center justify-center transition`}
          style={{
            transform: `translateX(${100 * (index - currentImageIndex)}%)`,
          }}
        >
          <img
            src={image.get_image}
            alt="post-image"
            className={`w-full h-full object-contain`}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
