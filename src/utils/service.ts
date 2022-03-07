import axios from 'axios';
import Result from "./result";
import { Message } from "element-ui";

class service {

    // 执行post请求
    doPost(url: any, params: any): Promise<any> {
        return new Promise((resolve, reject) => {
            axios.post(url, params).then(resp => {
                const result = new Result(resp);
                if (result.getCode() != 200) {
                    resolve(null);
                    Message({
                        message: `发生错误，错误代码为${result.getCode()}`,
                        type: "error",
                    });
                }
                resolve(result);
            }).catch(err => {
                console.log("发生错误。")
            })
        })

    }
    // 执行get请求
    doGet(url: any, params: any) {
        return new Promise((resolve, reject) => {
            axios.get(url).then(resp => {
                resolve(new Result(resp));
            })
        })
    }
}

// 实例化方法
function create() {
    const controller = new service();
    return controller;
}
// 抛出实例化方法
export default create;