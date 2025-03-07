import React from "react";
import "react-country-phone-input/lib/style.css"; // Import styles
import PhoneInput from "react-country-phone-input";

interface DynamicPhoneInputProps {
    placeholder?: string;
    value?: string; // This library returns an object with country code & phone
    onChange(value?: string): void;
    className?: string;
    id?: string;
    name?: string;
    disabled?: boolean; // Optional disabled prop
}

const DynamicPhoneInput: React.FC<DynamicPhoneInputProps> = ({
    placeholder = "",
    value,
    onChange,
    disabled = false,
}) => {
    return (
        <PhoneInput
            value={value} // Pass only the phone number as a string
            onChange={onChange} // Update the object correctly
            placeholder={placeholder}
            disabled={disabled}
            
        />
    );
};

export default DynamicPhoneInput;
