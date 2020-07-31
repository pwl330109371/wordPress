<template>
  <div class="login">
    <div class="login-main">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input type="username" placeholder='请输入用户名' v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passw">
          <el-input type="password" placeholder='请输入密码' v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="text-right">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isUserName } from '@/utils/validate'
import { login } from '@/api/user'
import { setCookie } from '@/utils/auth'
export default {
  name: 'login',
  data () {
    var validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名！'))
      }
      if (isUserName(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的用户名！'))
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        username: [
          { validator: validateName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const params = {
            name: this.ruleForm.username,
            password: this.ruleForm.password
          }
          const { data } = await login(params)
          console.log(data)
          if (data.state === 200) {
            this.$message.success('登录成功!')
            const token = data.token
            setCookie('token', token)
            console.log(token)
          } else {
            this.$message.error(data.msg)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.login-main {
  .text-right {
    text-align: right;
  }
  .el-form-item__label {
    display: inline-block;
    text-align: justify;
    text-align-last: justify;
  }
}
</style>
