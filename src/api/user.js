import http from '@/utils/http/http.js'



//登录系统
export async function login(data) {
    let res = await http.post("/user/login", data);
    setSession("access_token", res.data.token || {});
    return res || {};
}

export async function isget(data) {
    let res = await http.get("/user/login", data);
    return res || {};
}

