import { useState } from "react";

export const useFilter = () => {
    const [filterText, setFilterText] = useState("");

    const handleFilterChange = (value: string) => {
        setFilterText(value);
    };
    return { filterText, handleFilterChange };
};
export const getInitialsOrLogo = (name: string) => {
    if (!name) return "";

    const words = name.trim().split(" ").filter(Boolean);

    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    } else {
        return name.slice(0, 2).toUpperCase();
    }
};
export const getInitialsLogo = (name: string, logo: string | null) => {
    if (logo) {
        console.log("logo", logo)
        const initial = `https://be.myweightlosscentre.co.uk/${logo}`
        return  initial
    }
    else {
        if (!name) return "";

        const words = name.trim().split(" ").filter(Boolean);

        if (words.length >= 2) {
            return (words[0][0] + words[1][0]).toUpperCase();
        } else {
            return name.slice(0, 2).toUpperCase();
        }
    }

};
