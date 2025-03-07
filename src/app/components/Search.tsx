import { Input } from 'antd';
import React from 'react';
import { IoIosSearch } from "react-icons/io";

interface SearchProps {
    placeholder?: string;
    className?: string;
    // icon?: string;
}
const Search = ({ placeholder, className }: SearchProps) => {
    return (
        <Input className={className} prefix={<IoIosSearch />} placeholder={placeholder} />
    )
}

export default Search
