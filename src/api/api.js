//定义api函数

import {$get,$post} from '../utils/request.js'

//定义登陆方法
export let fromApi = async ()=>{
    let data = await $get('/str')
    console.log(data)
    return data
}

//删除
export let toApi = async (params) =>{
    //发请求
    let {success} = await $post('/toapi',params)
    console.log(params)
    console.log('toApi'+success)
    // alert(message)
    return success

}