<template>
  <el-container>
    <el-header>
      <div style="width: 400px">
        <p style="float: left">
          <el-icon color="#409EFF" :size="50">
            <ElementPlus />
          </el-icon>
        </p>
        <p style="float: left; font-size: 25px; font-weight: bold">欢迎</p>
      </div>
    </el-header>
    <el-main>
      <el-card class="login_card">
        <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="80px">
          <el-form-item label="账号：" prop="username">
            <el-input v-model="form.username" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="form.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit()">登录</el-button>
            <el-button type="info" @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { login } from "@/api/user";
// import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Session } from "@/tool/storage";
const store = useStore();

const router = useRouter();
const form = reactive({
  username: "",
  password: "",
});
const ruleFormRef = ref();
const rules = reactive({
  username: [{ required: true, message: "账号不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});
const onSubmit = () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate(async (valid) => {
    if (valid) {
      const model = { title: "首页", path: "/home", params: {}, query: {} };
      store.dispatch("updateNowTabs", model);
      store.dispatch("saveTabs", model);
      document.title = document.title || meta.title;
      Session.set("userInfo", { ...form, name: "广东靓仔" });
      router.push({
        path: "/home",
      });
      // const res = await  login(form);
      // if (res.data) {
      //   if (res.data.success) {
      //     // proxy.$commonJs.changeView('/home');
      //
      //   } else {
      //     ElMessage.error(res.data.message);
      //   }
      // } else {
      //   ElMessage.error("服务器内部错误");
      // }
    } else {
      return false;
    }
  });
};
const resetForm = () => {
  if (!ruleFormRef) return;
  ruleFormRef.value.resetFields();
};
</script>

<style scoped>
.el-container {
  height: 100vh;
}

.el-header {
  height: 10%;
}

.el-main {
  height: 100%;
  background-image: url("@/assets/img/login-bg.jpeg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position-y: bottom;
}

.login_card {
  margin: 200px 300px auto auto;
  width: 400px;
  height: 200px;
  border-radius: 10px;
}
</style>
