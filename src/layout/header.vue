<template>
  <div class="nav-tabs" ref="tabScrollbarRef">
    <div
      v-for="(item, index) in navTabs.routerTabs"
      @click="onTab(item)"
      @contextmenu.prevent="onContextmenu(item, $event)"
      class="ba-nav-tab"
      :key="index"
      :class="{ active: navTabsIndex == index }"
    >
      <div class="tabs-name">{{ item.title }}</div>
      <SvgIcon
        v-show="navTabs.routerTabs.length > 1"
        class="header-icon-img"
        @click.stop="closeTab(item, index)"
        :icons="'Close'"
      />
    </div>
  </div>
</template>
<style lang="less" scoped>
.nav-tabs {
  width: 100%;
  height: 40px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-right: var(--ba-main-space);
  scrollbar-width: none;
  padding: 5px 0;
  background-color: #f5f5f5;
  &::-webkit-scrollbar {
    height: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #eaeaea;
    border-radius: var(--el-border-radius-base);
    box-shadow: none;
    -webkit-box-shadow: none;
  }
  &::-webkit-scrollbar-track {
    background: #eaeaea;
  }
  &:hover {
    &::-webkit-scrollbar-thumb:hover {
      background: #c8c9cc;
    }
  }
  .ba-nav-tab {
    display: inline-flex;
    height: 30px;
    line-height: 30px;
    box-shadow: 2px 2px 2px 2px #c8c9cc;
    margin-right: 10px;
    padding-left: 20px;
    padding-right: 10px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    &.active {
      background-color: #2661ef !important;
      color: #ffffff;
    }
    .tabs-name {
      font-size: 14px;
      margin-right: 8px;
    }
    .header-icon-img {
      width: 15px;
      height: 15px;
      margin-top: 7px;
    }
  }
}
</style>

<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useCurrentInstance from "@/utils/useCurrentInstance";
const { proxy } = useCurrentInstance();
const store = useStore();
const tabScrollbarRef = ref();
const navTabs = reactive({ routerTabs: store.getters.routerTabs });
const navTabsIndex = ref(0);
const state = reactive({
  contextmenuItems: [
    { name: "refresh", label: "重新加载", icon: "fa fa-refresh" },
    { name: "close", label: "关闭标签", icon: "fa fa-times" },
    { name: "fullScreen", label: "当前标签全屏", icon: "el-icon-FullScreen" },
    { name: "closeOther", label: "关闭其他标签", icon: "fa fa-minus" },
    { name: "closeAll", label: "关闭全部标签", icon: "fa fa-stop" },
  ],
});
const emit = defineEmits(["emitMenu"]);
const router = useRouter();
const routerName = ref("");
// 挂载 DOM 之前
onBeforeMount(() => {
  proxy.$mitt.on("onRouteName", (name) => {
    console.log("onRouteName", name);
    routerName.value = name;
  });
});

//监听路由变化
watch(
  () => unref(router.currentRoute),
  (route) => {
    const { meta, params, path, query } = route;
    //添加tab
    const model = {
      title: routerName.value || meta.title,
      path: path,
      params: params,
      query: query,
    };
    store.dispatch("updateNowTabs", model);
    store.dispatch("saveTabs", model);
    proxy.$mitt.emit("onTabViewClose", route);
    document.title = routerName.value || meta.title;
    isTabs();
  }
);

//选了哪个tab
const isTabs = () => {
  const path = store.getters.nowTabs.path || "/index";
  let index = navTabs.routerTabs.findIndex((x) => x.path == path);
  if (index < 1) {
    index = 0;
  }
  navTabsIndex.value = index;
};

const closeTab = (item, index) => {
  store.dispatch("delTabs", item);
  if (navTabsIndex.value == index) {
    let tap = index > 0 ? index - 1 : index + 1;
    if (tap > navTabs.routerTabs.length) {
      tap = navTabs.routerTabs.length;
    }
    onTab(navTabs.routerTabs[tap]);
  }
};

const onTab = (item) => {
  const { path, params, query } = item;
  router.push({ path: path, params: params, query: query });
  emit("emitMenu", path);
};

const contextmenuRef = ref();
const onContextmenu = (menu, el) => {
  // 禁用刷新
  // state.contextmenuItems[0].disabled = route.path !== menu.path;
  // // 禁用关闭其他和关闭全部
  // state.contextmenuItems[4].disabled = state.contextmenuItems[3].disabled =
  //   navTabs.state.tabsView.length == 1 ? true : false;
  console.log(menu, el);
  const { clientX, clientY } = el;
  contextmenuRef.value.onShowContextmenu(menu, {
    x: clientX,
    y: clientY,
  });
};

const activeBoxStyle = reactive({
  width: "0",
  transform: "translateX(0px)",
});

// 挂载 DOM 之前
onBeforeMount(() => {
  isTabs();
});
</script>
