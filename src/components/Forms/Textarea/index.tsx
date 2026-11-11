import { TextareaFormType } from "@/types/schemas/website/forms";

const TextareaForm = ({ name, placeholder, label, value, handleChange }: TextareaFormType) => {
    return (
        <label className="left w90 mb15">
            <span className="left w100 mb20">{label}</span>
            <textarea
                className   = "left mb20"
                name        = {name}
                placeholder = {placeholder}
                value       = {value}
                onChange    = {handleChange}
                required
            />
        </label>
    );
}

export default TextareaForm;