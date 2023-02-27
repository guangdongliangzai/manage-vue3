<template>
  <div class="home-container">
    <!-- header -->
    <div class="header-container">
      <SvgIcon class="header-icon-img" :icons="'Grid'" />
      <div class="header-icon" @click="collapseChage">后台管理系统</div>
      <div class="data_txt">{{ $filters.dateTime(timeTxt) }}</div>
      <div class="header-user">
        <el-avatar
          shape="circle"
          :src="avatar"
          class="user-avatar"
          @click="operate = true"
        ></el-avatar>
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link" style="color: #fff; cursor: pointer">
            &nbsp;&nbsp; <SvgIcon class="dropdown-ArrowDown" :icons="'ArrowDown'" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="html-content">
      <!-- 菜单 -->
      <div class="_content-menu">
        <div class="toggle-button" @click="isCollapse = !isCollapse">
          <SvgIcon class="toggle-button-icon" :icons="isCollapse ? 'Expand' : 'Fold'" />
        </div>
        <el-menu
          :default-active="activePath"
          class="el-menu-vertical"
          :collapse="isCollapse"
        >
          <MenuTree :menuLink="menuLink" />
        </el-menu>
      </div>
      <!-- 主要内容 -->
      <div class="_content-main">
        <MenuHeader @emitMenu="emitMenu" />
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
        </router-view>
      </div>
    </div>
  </div>
  <!-- 对话框表单 -->
  <el-dialog
    class="my-operate-dialog"
    :close-on-click-modal="false"
    :model-value="operate ? true : false"
    :destroy-on-close="true"
    width="500px"
    @close="operate = false"
  >
    <template #header>
      <div class="title" v-drag="['.my-operate-dialog', '.el-dialog__header']">
        信息管理
      </div>
    </template>
    <el-form @keyup.enter="onSubmit()" :rules="rules" :model="adminInfo">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="adminInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input type="password" v-model="adminInfo.password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="operate = false" type="primary">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.home-container {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  .header-container {
    position: relative;
    width: 100vw;
    height: 70px;
    padding: 0 30px;
    line-height: 70px;
    display: flex;
    background-color: #242f42;
    .header-icon-img {
      color: #fff;
      margin-top: 15px;
      display: block;
      font-size: 40px;
      width: 40px;
      height: 40px;
    }
    .header-icon {
      padding-left: 10px;
      font-size: 22px;
      color: #fff;
      width: 300px;
      line-height: 70px;
    }
    .data_txt {
      margin-left: auto;
      margin-right: 0;
      color: #fff;
    }
    .header-user {
      width: 200px;
      text-align: right;
      .user-avatar {
        width: 50px;
        height: 50px;
        margin-top: 10px;
      }
      .dropdown {
        margin-top: 27px;
        font-size: 20px;
        .dropdown-ArrowDown {
          width: 25px;
          height: auto;
        }
      }
    }
  }
  .html-content {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    ._content-menu {
      max-width: 230px;
      height: 100%;
      overflow-y: auto;
      position: relative;
      padding-top: 25px;
      .toggle-button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #d9e0e7;
        font-size: 18px;
        line-height: 25px;
        color: #fff;
        text-align: center;
        letter-spacing: 0.2em;
        cursor: pointer;
        color: black;
        .toggle-button-icon {
          font-size: 20px;
          color: black;
          width: 30px;
          height: 25px;
        }
      }
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
    }
    ._content-menu::-webkit-scrollbar {
      display: none;
    }
    ._content-main {
      flex: 1;
      height: 100%;
      overflow: hidden;
    }
  }
}

.el-aside {
  background: white;
  width: auto !important;
}

.el-footer {
  color: #cccccc;
  text-align: center;
  line-height: 60px;
}

.el-footer:hover {
  color: #2661ef;
}
</style>

<script setup>
import avatar from "@/assets/img/avator.jpg";
import { reactive } from "vue-demi";
import { useRouter } from "vue-router";
import MenuTree from "./MenuTree.vue";
import MenuHeader from "./header.vue";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
let timeTxt = ref(new Date().getTime());
let isCollapse = ref(false);
let menuLink = ref([
  {
    path: "/home",
    title: "首页",
    icons: "House",
    isChild: false,
  },
  {
    title: "系统设置",
    icons: "Setting",
    isChild: true,
    childList: [
      {
        path: "/user/list",
        title: "用户管理",
        icons: "Filter",
        isChild: false,
      },
    ],
  },
]);
let activePath = ref("");
let operate = ref(false);

let adminInfo = ref({ username: "", password: "" });
const rules = reactive({
  username: [{ required: true, message: "请填写用户名" }],
  password: [{ required: true, message: "请填写密码" }],
});
const onSubmit = () => {
  operate.value = false;
};

// 挂载 DOM 之前
onBeforeMount(() => {
  activePath.value = store.getters.nowTabs.path || "/index";
});

const emitMenu = (path) => {
  activePath.value = path;
};
// 清除缓存
const logout = () => {
  sessionStorage.clear();
  router.push("/login");
  sessionStorage.clear();
  setTimeout(() => {
    location.reload();
  }, 100);
};
</script>
