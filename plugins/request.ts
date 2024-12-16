export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();

    const $request = $fetch.create({
        baseURL: config.public.apiUrl,
        /** 请求拦截器 */
        onRequest: ({ options }) => {
            const userAuth = useCookie("token");
            if (userAuth.value) {
                options.headers = options.headers ?? {};
                (options.headers as Record<string, string>).Authorization = `Bearer ${userAuth.value}`;
            }
        },
        /** 请求错误拦截器，比如服务器无法连接会触发 */
        onRequestError({ request, error }) {},
        /** 响应拦截器 */
        onResponse({ response }) {
            // 成功的状态才进行解包
            if (response.status >= 200 && response.status < 300) {
                response._data = response._data ?? null;
            }
        },
        /** 响应错误拦截器 */
        onResponseError(_context) {}
    });

    return {
        provide: {
            request: $request
        }
    };
});
