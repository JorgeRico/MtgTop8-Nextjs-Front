import axios from 'axios';

 // axios
const headers = {
    'Content-Type'                 : 'application/json',
    'Access-Control-Allow-Origin'  : '*',
    'Access-Control-Allow-Headers' : 'Content-Type',
    'Access-Control-Allow-Methods' : 'GET',
}

export function getAxiosEndpoint (endpoint: string): any {
    return axios.get(
        endpoint,
        { headers: headers }
    );
}

export function addUrlPaginationParams (endpoint: string, numItems: number, currentPage: number): string {
    const url        = new URL(endpoint);
    const pagination = url.searchParams;

    pagination.set('limit', numItems.toString());
    pagination.set('page', currentPage.toString());

    return url.toString();
}

export function replaceUrlIdParam (endpoint: string, value: any): string {
    return endpoint.replace('{id}', value)
}