type MyComponentProps = {
    items : PropTypes.array;
    text  : string;
}

const CardTypeList: React.FC<MyComponentProps> = ({ items, text }) => {
    return (
        <>
            {(items.length > 0) && (
                <div className="deckItems mb10">
                    <h4>{text}</h4>
                    {items}
                </div>
            )}
        </>
    )
}

export default CardTypeList;