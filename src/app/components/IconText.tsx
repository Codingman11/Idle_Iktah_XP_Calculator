import React from "react";
import Image from "next/image";

interface IconTextProps {
    iconSrc: string;
    text: string;
    onClick: () => void;
}

export const IconText: React.FC<IconTextProps> = ({ iconSrc, text, onClick }) => {  
    return (
        <div className="flex gap-[2%] flex-wrap">
            <button
                onClick={onClick}
                className="flex flex-col items-center"
            >
                <Image src={iconSrc} alt="icon" width={32} height={32} />
                <span className="text-lg ">{text}</span>
            </button>
        </div>
    )
}