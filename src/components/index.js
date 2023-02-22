//动态引入组件--暂无用
const files = import.meta.glob("./components/**/*.vue");
const modules = {};
Object.keys(files).forEach((fileName) => {
  const nameLi = fileName.split("/");
  modules[nameLi[nameLi.length - 2]] = defineAsyncComponent(() => import(fileName));
});
