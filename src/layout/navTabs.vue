<template>
  <div class="nav-tabs">
    <div
      v-for="(item, index) in navTabs.routerTabs"
      @click="onTab(item)"
      @contextmenu.prevent="onContextmenu(item, index, $event)"
      class="ba-nav-tab"
      :key="index"
      :class="{ active: navTabspath == item.path }"
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
  <Contextmenu ref="contextmenuRef" @contextmenuItemClick="onContextmenuItem" />
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
    margin-right: 10px;
    padding-left: 20px;
    padding-right: 10px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    &.active {
      box-shadow: 2px 2px 2px 2px #c8c9cc;
      background-color: #ffffff !important;
      color: #000000;
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
import Contextmenu from "./contextmenu.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useCurrentInstance from "@/utils/useCurrentInstance";
import { nextTick } from "vue";
// import { piniaRouter } from "@/pinia/modeules/piniaRouter.js";
const { proxy } = useCurrentInstance();
const router = useRouter();
const store = useStore(); //路由管理
// const storeStore = piniaRouter(); //路由管理-----pinia

let navTabs = reactive({ routerTabs: store.getters.routerTabs });
const navTabspath = ref("");
const emit = defineEmits(["emitMenu"]);
// 挂载监听接收的标题
const routerName = ref("");
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
    initTabs(route);
  }
);

const initTabs = (route) => {
  const { meta, params, path, query } = route;
  //添加tab
  const model = {
    title: routerName.value || meta.title,
    path: path,
    params: params,
    query: query,
  };
  store.dispatch("updateNowTabs", model); //更新路由
  document.title = routerName.value || meta.title;
  isTabs();
};
//选了哪个tab
const isTabs = () => {
  const path = store.getters.nowTabs.path || "/index";
  navTabspath.value = path;
};
//关闭tab
const closeTab = (item, index) => {
  if (navTabspath.value == item.path) {
    let tap = index > 0 ? index - 1 : index + 1;
    if (tap > navTabs.routerTabs.length) {
      tap = navTabs.routerTabs.length;
    }
    onTab(navTabs.routerTabs[tap]);
  }
  store.dispatch("delTabs", item);
};
//切换
const onTab = (item) => {
  const { path, params, query } = item;
  if (path == store.getters.nowTabs.path) {
    return;
  }
  router.push({ path: path, params: params, query: query });
  emit("emitMenu", path);
};
//右键菜单内容
const contextmenuRef = ref(null);
let preventTab = reactive({}); //储存当前右键的路由
const onContextmenu = (menu, index, el) => {
  if (navTabs.routerTabs.length < 2) {
    return;
  }
  preventTab = { menu, index };
  let { clientX, clientY } = el;
  contextmenuRef.value.onShowContextmenu({
    x: clientX,
    y: clientY,
  });
};
const onContextmenuItem = (item) => {
  console.log(item.name);
  switch (item.name) {
    case "close":
      closeTab(preventTab.menu, preventTab.index);
      break;
    case "closeOther":
      store.dispatch("oneTabs", preventTab.menu);
      navTabs.routerTabs = store.getters.routerTabs;
      onTab(preventTab.menu);
      break;
    case "closeAll":
      store.dispatch("clearTabs");
      navTabs.routerTabs = store.getters.routerTabs;
      router.push(store.getters.nowTabs);
      break;
    default:
      break;
  }
};

onMounted(() => {
  nextTick(() => {
    console.log(" contextmenuRef.value", contextmenuRef.value);
  });
});

// 挂载 DOM 之前
onBeforeMount(() => {
  isTabs();
});
</script>
