import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/login",
      component:()=>import("../pages/login/login.vue")
    },
    {
      path:"/",
      component:()=>import("../pages/index/index.vue"),
      children:[
        {
          path:"home",//首页
          component:()=>import("../pages/home/home.vue"),
          name:"首页"
        },
        {
          path:"menu",//菜单管理
          component:()=>import("../pages/menu/menu.vue"),
          name:"菜单列表"
        },
        {
          path:"goods",//商品分类
          component:()=>import("../pages/goods/goods.vue"),
          name:"商品分类列表"
        },
        {
          path:"banner",//轮播图管理
          component:()=>import("../pages/banner/banner.vue"),
          name:"轮播图列表"
        },
        {
          path:"manage",//商品管理
          component:()=>import("../pages/manage/manage.vue"),
          name:"商品管理列表"
        },
        {
          path:"members",//会员管理
          component:()=>import("../pages/members/members.vue"),
          name:"会员管理列表"
        },
        {
          path:"role",//角色管理
          component:()=>import("../pages/role/role.vue"),
          name:"角色列表"
        },
        {
          path:"seconds",//秒杀活动
          component:()=>import("../pages/seconds/seconds.vue"),
          name:"秒杀列表"
        },
        {
          path:"spec",//商品规格
          component:()=>import("../pages/spec/spec.vue"),
          name:"商品规格列表"
        },
        {
          path:"strator",//管理员管理
          component:()=>import("../pages/strator/strator.vue"),
          name:"管理员列表"
        },
        {
          path:"",
          redirect:"home"
        },
      ]
    },
  ]
})
