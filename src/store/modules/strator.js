import {reqStratorList,reqStratorNum} from "../../util/request"
const state = {
    //列表数据
    list: [],
    //一页数量
    size:2,
    //数据总数量
    total:0,
    //当前的页码
    page:1
}
const mutations = {
    changeList(state, arr) {
        state.list = arr
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state, page) {
        state.page = page
    }
}
const actions = {
    reqList(context) {
        const params={
            page:context.state.page,
            size:context.state.size
        }
        reqStratorList(params).then(res => {
            context.commit("changeList", res.data.list)
        })
    },
    reqTotal(context) {
        reqStratorNum().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    changePage(context,page){
        context.commit("changePage",page)
    }
    
}
const getters = {
        list(state) {
            return state.list
        },
        total(state){
            return state.total
        },
        size(state){
            return state.total
        }
    }


export default{
        state,
        mutations,
        getters,
        actions,
        namespaced: true
    }