/**
 * 路由管理
 */
import { setSession, getSession } from "@/tool/storage";
export default {
  namespace: 'true',
  state() {
    return {
      routerTabs: [],
      nowTabs: {
        title: "",
        path: "",
        params: "",
        query: ""
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
        setSession("_routerTabs", state.routerTabs)
      }
      // console.log("state.routerTabs", state.routerTabs)
    },
    //选择路由
    selectTabs(state, nowTabs) {
      state.nowTabs = nowTabs;

      setSession("_nowTabs", state.nowTabs)
    },
    delTabs(state, Tab) {
      const { path } = Tab;
      const index = state.routerTabs.findIndex((x) => x.path == path)
      if (index > -1) {
        state.routerTabs.splice(index, 1)
        setSession("_routerTabs", state.routerTabs)
      }
    },
    clearTabs(state) {
      state.routerTabs = []
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
      context.commit("clearTabs");
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
