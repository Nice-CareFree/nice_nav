export type Options = {
    key?: string,
    body?: object,
    lazy?: boolean,
    baseURL?: string,
    server?: boolean,
    initialCache?: boolean,
    headers?: { [key: string]: string },
    method?: 'GET' | 'HEAD' | 'PATCH' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE'
}
export const useGetFetchOptions = (options: Options) => {
    options.baseURL = options.baseURL ?? ''
    options.initialCache = options.initialCache ?? false
    options.lazy = options.lazy ?? true
    options.server = options.server ?? true
    const token = useCookie('token')
    if (token.value) {
        options.headers = {
            token: token.value
        }
    }
    return options
}
