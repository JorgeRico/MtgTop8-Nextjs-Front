"use client";

import { useTranslations } from 'next-intl';
import Stats from "@/app/_home/stats";
import CurrentEvents from "@/app/_home/events/current";
import PastEvents from "@/app/_home/events/past";
import SocialCards from "@/components/Social/Home/SocialCards";

const HomeComponent = () => {
    const t = useTranslations('home');

    return (
        <main>
            <Stats></Stats>
            <CurrentEvents title={t('Current Leagues')}></CurrentEvents>
            <PastEvents title={t('Past Leagues')}></PastEvents>
            <SocialCards></SocialCards>
        </main>
    );
}

export default HomeComponent;