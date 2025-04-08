import { Input } from 'antd';
import React from 'react';
import { IoIosSearch } from "react-icons/io";


interface FilterComponentProps {
    filterText: string;
    onFilter: (filterText: string) => void;
    placeholder: string;
}
const Search = ({ filterText, onFilter,placeholder }: FilterComponentProps) => {
    return (
        <Input
            prefix={<IoIosSearch  />}
            className="rounded-xl"
            // style={{
            //   borderRadius: "20px",
            //   height: "fit-content",
            //   width: "auto",
            //   // marginBottom: "20px",
            // }}
            placeholder={placeholder}
            value={filterText}
            onChange={(e) => onFilter(e.target.value)} // Update filterText state
        />
    )
}

export default Search
