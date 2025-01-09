import axios from "./axiosConfig"

// 请求方式的封装

const http = {
    // get请求
    get: (url, params) => axios.get(url, {params}),

    // post请求
    post: (url, params) => axios.post(url, params),

    // put请求
    put: (url, data) => axios.put(url, data),

    patch: (url, data) => axios.patch(url, data),

    // 删除请求
    delete: (url, params) => axios.delete(url, params),

    // 上传请求
    upload: (url, file) => axios.post(url, file, {
            headers: {'Content-Type': 'multipart/form-data'}
        }
    )
}

export default http;
