import ModalPopUp from "@/components/Modal";
import { StatsItemType, StatsCardTotal } from "@/types/schemas/database/stats";

const ContentStatsList: React.FC<StatsItemType> = ({ item, isPlayer, text }) => {
    const playerStats = (item: StatsCardTotal) => {
        return (
            <>
                <span className="left ml30 center w-25 mb5 mt5">{item.num}</span>
                <span className="left ml20 mb5 mt5">
                    {item.name}
                </span>
            </>
        )
    }

    const cardStats = (item: StatsCardTotal) => {
        return (
            <>
                {(item.imgUrl != '' && item.imgUrl != undefined) &&
                    <span className="left ml15">
                        <ModalPopUp img={item.imgUrl} name={item.name} modalType={`stats-${text}`} />
                    </span>
                }
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