<template>
  <el-row :gutter="20">
    <!-- 遍历列表配置 -->
    <el-col v-for="(listConfig, index) in configs" :key="index" :span="listConfig.span || 24" class="list-col">
      <!-- 表格组件 -->
      <el-table :data="listConfig.data" border style="width: 100%; margin-bottom: 20px;">
        <!-- 动态生成列 -->
        <el-table-column v-for="col in listConfig.columns" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width" />

        <!-- 操作列 -->
        <el-table-column label="操作" width="120" v-if="listConfig.actions">
          <template slot-scope="{row}">
            <el-button v-for="(action, i) in listConfig.actions" :key="i" type="text" size="small" @click="action.handler(row)">
              {{ action.text }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'MultiList',
  props: {
    // 列表配置
    configs: {
      type: Array,
      required: true,
      validator: (configs) =>
        configs.every(
          (c) =>
            c.columns &&
            c.data &&
            Array.isArray(c.columns) &&
            Array.isArray(c.data)
        ),
    },
  },
  methods: {
    // 公共方法示例
    getListData(index) {
      return this.configs[index]?.data || []
    },
  },
}
</script>

<style scoped>
.list-col {
  margin-bottom: 20px;
}
</style>