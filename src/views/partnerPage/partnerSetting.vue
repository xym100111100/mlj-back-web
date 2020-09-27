<template>
  <div class="app-container">
    <!-- card 组件 -->

    <el-card>
      <el-tabs v-model="activeTab">
        <el-tab-pane label="修改密码" name="account">
          <el-form :rules="rules" label-width="100px" ref="form" :model="form">
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input type="password" v-model="form.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input type="password" v-model="form.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="newpasswordTwo">
              <el-input
                type="password"
                v-model="form.newpasswordTwo"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm('form')" type="primary"
                >修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import waves from '@/directive/waves'
import { mapGetters } from 'vuex'

import { updateData } from '@/api/user'
import {
  
  getAdminUserNo
} from '@/utils/auth'
export default {
  name: 'partnerSetting',
  directives: {
    waves,
  },
   computed: {
    ...mapGetters(['name'])
  },
  data() {
    var validatePassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur',
          },
        ],
        newpasswordTwo: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur',
          },
          {
            required: true,
            validator: validatePassword2,
            trigger: 'blur',
          },
        ],
      },
      activeTab: 'account',
      form: {
        oldPassword: '',
        newPassword: '',
        newpasswordTwo: '',
      },
    }
  },
  created() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         updateData({
           password:this.form.newPassword,
           oldPassword:this.form.oldPassword,
           adminUserNo:getAdminUserNo(),
           username:this.name
         }).then((res) => {
           if (res.code === 0) {
              this.$alert('点击确定重新登陆', '修改成功', {
                confirmButtonText: '确定',
                callback: (action) => {
                  this.logout()
                },
              })
            } else {
              this.$notify({
                message: '修改失败',
                type: 'error',
              })
            }
         })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
      async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  },
 
}
</script>
<style scoped>
</style>
