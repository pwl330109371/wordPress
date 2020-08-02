<template>
  <div class="register">
    <div class="register-main">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入用户名"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.password"  placeholder="请输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" @keydown.enter.native="submitForm('ruleForm')" placeholder="请再次输入密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="text-right">
            <el-button type="primary" @click="submitForm('ruleForm')" :loading="isLoading">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { isUserName } from '@/utils/validate'
import { register } from '@/api/user'
export default {
  name: 'register',
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      isLoading: false,
      ruleForm: {
        username: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          { validator: validateName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.isLoading = true
          const params = {
            name: this.ruleForm.username,
            password: this.ruleForm.password
          }
          const { data } = await register(params)
          console.log(data)
          this.isLoading = false
        } else {
          console.log('error submit!!')
          this.isLoading = false
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
/deep/.register-main {
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
