interface QueryParams {
    [key: string]: string | number | boolean;
}

export const qs = (obj: QueryParams): string => {
    return Object.keys(obj)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
};