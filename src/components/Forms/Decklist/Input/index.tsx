import { useState }from "react";

type MyComponentProps = {
    name        : string;
    type        : string;
    placeholder : string;
    label       : string;
    value       : string;
    toSend      : any;
    setToSend   : any;
}

const InputForm: React.FC<MyComponentProps> = ({ name, type, placeholder, label, value, toSend, setToSend }) => {

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