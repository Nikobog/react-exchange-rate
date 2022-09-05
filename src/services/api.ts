async function request<TResponse> (
    url: string,
    config?: RequestInit
): Promise<TResponse> {
    const response = await fetch( url, config );
    return await response.json();
}

export const api = {
    get: <TResponse>( url: string ) => request<TResponse>( url ),
};