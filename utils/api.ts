import httpRequest from "~/utils/request";

export const index_portal = () => {
    return httpRequest.post('/index/index_portal')
}

export const index_portal_content = (params:any) => {
    return httpRequest.post('/index/index_portal_content', params)
}

export const child_cate = () => {
    return httpRequest.post('/index/child_cate')
}

export const category_content = (params:any) => {
    return httpRequest.post('/index/category_content', params)
}

export const get_web_detail = (params:any) => {
    return httpRequest.post('/index/get_web_detail', params)
}

export const get_web_searchKey = () => {
    return httpRequest.post('/index/get_search_key')
}

export const get_web_search = (params:any) => {
    return httpRequest.post('/index/get_search', params)
}

export const get_all_category = () => {
    return httpRequest.post('/index/get_all_category')
}

//登录
export const login = (params:any) => {
    return httpRequest.post('/users/login', params)
}

//注册
export const register = (params:any) => {
    return httpRequest.post('/users/register', params)
}

//获取用户信息
export const get_user_info = () => {
    return httpRequest.post('/users/info')
}

//get_user_star
export const get_user_star = (params:any) => {
    return httpRequest.post('/users/star', params)
}

//update
export const update_user_info = (params:any) => {
    return httpRequest.post('/users/update', params)
}

//send_email
export const send_email = (params:any) => {
    return httpRequest.post('/users/send_email', params)
}

//register
export const register_email = (params:any) => {
    return httpRequest.post('/users/register_email', params)
}

// captcha
export const captcha = () => {
    return httpRequest.post('/users/captcha')
}

// send_email_verify
export const send_email_verify = (params:any) => {
    return httpRequest.post('/users/send_email_verify', params)
}

//change_email
export const change_email = (params:any) => {
    return httpRequest.post('/users/change_email', params)
}

//myStar
export const my_star = (params:any) => {
    return httpRequest.post('/users/my_star', params)
}

//cancelStar
export const cancel_star = (params:any) => {
    return httpRequest.post('/users/cancel_star', params)
}

//addStar
export const add_star = (params:any) => {
    return httpRequest.post('/users/add_star', params)
}

//check_web
export const check_web = (params:any) => {
    return httpRequest.post('/index/check_web', params)
}

//change_password
export const change_password = (params:any) => {
    return httpRequest.post('/users/change_password', params)
}

//reset_password
export const reset_password = (params:any) => {
    return httpRequest.post('/users/reset_password', params)
}

//get_config
export const get_config = () => {
    return httpRequest.post('/index/get_config')
}