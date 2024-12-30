// 获取员工人员列表数据

// 发送请求
import {employee} from "@/api/api";

// 用来存储数据
let EmployeeData = null

// 我们要做的是:
// 1.发送请求
// 2.把拿到的数据返回出去


// 暴露一个函数
export const getEmployeeData = async () => {
    // 等待发送请求,拿到数据
    EmployeeData = await employee()
        .then(response => {
            // 成功了
            let {code, data} = response.data;
            if (code === 20000) {
                return data;  //返回数据
            } else {
                console.log("未知错误") // 或者抛出错误
            }
        })
        .catch(error => {
            console.log("error", error)
            return null // 或者抛出错误
        })
    // 返回出数据
    return EmployeeData // 返回已经创建的 Promise
}
