type MyComponentProps = {
    buttonText : string;
    id         : string;
}

const Button: React.FC<MyComponentProps> = ({ buttonText, id }) => {
    return (
        <button id={id} className="listButton right bg-red border-grey radius5 color-white f14 pointer">
            {buttonText}
        </button>
    )
}

export default Button;