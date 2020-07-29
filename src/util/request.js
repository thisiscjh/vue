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

//管理员添加
export const reqManageAdd = params => axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(params)
})
//管理员总数
export const reqManageCount = () => axios({
    url: baseUrl + "/api/usercount",
    method: "get",
})

//管理员列表
export const reqManageList = (params) => axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params
})

//管理员获取一条
export const reqManageDetail = (params) => axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params
})

//管理员修改
export const reqManageUpdate = (params) => axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(params)
})

//管理员删除
export const reqManageDelete = params => axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify(params)
})

//商品分类
export const reqGoodsAdd=params=>{
    let formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:formData
    })
}
//商品列表
 export const reqGoodsList=params=>{
     return axios({
         url:baseUrl+"/api/catelist",
         method:"get",
         params
     })
 }
 //商品分类获取一条
 export  const reqGoodsDetail=params=>{
     return axios({
         url:baseUrl+"/api/cateinfo",
         method:"get",
         params
     })
 }
 //商品修改
 export const reqGoodsUptate=params=>{
     let formData=new FormData()
     for(let i in params){
         formData.append(i,params[i])
     }
     return axios({
         url:baseUrl+"/api/cateedit",
         method:"post",
         data:formData
     })
 }
 //商品删除
 export const reqGoodsDelete=params=>{
     return axios({
         url:baseUrl+"/api/catedelete",
         method:"post",
         data:qs.stringify(params)
     })
 }
 //商品规格


 //商品规格添加
 export const reqSpecAdd=params=>{
     return axios({
         url:baseUrl+"/api/specsadd",
         method:"post",
         data:qs.stringify(params)
     })

 }
 //商品总数
 export const reqSpecNum=()=>{
     return axios({
         url:baseUrl+"/api/specscount",
         method:'get'
     })
 }
 //商品规格列表
 export const reqSpecList=params=>{
     return axios({
         url:baseUrl+"/api/specslist",
         method:"get",
         params
     })
 }

 //商品规格获取一条
 export const reqSpecDetail=params=>{
     return axios({
         url:baseUrl+"/api/specsinfo",
         method:"get",
         params
     })
 }
 //商品规格修改
 export const reqSpecUpdate=params=>{
     return axios({
         url:baseUrl+"/api/specsedit",
         method:"post",
         data:qs.stringify(params)
     })
 }
 //商品规格删除
 export const reqSpecDelete=params=>{
     return axios({
         url:baseUrl+"/api/specsdelete",
         method:"post",
         data:qs.stringify(params)
     })
 }
//商品管理


//商品添加
export const reqManAdd = (params) => {
    let formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsadd",
        method: "post",
        data: formData
    })
}

//商品总数
export const reqManNum=()=>{
    return axios({
        url:baseUrl+"/api/goodscount",
        method:"get"
    })
}
//商品列表
export const reqManList = (params) => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: params
    })
}

//商品某一个条数据
export const reqManDetail = params => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params
    })
}
//商品修改
export const reqManUpdate = params => {
    let formData=new FormData()
    for(let i in params){
        formData.append(i,params[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: formData
    })
}

//商品删除
export const reqManDelete = params => {
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data: qs.stringify(params)
    })
}

export const reqLogin=params=>{
    return axios({
        url:baseUrl+"/api/userlogin",
        method:"post",
        data:qs.stringify(params)
    })
}