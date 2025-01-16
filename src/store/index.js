import Vue from "vue";
import Vuex from 'vuex'

import {user, permission} from './modules'

const modules = {
    user,
    permission
}


Vue.use(Vuex)

export default new Vuex.Store({
    modules
})