import Link from 'next/link';
// import Button from "@/components/List/Button";
// import { getFormat } from '@/hooks/useCommon';
import { useTranslations } from 'next-intl';
// import Image from "next/image";
import { LeagueItemsType } from "@/types/schemas/database/league";
const assetHomePathPrefix = "/images/home";


const LeagueList = ({ items }: LeagueItemsType) => {
    const t    = useTranslations('league');
    const tags = useTranslations('alt-tags');

    const leagueItemBlock = (item) => {
        return (
            <div className="rounded-xl bg-surface-card p-space-md md:p-space-lg shadow-sm hover:bg-surface-elevated transition-colors flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-arcane-gold shrink-0">
                        <span className="material-symbols-outlined text-[26px]">
                            <img src={`${assetHomePathPrefix}/badge.png`} alt={tags('Cup Champion')} title={tags('Cup Champion')} className="" />
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-label-sm text-label-sm text-mana-black">Sabadell</span>
                            <span className="text-mana-black">•</span>
                            <span className="font-label-sm text-label-sm text-primary">Winner: Jordi M. (Death & Taxes)</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-mana-white mt-0.5">{item.name}</h3>
                        <div className="flex items-center gap-space-md mt-1 font-body-sm text-body-sm text-mana-black">
                            <span>8 Tournaments</span>
                            <span>62 Competitors</span>
                            <span className="text-mana-green">Completed Nov 2025</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-space-sm self-end md:self-center">
                    <Link className="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-mana-white font-label-md text-label-md flex items-center gap-1 transition-colors" href="#">
                        <span className="material-symbols-outlined text-[16px]">
                            <img src={`${assetHomePathPrefix}/list.png`} alt={tags('Cup Champion')} title={tags('Cup Champion')} className="" />
                        </span>
                        <span>Top 8 Decks</span>
                    </Link>
                    <a className="px-4 py-2 rounded-lg bg-primary-container hover:bg-on-primary-container text-white font-label-md text-label-md flex items-center gap-1 shadow-sm transition-colors" href="#">
                        <span>View league</span>
                        <span className="material-symbols-outlined text-[16px]">
                            <img src={`${assetHomePathPrefix}/full_arrow_forward.png`} alt={tags('Cup Champion')} title={tags('Cup Champion')} className="" />
                        </span>
                    </a>
                </div>
            </div>
            
        )
    }

    return (
        <>
            {(items?.length > 0) && (
                items?.map((item, index) => (
                    <div key={index}>
                        {leagueItemBlock(item)}
                    </div>
                ))
            )}
        </>
    )
}
export default LeagueList;