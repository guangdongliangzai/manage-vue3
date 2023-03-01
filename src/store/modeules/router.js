/**
 * 路由管理
 */
import { Session } from "@/tool/storage";
export default {
  namespace: 'true',
  state() {
    return {
      routerTabs: [],
      nowTabs: {
        title: "",
        path: "",
        params: "",
        query: "",
        authNode: []//页面权限
      },
    }
  },
  mutations: {
    //保存Tabs
    saveTabs(state, Tab) {
      const { path } = Tab;
      const index = state.routerTabs.findIndex((x) => x.path == path)
      if (index < 0) {
        state.routerTabs.push(Tab);

      }
      // console.log("state.routerTabs", state.routerTabs)
    },
    //选择路由
    selectTabs(state, nowTabs) {
      state.nowTabs = nowTabs;
    },
    //删除路由
    delTabs(state, Tab) {
      const { path } = Tab;
      const index = state.routerTabs.findIndex((x) => x.path == path)
      if (index > -1) {
        state.routerTabs.splice(index, 1)
      }
    },
    //清理路由
    clearTabs(state, item) {
      state.routerTabs = []
      state.routerTabs.push(item);
    }
  },
  actions: {
    saveTabs(context, Tab) {
      context.commit("saveTabs", Tab);
    },
    delTabs(context, Tab) {
      context.commit("delTabs", Tab);
    },
    updateNowTabs(context, nowTabs) {
      // console.log("跳转路由", nowTabs)
      context.commit("selectTabs", nowTabs)
      context.commit("saveTabs", nowTabs);
    },
    clearTabs(context) {
      const model = { title: "首页", path: "/home", params: {}, query: {} }
      context.commit("clearTabs", model);
      context.commit("selectTabs", model)
    },
    oneTabs(context, Tabs) {
      context.commit("clearTabs", Tabs);
    }
  },
  getters: {
    routerTabs(state) {
      return state.routerTabs;
    },
    nowTabs(state) {
      return state.nowTabs;
    }
  }
}
