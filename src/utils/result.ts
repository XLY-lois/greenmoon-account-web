// 定义处理接收信息的模块
class Result{
    message:any = {};
    code:any = "";
    data:any = {};
    sum:any;
    getData(){
        return this.data;
    }
    getCode(){
        return this.code;
    }
    getMessage(){
        return this.message;
    }
    getSum(){
        return this.sum;
    }
    constructor(resp:any){
        this.code = resp.data.code;
        this.message = resp.data.message;
        this.data = resp.data.data;
        this.sum = resp.data.sum? null:resp.data.sum;
    }
}
export default Result;