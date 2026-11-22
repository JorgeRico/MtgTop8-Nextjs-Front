'use client';

import DecklistDetail from '@/components/Decklist/Detail';
import TournamentDetail from '@/components/Tournament/Detail';
import {TournamentType} from '@/types/schemas/database/tournament';

interface TournamentComponentProps {
  id: string;
  initialTournament: TournamentType;
}

const TournamentComponent = ({
  id,
  initialTournament
}: TournamentComponentProps) => (
  <>
    <TournamentDetail id={id} initialTournament={initialTournament} />
    <DecklistDetail />
  </>
);

export default TournamentComponent;
