import { useState }from "react";
import { InputFormType } from "@/types/schemas/website/forms";

const InputForm: React.FC<InputFormType> = ({ name, type, placeholder, label, value, handleChange }) => {

    return (
        <div className="left mb20 inputform">
            <label className="left mb15">
                <span className="left w100 mb20">{label}</span>
                <input
                    className   = "left pad"
                    type        = {type}
                    name        = {name}
                    placeholder = {placeholder}
                    value       = {value}
                    onChange    = {handleChange}
                    required
                />
            </label>
        </div>
    );
}

export default InputForm;