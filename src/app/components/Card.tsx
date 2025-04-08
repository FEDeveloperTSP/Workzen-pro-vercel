import React from "react";
import { IconType } from "react-icons";
import Image, { StaticImageData } from "next/image"; // Import StaticImageData

interface CardProps {
    title: string;
    count: number | string;
    Icon?: IconType; // For react-icons
    imageSrc?: StaticImageData | string; // Accepts both local images and URLs
}

const Card = ({ title, count, Icon, imageSrc }: CardProps) => {
    return (
        <div className="w-full h-20 bg-white rounded-2xl shadow-md px-6 py-4 flex flex-row justify-left gap-4 shadow-orange ">
            <div className="bg-[#4FD1C5] rounded-xl p-2  flex justify-center items-center h-10 w-10">
                {Icon ? (
                    <Icon size={24} color="white" />
                ) : imageSrc ? (
                    <Image src={imageSrc} alt={title} />
                ) : null}
            </div>
            <div>
                <h3 className="text-[#A0AEC0] text-sm font-semibold">{title}</h3>
                <h2 className="font-bold text-xl">{count ? count : 0}</h2>
            </div>
           
        </div>
    );
};

export default Card;
