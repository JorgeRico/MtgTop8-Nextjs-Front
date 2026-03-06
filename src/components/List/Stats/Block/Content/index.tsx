import ModalPopUp from "@/components/Modal";

type MyComponentProps = {
    item     : PropTypes.object,
    isPlayer : boolean,
    text     : string
}

const ContentStatsList: React.FC<MyComponentProps> = ({ item, isPlayer, text }) => {
    const playerStats = (item) => {
        return (
            <>
                <span className="left ml30 center w-25 mb5 mt5">{item.num}</span>
                <span className="left ml20 mb5 mt5">
                    {item.name}
                </span>
            </>
        )
    }

    const cardStats = (item) => {
        return (
            <>
                <span className="left ml15">
                    <ModalPopUp img={item.imgUrl} name={item.name} modalType={`stats-${text}-`} />
                </span>
                <span className="left ml10 w-30 center mt3">{item.num}</span>
                <span className="left ml20 mt3">
                    {item.name}
                </span>
            </>
        )
    }

    return (
        <div className="left w100 cardItem">
            {(isPlayer === true) ? (
                playerStats(item)
            ) : (
                cardStats(item)
            )}
        </div>
    )
}

export default ContentStatsList;