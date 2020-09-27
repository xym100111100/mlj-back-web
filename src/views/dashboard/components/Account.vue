<template>
  <el-form :model="this.user" status-icon :rules="rules" ref="ruleForm">
    <el-form-item label="旧密码" prop="oldPassword">
      <el-input v-model.trim="user.oldPassword" />
    </el-form-item>
    <el-form-item label="新密码" prop="Password">
      <el-input type="password" v-model.trim="user.Password" />
    </el-form-item>
    <el-form-item label="再次输入新密码" prop="checkPassword">
      <el-input type="password" v-model.trim="user.checkPassword" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit('ruleForm')">提 交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          oldPassword: '',
          Password: '',
          checkPassword: ''
        }
      }
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.user.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword')
        }
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.Password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        oldPassword: [
          {
            required: true,
            message: '请输入旧密码',
            trigger: 'blur'
          }
        ],
        Password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交请求
    submit(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$message({
            message: 'User information has been updated successfully',
            type: 'success',
            duration: 5 * 1000
          })
        } else {
          alert('校验未通过!!')
          return false
        }
      })
    },

    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
