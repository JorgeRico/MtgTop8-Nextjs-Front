import {useTranslations} from 'next-intl';
import ListImage from '@/components/Icons/List';
import {getFormat} from '@/hooks/useCommon';
import {TournamentBluredType} from '@/types/schemas/database/tournament';

const TournamentBlock = ({tournament, isBlured}: TournamentBluredType) => {
  const t = useTranslations('tournaments');

  return (
    <main>
      <section
        className={`left w100 mt40 pb0 ${isBlured ? 'blink blured' : ''}`}
      >
        <h1 className="left f24 mb5">{tournament.name}</h1>
        <article className="left w100">
          <div className="left">{getFormat(tournament.format)}</div>
          <div className="left ml10"> | </div>
          <div className="left ml10">
            {tournament.players} {t('title.players')}
          </div>
          <div className="left ml10"> | </div>
          <div className="left ml10">{tournament.date}</div>
        </article>
      </section>

      <section
        className={`left w100 mt30 mb10 ${isBlured ? 'blink blured' : ''}`}
      >
        <h2 className="left mb15 f20">
          <ListImage />
          <span className="left ml10 mt3">{`${t('players.Top Players')} ${tournament?.name ? '- ' + tournament.name : ''}`}</span>
        </h2>
      </section>
    </main>
  );
};

export default TournamentBlock;
