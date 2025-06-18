import http from '@/utils/http/http.js'


const api_get = {
  indexlist: '/index/list',
  queryquery: '/index/query',
}

const api_post = {
  indexedit: '/index/edit',
  queryadd: '/index/add',
}

let get_FN = []
for (let key in api_get) {
  get_FN[key] = async function (params) {
    return await http.get(api_get[key], params);
  }
}
let post_FN = []
for (let key in api_post) {
  post_FN[key] = async function (data) {
    return await http.post(api_post[key], data);
  }
}
export default {
  ...get_FN,
  ...post_FN
}
