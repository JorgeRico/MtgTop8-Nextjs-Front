const host_url  = process.env.NEXT_PUBLIC_API_URL;

const endpoints = {
    API_HOME                  : '/',
    API_HEALTH                : host_url + 'health',

    API_LEAGUE_ALL            : host_url + 'api/leagues/all',
    API_LEAGUE_ID             : host_url + 'api/leagues/{id}',
    API_LEAGUE_ID_AVERAGE     : host_url + 'api/leagues/{id}/average',
    API_LEAGUE_HOME           : host_url + 'api/leagues/home',
    API_LEAGUE_CURRENT        : host_url + 'api/leagues/current',
    API_LEAGUE_PAST           : host_url + 'api/leagues/past',
    API_LEAGUE_TOURNAMENTS    : host_url + 'api/leagues/{id}/tournaments',
    API_LEAGUE_STATS          : host_url + 'api/leagues/{id}/stats/{option}',
    API_LEAGUE_CARD_STATS     : host_url + 'api/leagues/{id}/cards/{cardType}/stats',

    API_TOURNAMENT_ALL        : host_url + 'api/tournaments/all',
    API_TOURNAMENT_DATA       : host_url + 'api/tournaments/{id}',
    API_TOURNAMENT_PLAYERS    : host_url + 'api/tournaments/{id}/players',
    API_TOURNAMENT_STATS      : host_url + 'api/tournaments/{id}/stats/{option}',
    API_TOURNAMENT_CARD_STATS : host_url + 'api/tournaments/{id}/cards/{cardType}/stats',

    API_PLAYERS               : host_url + 'api/players',
    API_DECK                  : host_url + 'api/decks',
    API_DECK_CARDS            : host_url + 'api/decks/{id}/cards',
    API_STATS                 : host_url + 'api/stats',

    HTTP_LEAGUE               : '/leagues/',
    HTTP_TOURNAMENT           : '/tournaments/',
    HTTP_CONTACT              : '/contact',
    HTTP_DECKLIST             : '/decklist'
}

export default endpoints;