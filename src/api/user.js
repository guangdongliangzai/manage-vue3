import http from '@/utils/http/http.js'
import { Session } from "@/tool/storage";


//登录系统
export async function login(data) {
    let res = await http.post("/user/login", data);
    Session.set("access_token", res.data.token || {});
    return res || {};
}

export async function isget(data) {
    let res = await http.get("/user/login", data);
    return res || {};
}

