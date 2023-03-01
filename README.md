# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup
 导航菜单：home.vue----menuLink

 传递信息：
 import useCurrentInstance from "@/utils/useCurrentInstance";
const { proxy } = useCurrentInstance();
 proxy.$mitt.emit("onRouteName", item.title); //传递标题
 onBeforeMount(() => {
  proxy.$mitt.on("onRouteName", (name) => {
    console.log("onRouteName", name);//接受标题
    routerName.value = name;
  });
});

provide-inject


VUEX持久化:vuex-persistedstate

添加全局过滤器：@filters-modules

添加全局组件：@components--vite.config配置路径

VUEX模块添加：@store-modeules    持久化添加index.js-createPersistedstate

自动引入vue:src/utils/auto-import.d.ts --vite.config配置路径

storage封装：@tool/storage.ts

全局样式: @style.less