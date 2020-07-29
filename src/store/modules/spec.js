import { reqSpecList, reqSpecNum } from "../../util/request"

const state = {
    list: [],
    size: 2,
    total: 0,
    page: 1,

}
//修改
const mutations = {
    changeList(state, arr) {
        arr.forEach(i => {
            i.attrs = JSON.parse(i.attrs)
        })
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
    reqList(context, bool) {
        var params = {}
        if (bool) {
            params = {}
        } else {
            params = {
                page: context.state.page,
                size: context.state.size
            }
        }

        reqSpecList(params).then(res => {
            if (res.data.list.length == 0 && context.page > 1) {
                context.commit("changePage", context.state.page - 1)
                context.dispatch("reqList")
                return;
            }
            context.commit("changeList", res.data.list)
        })
    },
    //获取总的数
    reqTotal(context) {
        reqSpecNum().then(res => {
            context.commit("changeTotal", res.data.list[0].total)
        })
    },
    //页码
    changePage(context, page) {
        context.commit("changePage", page)
    }
}

const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state) {
        return state.size
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}