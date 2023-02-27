<template>
  <template v-for="(item, index) in props.menuLink" :key="index">
    <el-sub-menu v-if="item.isChild" index="0" class="subMenu">
      <template #title>
        <SvgIcon
          class="el-menu-icons"
          style="width: 25px; height: 25px"
          :icons="item.icons"
        /><span>{{ item.title }}</span>
      </template>
      <MenuTree :menuLink="item.childList" />
    </el-sub-menu>
    <el-menu-item :index="item.path" v-else @click="selectMenu(item)">
      <SvgIcon
        class="el-menu-icons"
        style="width: 25px; height: 25px"
        :icons="item.icons"
      /><span>{{ item.title }}</span>
    </el-menu-item>
  </template>
</template>

<style scoped lang="less">
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  .el-menu-icons {
    width: 25px;
    height: 25px;
    font-size: 25px;
    margin-right: 10px;
  }
}
.el-menu--collapse {
  .el-menu-item {
    .el-menu-icons {
      width: 25px;
      height: 25px;
      font-size: 25px;
      margin-right: 0;
    }
  }
  .subMenu {
    display: block !important;
    ::v-deep(.el-sub-menu__title) {
      display: block !important;
      line-height: 40px;
      ::v-deep(.el-sub-menu__icon-arrow) {
        display: block !important;
        svg {
          width: 25px;
          height: 25px;
        }
      }
      ::v-deep(.el-menu-icons) {
        width: 25px;
        height: 25px;
        font-size: 25px;
        margin-right: 0;
      }
    }
  }
  .el-sub-menu {
    .el-sub-menu__title {
      display: block !important;
      .el-menu-icons {
        width: 25px;
        height: 25px;
        font-size: 25px;
        margin-right: 0;
      }
    }
  }
}

.el-menu-item.is-active {
  color: #fff !important;
  font-size: 15px;
  font-weight: bold;
  background-color: #2661ef !important;
  border-radius: 2px;
  height: 50px;
  line-height: 50px;
  box-sizing: border-box;
  margin: 2px 5px 0px 2px;
}
.el-icon {
  width: 25px;
  height: 25px;
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
  proxy.$mitt.emit("onRouteName", item.title);
  // document.title = item.title;
}
</script>
