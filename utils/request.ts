// 文件目录：service/index.ts

import { UseFetchOptions } from "nuxt/app";
import { useNuxtApp } from "#app";

// HTTP 请求的方法类型
type Methods = "GET" | "POST" | "DELETE" | "PUT";

// URL 基地址
const BASE_URL = "/api/";

// 请求结果数据格式
export interface IResultData<T> {
    code: number;
    data: T;
    msg: string;
}

/**
 * api请求封装，使用useFetch函数或$fetch函数
 * @param { string } url 请求地址
 * @param { string } method 请求方法
 * @param { object } data 请求数据
 * @param { UseFetchOptions } options 请求选项
 */
class HttpRequest {
    request<T = any>(url: string, method: Methods, data: any, options?: UseFetchOptions<T>) {
        return new Promise((resolve, reject) => {
            // 继承UseFetchOptions类型，包含了baseURL和method两个属性
            const newOptions: UseFetchOptions<T> = {
                baseURL: BASE_URL,
                method,
                ...options,
            };
            const token = useCookie('token');
            if (token.value) {
                newOptions.headers = {
                    Authorization: `Bearer ${token.value}`
                };
            }

            // 根据请求方法处理请求的数据
            if (method === "GET" || method === "DELETE") {
                // 将数据设置为newOptions的params属性
                newOptions.params = data;
            }
            if (method === "POST" || method === "PUT") {
                // 将数据设置为newOptions的body属性
                newOptions.body = data;
            }

            const nuxtApp = useNuxtApp();

            // 选择合适的请求方法
            const fetchMethod = (process.client && !nuxtApp.isHydrating) ? nuxtApp.$request : useFetch as any;

            // 发送请求
            fetchMethod(url, newOptions)
                .then((res: any) => {
                    resolve(res.status? res.data.value:res);
                })
                .catch((error: any)  => {
                    let errorMessage = "服务端错误";

                    if (error.response && error.response._data) {
                        let data = error.response._data;
                        if (typeof error.response._data === 'string') {
                            try {
                                data = JSON.parse(error.response._data);
                            } catch (e) {
                                errorMessage = error.response._data;
                            }
                        }
                        if (data.errors) {
                            const errorMessages = [];
                            for (const key in data.errors) {
                                errorMessages.push(`${data.errors[key].join(', ')}`);
                            }
                            errorMessage = errorMessages.join('; ') || errorMessage;
                        } else {
                            errorMessage = data.message || errorMessage;
                        }
                    }
                    if (process.client) {
                        Message.error(errorMessage);
                    }
                    if (error.response &&
                        (error.response._data.code === 40001 || error.response._data.code === 40002 || error.response._data.code === 40003)) {
                        resolve(error.response._data);
                    }
                    reject(error.response?error.response._data:errorMessage);
                });
        });
    }

    // 封装常用方法
    get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
        return this.request(url, "GET", params, options);
    }

    post<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
        return this.request(url, "POST", data, options);
    }

    put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
        return this.request(url, "PUT", data, options);
    }

    delete<T = any>(url: string, params: any, options?: UseFetchOptions<T>) {
        return this.request(url, "DELETE", params, options);
    }
}

// 实例化 HttpRequest 并导出
const httpRequest = new HttpRequest();
export default httpRequest;
