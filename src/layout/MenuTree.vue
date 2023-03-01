<template>
  <template v-for="(item, index) in props.menuLink" :key="index">
    <el-sub-menu v-if="item.isChild" index="0" class="subMenu">
      <template #title>
        <SvgIcon class="el-menu-icons" :icons="item.icons" />
        <span class="el-menu-txt">&nbsp;{{ item.title }}</span>
      </template>
      <MenuTree :menuLink="item.childList" />
    </el-sub-menu>
    <el-menu-item :index="item.path" v-else @click="selectMenu(item)">
      <SvgIcon class="el-menu-icons" :icons="item.icons" />
      <span class="el-menu-txt">&nbsp;{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<style scoped lang="less">
::v-deep(.el-menu-icons) {
  min-width: 20px;
  width: 20px;
  height: 20px;
}
::v-deep(.el-menu-txt) {
  font-size: 14px;
  font-weight: 400;
}

.el-menu-item {
  line-height: 45px;
  height: 45px;
  color: #fff !important;
}

::v-deep(.el-sub-menu__title) {
  line-height: 45px;
  height: 45px;
  color: #fff !important;
  background: initial !important;
  font-size: 14px;
}

::v-deep(.el-menu) {
  background-color: initial;
}

.el-menu-item:hover {
  background: #271d7e !important;
  color: #fff !important;
}
.el-sub-menu:hover {
  color: black;
}
.el-submenu__title:hover {
  background: initial;
  color: #fff !important;
}

// .el-submenu__title.is-active {
//   background: #2867fa !important;
//   color: #fff !important;
// }

.el-menu-item.is-active {
  color: #fff !important;
  font-size: 15px;
  font-weight: bold;
  background-color: #2c63e4 !important;
  border-radius: 2px;
  margin-right: 10px;

  box-sizing: border-box;
}
</style>

<script setup>
import MenuTree from "./MenuTree.vue";
import { useRouter } from "vue-router";
import useCurrentInstance from "@/utils/useCurrentInstance";
const { proxy } = useCurrentInstance();
const router = useRouter();
const props = defineProps(["menuLink"]);
function selectMenu(item) {
  router.push(item.path);
  proxy.$mitt.emit("onRouteName", item.title); //传递标题
  // document.title = item.title;
}
</script>
