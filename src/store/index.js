import  Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {state,getters,mutations} from "./mutations"
import actions from "./actions"
import menu from "./modules/menu"
import role from "./modules/role"
import strator from "./modules/strator"
import goods from "./modules/goods"
import spec from "./modules/spec"
import manage from "./modules/manage"
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        strator,
        goods,
        spec,
        manage

    }
})