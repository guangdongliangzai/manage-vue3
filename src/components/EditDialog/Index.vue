<!-- EditDialog.vue -->
<template>
  <el-dialog :title="title" :visible.sync="visible" width="600px" @close="handleClose">
    <el-form :model="formData" :rules="rules" ref="editForm" label-width="100px">
      <!-- 动态生成表单项 -->
      <template v-for="(field, index) in fields">
        <el-form-item :key="index" :label="field.label" :prop="field.prop">
          <!-- 根据字段类型渲染不同组件 -->
          <component :is="getComponentType(field.type)" v-model="formData[field.prop]" v-bind="field.props || {}">
            <template v-if="field.options">
              <el-option v-for="opt in field.options" :key="opt.value" :label="opt.label" :value="opt.value" />
            </template>
          </component>
        </el-form-item>
      </template>
    </el-form>

    <div slot="footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
const componentMap = {
  input: 'el-input',
  select: 'el-select',
  date: 'el-date-picker',
  checkbox: 'el-checkbox-group',
}

export default {
  name: 'EditDialog',
  props: {
    title: String,
    fields: {
      type: Array,
      required: true,
    },
    initialData: {
      type: Object,
      required: true,
    },
    rules: Object,
  },
  data() {
    return {
      visible: false,
      formData: {},
    }
  },
  watch: {
    initialData: {
      immediate: true,
      handler(val) {
        this.formData = { ...val }
      },
    },
  },
  methods: {
    getComponentType(type) {
      return componentMap[type] || 'el-input'
    },

    open() {
      this.visible = true
    },

    handleClose() {
      this.$refs.editForm.resetFields()
    },

    handleSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.formData)
          this.visible = false
        }
      })
    },
  },
}
</script>