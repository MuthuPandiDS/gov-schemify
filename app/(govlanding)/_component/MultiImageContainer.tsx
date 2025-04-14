import React from "react";
import Image from "next/image";

const MultiImageContainer = () => {
  return (
    <div className="w-full h-full grid grid-cols-3 gap-5">
      <div className="relative w-full aspect-square rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <Image
          src="/agriculture-imgs/img1.jpg"
          alt="img1"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="relative w-full aspect-square rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <Image
          src="/agriculture-imgs/img2.jpg"
          alt="img2"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="relative w-full aspect-square rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <Image
          src="/agriculture-imgs/img3.jpg"
          alt="img3"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="relative w-full aspect-square rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <Image
          src="/agriculture-imgs/img4.jpg"
          alt="img4"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div className="relative w-full aspect-square col-span-2 row-span-2 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <Image
          src="/agriculture-imgs/img5.jpg"
          alt="img5"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div className="relative w-full aspect-square rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
        <Image
          src="/agriculture-imgs/img6.jpg"
          alt="img6"
          fill
          className="object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default MultiImageContainer;
