import instance from "./axios"

/**
 * 向指定URL发送POST请求
 *
 * @param url 请求的URL
 * @param data 请求的数据
 * @param sign 签名信息，默认为空对象
 * @returns 返回一个Promise对象，resolve时返回请求结果，reject时返回错误信息
 */
const post = (url, data, sign = {}) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
const get = (url, data, sign = {}) => {
    return new Promise((resolve, reject) => {
        instance.get(url, { params: data }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
const put = (url, data, sign = {}) => {
    return new Promise((resolve, reject) => {
        instance.put(url, data).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

const del = (url, data, sign = {}) => {
    return new Promise((resolve, reject) => {
        instance.delete(url, { params: data }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export default {
    post, get, put, del
}