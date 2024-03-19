import { defineStore } from 'pinia'
const piniaRouter = defineStore('Router', {
    state: () => {
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
    actions: {
        //保存Tabs
        saveTabs(Tab) {
            const { path } = Tab;
            const index = this.routerTabs.findIndex((x) => x.path == path)
            if (index < 0) {
                this.routerTabs.push(Tab);
            }
            // console.log("this.routerTabs", this.routerTabs)
        },
        //选择路由
        selectTabs(nowTabs) {
            this.nowTabs = nowTabs;
        },
        //删除路由
        delTabs(Tab) {
            const { path } = Tab;
            const index = this.routerTabs.findIndex((x) => x.path == path)
            if (index > -1) {
                this.routerTabs.splice(index, 1)
            }
        },
        //清理路由
        oneTabs(item) {
            this.routerTabs = []
            this.routerTabs.push(item);
            this.selectTabs(item)
        },
        //更新路由
        updateNowTabs(nowTabs) {
            this.selectTabs(nowTabs)
            this.saveTabs(nowTabs)
        },
        //清理全部
        clearTabs() {
            const model = { title: "首页", path: "/home", params: {}, query: {} }
            this.routerTabs = []
            this.routerTabs.push(model);
            this.selectTabs(item)
        },

    },
    persist: {
        key: "_pinia_piniaRouter",
    },

})

export default piniaRouter