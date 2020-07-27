import  Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import {state,getters,mutations} from "./mutations"
import actions from "./actions"
import menu from "./modules/menu"
import role from "./modules/role"
import strator from "./modules/strator"
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        menu,
        role,
        strator

    }
})