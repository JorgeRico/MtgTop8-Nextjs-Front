type MyComponentProps = {
    name         : string;
    placeholder  : string;
    label        : string;
    value        : string;
    handleChange : PropTypes.func;
}

const TextareaForm: React.FC<MyComponentProps> = ({ name, placeholder, label, value, handleChange }) => {
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