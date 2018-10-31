<template>
  <div class="login-container">
    <div class="background">
      <img src="https://source.unsplash.com/random/1080x720" alt="">
    </div>
    <div class="login-wrapper">
      <h1>后台管理</h1>
      <div class="form-wrapper">
        <el-form ref="loginForm" :rules="rules" :model="form">
          <el-form-item prop="email">
            <el-input class="form-input" clearable maxlength="20" placeholder="邮箱" v-model="form.email">
              <template slot="prepend">
                <icon-font icon="icon-user"></icon-font>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="form-input" type="password" maxlength="20" clearable placeholder="密码" v-model="form.password" @keyup.enter.native="login">
              <template slot="prepend">
                <icon-font icon="icon-password"></icon-font>
              </template>
            </el-input>
          </el-form-item>
          <div v-show="registerFlag">
            <el-form-item prop="password">
              <el-input class="form-input" type="password" maxlength="20" clearable placeholder="确认密码" v-model="form.rePassword">
                <template slot="prepend">
                  <icon-font icon="icon-password"></icon-font>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="name">
              <el-input class="form-input" maxlength="20" clearable placeholder="昵称" v-model="form.name">
                <template slot="prepend">
                  昵称
                </template>
              </el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="login-button" v-show="!registerFlag">
          <el-button 
            type="primary" 
            :loading="subWait" 
            :class="subWait ? 'subWait' : ''" 
            @click="login">登陆</el-button>
        </div>
        <div class="register-button">
          <el-button 
            type="success" 
            :loading="subWait && registerFlag" 
            :class="subWait && registerFlag ? 'subWait' : ''" 
            @click="register">注册</el-button>
        </div>
        <div class="back-button" v-show="registerFlag">
          <el-button type="primary" @click="back">返回</el-button>
        </div>
        <div class="login-footer">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IconFont from '@/components/Iconfont'
  import apiUrl from '@/serviceAPI.config.js'
  const crypto = require('crypto')
  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
          rePassword: '',
          name: ''
        },
        rules: {
          email: [
            {required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          rePassword: [
            {required: true, message: '两次输入密码不同', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入昵称', trigger: 'blur'}
          ]
        },
        registerFlag: false,
        subWait: false,
        checked: false,
        password: '',
        cookieInfo: {}
      }
    },
    created() {
      
    },
    methods: {
      register() {
        if (!this.registerFlag) {
          this.registerFlag = true
          this.clear()
          return
        }
        if (this.subWait) {
          return
        }
        if (this.form.email === '' || this.form.password === '' || this.form.rePassword === '' || this.form.name === '') {
          this.$message.error('请补充完整数据')
          return
        }
        if (this.form.password !== this.form.rePassword) {
          this.$message.error('两次输入密码不同')
          return
        }
        this.subWait = true
        this.$http.post(apiUrl.register, {
          data: {
            email: this.form.email,
            password: crypto.createHash('sha1').update(this.form.password.trim()).digest('hex'),
            name: this.form.name
          }
        }).then(res => {
          this.subWait = false
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            this.registerFlag = false
            this.form.password = ''
            this.form.rePassword = ''
            this.form.name = ''
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          this.subWait = false
          this.$message.error('服务器君傲娇啦😭')
        })
      },
      login() {
        if (this.subWait) {
          return
        }
        if (this.form.email === '' || this.form.password === '') {
          this.$message.error('请输入邮箱和密码')
          return
        }
        this.subWait = true
        this.$http.post(apiUrl.login, {
          data: {
            email: this.form.email,
            password: crypto.createHash('sha1').update(this.form.password.trim()).digest('hex')
          }
        }).then(res => {
          this.subWait = false
          if (res.data.code === 200) {
            this.$message.success(res.data.message)
            // this.$router.push({path: '/'})
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          this.subWait = false
          this.$message.error('服务器君傲娇啦😭')
        })
      },
      back() {
        if (this.subWait) {
          return
        }
        this.registerFlag = false
        this.clear()
      },
      clear() {
        this.$refs.loginForm.resetFields()
        this.form.email = ''
        this.form.password = ''
      }
    },
    components: {
      IconFont
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/common/css/variable.scss';

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .background {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -1;
      img {
        width: 100%;
      }
    }
    .login-wrapper {
      width: 350px;
      padding: 10px;
      border: 1px solid $color-gray;
      box-shadow: 0 0 1px $color-gray;
      background-color: $color-white;
      h1 {
        font-weight: bold;
        padding: 10px 0;
      }
      .form-wrapper {
        .login-button, .register-button, .back-button {
          display: flex;
          flex-flow: column;
          padding: 10px 0;
        }
        .remember-wrapper {
          text-align: left;
        }
      }
    }
  }
</style>
