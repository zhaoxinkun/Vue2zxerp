// 这里是关于axios的封装处理，不涉及api

// 导入原本的axios
import axios from "axios";

// 导入element-ui的消息提示框
import {Message} from "element-ui";

// 登录的时候,带上token
import {getToken} from "@/utils/token";

// 设置基本地址
// axios.defaults.baseURL = "http://124.223.161.17:5058/api/";
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

// 书写公共配置
// 请求拦截器
axios.interceptors.request.use(config => {
    // 请求的时候都带上token
    config.headers["token"] = getToken();
    return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
    // 获取响应码和消息
    let {code, msg} = res.data;
    // 响应判断
    if (code !== 20000) {
        Message({
            // 弹出的信息
            message: msg || "请求失败",
            // 类型
            type: "warning",
            // 持续时间
            duration: 2000
        })
    }
    // else if (code === 20000) {
    //     Message({
    //         message: msg || "请求成功",
    //         type: "success",
    //         duration: 2000
    //     })
    // }
    // 直接返回数据
    return res
}, error => {
    return error
})

export default axios
