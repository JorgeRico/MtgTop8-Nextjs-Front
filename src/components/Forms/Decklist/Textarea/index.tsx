type MyComponentProps = {
    name        : string;
    placeholder : string;
    label       : string;
    value       : string;
    toSend      : any;
    setToSend   : any;
}

const TextareaForm: React.FC<MyComponentProps> = ({ name, placeholder, label, value, toSend, setToSend }) => {
    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
        <label className="left w100 mb15">
            <span className="left mb20">{label}</span>
            <textarea
                className="left w80 mb20"
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                required
            />
        </label>
    );
}

export default TextareaForm;