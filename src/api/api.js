//定义api函数

import {$get,$post} from '../utils/request.js'

//定义登陆方法
export let list = async ()=>{
    let data = await $get('/str')
    console.log(data)
    return data
}

//删除
export let del = async (params) =>{
    //发请求
    let {success} = await $post('/delete',params)
    console.log(success)
    // alert(message)
    return success

}