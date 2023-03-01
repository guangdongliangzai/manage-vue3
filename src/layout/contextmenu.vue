<template>
  <transition name="el-zoom-in-center">
    <div
      class="el-popper is-pure is-light el-dropdown__popper ba-contextmenu"
      :style="`top: ${state.axis.y + 5}px; left:${state.axis.x - 14}px;width:150px`"
      :key="Math.random()"
      v-show="state.show"
      aria-hidden="false"
      data-popper-placement="bottom"
    >
      <ul class="el-dropdown-menu">
        <template v-for="(item, idx) in state.menu" :key="idx">
          <li
            class="el-dropdown-menu__item"
            :class="item.disabled ? 'is-disabled' : ''"
            tabindex="-1"
            @click="onContextmenuItem(item)"
          >
            <SvgIcon class="el-menu-icons" :icons="item.icon" />
            <span>{{ item.label }}</span>
          </li>
        </template>
      </ul>
      <span class="el-popper__arrow" :style="{ left: `${state.arrowAxis}px` }"></span>
    </div>
  </transition>
</template>

<script setup>
import { useEventListener } from "@vueuse/core";
const emit = defineEmits(["contextmenuItemClick"]);

const state = reactive({
  show: false,
  axis: {
    x: 0,
    y: 0,
  },
  menu: [
    // { name: "refresh", label: "重新加载", icon: "Refresh" },
    { name: "close", label: "关闭标签", icon: "Close" },
    { name: "closeOther", label: "关闭其他标签", icon: "Lock" },
    { name: "closeAll", label: "关闭全部标签", icon: "Delete" },
  ],
  arrowAxis: 10,
});
const onShowContextmenu = (axis) => {
  state.axis = axis;
  state.show = true;
};
const onContextmenuItem = (item) => {
  emit("contextmenuItemClick", item);
};

const onHideContextmenu = () => {
  state.show = false;
};
onMounted(() => {
  useEventListener(document, "click", onHideContextmenu);
});
defineExpose({
  onShowContextmenu,
  onHideContextmenu,
});
</script>

<style scoped lang="less">
.ba-contextmenu {
  z-index: 9999;
}
.el-popper,
.el-popper.is-light .el-popper__arrow::before {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: none;
}
.el-dropdown-menu__item {
  padding: 8px 20px;
  user-select: none;
  .el-menu-icons {
    width: 10px;
  }
}
.el-dropdown-menu__item .icon {
  margin-right: 5px;
}
.el-dropdown-menu__item:not(.is-disabled) {
  &:hover {
    background-color: var(--el-dropdown-menuItem-hover-fill);
    color: var(--el-dropdown-menuItem-hover-color);
    .fa {
      color: var(--el-dropdown-menuItem-hover-color) !important;
    }
  }
}
</style>
