<template>
  <div class="home-container">
    <!-- 菜单 -->
    <div class="html-menu">
      <div class="layout-logo">
        <img class="logo-img" src="~@/assets/vite.svg" alt="logo" />
        <div v-show="!isCollapse" class="website-name">管理系统</div>
      </div>
      <el-menu
        :default-active="activePath"
        class="el-menu-vertical"
        :collapse="isCollapse"
        unique-opened
        :collapse-transition="false"
      >
        <MenuTree :menuLink="menuLink" />
      </el-menu>
    </div>
    <div class="html-content">
      <!-- header -->
      <div class="header-container">
        <SvgIcon
          class="header-icon-img"
          :icons="!isCollapse ? 'DArrowLeft' : 'DArrowRight'"
          @click="isCollapse = !isCollapse"
        />
        <div class="header-user">
          <div class="data_txt">{{ $filters.dateTime(timeTxt) }}</div>
          <el-avatar
            shape="circle"
            :src="avatar"
            class="user-avatar"
            @click="operate = true"
          />
          <el-dropdown class="dropdown">
            <div class="el-dropdown-link">
              <div class="user-name">{{ userInfo && userInfo.name }}</div>
              <SvgIcon class="dropdown-ArrowDown" :icons="'ArrowDown'" />
            </div>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="logout">退出系统</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <!-- 主要内容 -->
      <div class="_content-main">
        <MenuHeader @emitMenu="emitMenu" />
        <div class="_router-main">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component
                :is="Component"
                :key="$route.name"
                v-if="$route.meta.keepAlive"
              />
            </keep-alive>
            <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive" />
          </router-view>
        </div>
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
  display: flex;
  .html-menu {
    max-width: 200px;
    height: 100%;
    overflow-y: auto;
    position: relative;
    background: rgb(25, 26, 35);

    .layout-logo {
      width: 100%;
      height: 50px;
      padding: 0;
      margin: 0;
      position: relative;
      display: flex;
      padding: 0 10px;
      .logo-img {
        width: 30px;
        height: 30px;
        margin-top: 10px;
      }
      .website-name {
        flex: 1;
        color: #fff;
        font-weight: 600;
        font-size: 20px;
        padding-left: 10px;
        line-height: 50px;
      }
      .toggle-button-icon {
        font-size: 20px;
        color: #ffffff;
        width: 30px;
        height: 25px;
        margin: auto;
        display: block;
      }
    }

    .el-menu-vertical {
      background: rgb(25, 26, 35);
      border-right: none;
    }
    .el-menu-vertical:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .html-menu::-webkit-scrollbar {
    display: none;
  }

  .html-content {
    flex: 1;
    height: 100%;
    overflow: hidden;
    .header-container {
      position: relative;
      width: 100%;
      height: 50px;
      padding: 0 20px;
      line-height: 50px;
      display: flex;
      background: #fff;
      .header-icon-img {
        width: 20px;
        height: 20px;
        color: #9b9a9a;
        margin-top: 15px;
      }
      .header-user {
        margin-left: auto;
        display: flex;
        .data_txt {
          font-size: #9b9a9a;
          line-height: 50px;
          padding-right: 15px;
          font-size: 14px;
        }
        .user-avatar {
          width: 30px;
          height: 30px;
          margin-top: 10px;
        }
        .dropdown {
          .el-dropdown-link {
            display: flex;
            .user-name {
              padding-left: 15px;
              color: #000000;
              line-height: 50px;
              padding-right: 5px;
            }
            .dropdown-ArrowDown {
              width: 20px;
              height: 20px;
              color: #000000;
              margin-top: 15px;
              vertical-align: middle;
              display: block;
            }
          }
        }
      }
    }

    ._content-menu::-webkit-scrollbar {
      display: none;
    }
    ._content-main {
      width: 100%;
      height: 100%;
      overflow: hidden;
      ._router-main {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
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
import MenuHeader from "./navTabs.vue";
import { useStore } from "vuex";
import { Session, Local } from "@/tool/storage";

const router = useRouter();
const store = useStore();
let timeTxt = ref(new Date().getTime());
let isCollapse = ref(false);
let menuLink = ref([
  {
    path: "/home",
    title: "首页",
    icons: "HomeFilled",
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
      {
        path: "/user/Welcome",
        title: "欢迎用户",
        icons: "User",
        isChild: false,
      },
    ],
  },
]);
let activePath = ref("");
let operate = ref(false);
let userInfo = reactive({});
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
  userInfo = Session.get("userInfo");
  activePath.value = store.getters.nowTabs.path || "/index";
});

const emitMenu = (path) => {
  console.log("emitMenu", path);
  activePath.value = path;
};
// 清除缓存
const logout = () => {
  Session.clear();
  Local.clear();
  router.push("/login");
};
</script>
