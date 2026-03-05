type MyComponentProps = {
    name         : string;
    placeholder  : string;
    label        : string;
    value        : string;
    handleChange : Props.func;
}

const InputForm: React.FC<MyComponentProps> = ({ name, placeholder, label, value, handleChange }) => {
    return (
        <div className="left mb20 w-350">
            <label className="left w100 mb15">{label}</label>
            <input
                className="left pad w80"
                type='text'
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