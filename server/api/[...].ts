// @ts-ignore
import {joinURL} from "ufo";
// @ts-ignore
import {proxyRequest} from "h3";

export default defineEventHandler(async (event:any) =>{
    const proxyUrl = useRuntimeConfig().normal_url
    const path = event.path.replace(/^\/api\//,'')
    const target = joinURL(proxyUrl,path)
    return proxyRequest(event,target)
})
