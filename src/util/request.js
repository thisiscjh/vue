import axios from "axios"
import qs from "qs"


//响应拦截
axios.interceptors.response.use(res=>{
    console.group("本次路径"+res.config.url)
    console.log(res);
    console.groupEnd()
    return res;
})

const baseUrl="/api"

//菜单添加
export const  reqMenuAdd=(params)=>{
    return axios({
        url:baseUrl+"/api/menuadd",
        method:"post",
        data:qs.stringify(params)
    })
}
//菜单列表
export const reqMenuList=(params)=>{
  return  axios({
      url:baseUrl+"/api/menulist",
      method:"get",
      params:params
  })
}
//菜单每一条数据
export const reqMenuDetail =params=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"get",
        params:params
    })
}
//菜单编辑
export const reqMenuUpdate=(params)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(params)
    })
}
//菜单删除
export const reqMenuDelete=params=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify(params)
    })
}
//------------------------
// role 角色管理
export const reqRoleAdd = params=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(params)
    })
}

export const reqRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get",
       
    })
}
export const reqRoleDetail=params=>{
 return axios({
     url:baseUrl+"/api/roleinfo",
     method:"get",
     params
 })
}

export const reqRoleUpdate=params=>{
    return axios({
        url:baseUrl+"/api/roleedit",
        method:"post",
        data:qs.stringify(params)
    })
}
export const reqRoleDelete=params=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:qs.stringify(params)
    })
}
//管理员

//添加
export const reqStratorAdd=parmas=>{
    return axios({
        url:baseUrl+"/api/useradd",
        method:"post",
        data:qs.stringify(parmas)
    })
}

//总数
export const reqStratorNum=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get",   
    })
}
//分页
export const reqStratorList=parmas=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        parmas:parmas
    })
}
//获取一条数据
export const reqStratorDetail=parmas=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        parmas
    })
}
//修改
export const reqStratorUpdate=parmas=>{
    return axios({
        url:baseUrl+"/api/useredit",
        method:"post",
        data:qs.stringify(parmas)
    })
}
export const reqStratorDelete=parmas=>{
    return axios({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify(parmas)
    })
}
