import { useState }from "react";
import { InputFormType } from "@/types/forms";

const InputForm: React.FC<InputFormType> = ({ name, type, placeholder, label, value, toSend, setToSend }) => {

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
        <div className="left mb20 w100">
            <label className="left w100 mb15">{label}</label>
            <input
                className="w-300 pad"
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
            />
        </div>
    );
}

export default InputForm;