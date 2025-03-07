import React from "react";
interface NavTextProps {
    text: string;
}
const NavText = ({ text }: NavTextProps) => {
    return <div className="text-sm font-semibold">{text}</div>;
};

export default NavText;
