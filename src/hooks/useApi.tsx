import axios, { AxiosResponse } from 'axios';

 // axios
const headers = {
    'Content-Type'                 : 'application/json',
    'Access-Control-Allow-Origin'  : '*',
    'Access-Control-Allow-Headers' : 'Content-Type',
    'Access-Control-Allow-Methods' : '*',
}

export function getAxiosEndpoint<T = any>(endpoint: string): Promise<AxiosResponse<T>> {
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

export function replaceUrlIdParam (endpoint: string, value: string): string {
    return endpoint.replace('{id}', value)
}