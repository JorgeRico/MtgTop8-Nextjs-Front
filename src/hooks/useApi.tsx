import axios from 'axios';

 // axios
const headers = {
    'Content-Type'                 : 'application/json',
    'Access-Control-Allow-Origin'  : '*',
    'Access-Control-Allow-Headers' : 'Content-Type',
    'Access-Control-Allow-Methods' : 'GET',
}

export function getAxiosEndpoint (endpoint: string): PropTypes.any {
    return axios.get(
        endpoint,
        { headers: headers }
    );
}

export function addUrlPaginationParams (endpoint: string, numItems: number, currentPage: number): string {
    const url        = new URL(endpoint);
    const pagination = url.searchParams;

    pagination.set('limit', numItems);
    pagination.set('page', currentPage);

    return url.toString();
}

export function replaceUrlIdParam (endpoint: string, value: string): string {
    return endpoint.replace('{id}', value)
}