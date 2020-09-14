import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    NavBar: {
      active: 0,
      list: []
    }
  },
  mutations: {
    getHeadIndex(state,i){
      // state.NavBar.active = i
      const list = JSON.parse(localStorage.getItem("admin_NavBar"))
      // console.log(list);
      list.active = i
      state.NavBar = list
      localStorage.setItem('admin_NavBar', JSON.stringify(state.NavBar))
    },
    //导航菜单
    getNavList(state, menus) {

      let list = menus.map(item => {
        let submenu = item.child.map(v => {
          return {
            icon: v.icon,
            name: v.name,
            pathname: v.desc
          }
        })
        return {
          desc: item.desc,
          name: item.name,
          subActive: '0',
          submenu: submenu
        }
      })
      console.log(list);

      state.NavBar.list = list
      localStorage.setItem('admin_NavBar', JSON.stringify(state.NavBar))
    }

  },
  actions: {},
  modules: {}
});
