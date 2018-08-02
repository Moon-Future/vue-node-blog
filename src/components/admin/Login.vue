<template>
  <div class="login">
    <div class="login-avatar">
      <img :src="avatarRoot + loginForm.avatar" alt="编辑" @click="uploadShow = signupFlag ? true : false">
    </div>
    <div class="tabs">
      <span class="tab-login" @click="goToLogin('loginForm')" :class="{'tabClicked': !signupFlag}">登陆</span>
      <span class="tab-signup" @click="goToSignup('loginForm')" :class="{'tabClicked': signupFlag}">注册</span>
    </div>
    <div class="panel">
      <el-form label-position="left" :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginForm.email"></el-input>
          <el-checkbox v-model="loginForm.reminder" v-if="signupFlag" style="text-align:left;display:block">收到回复邮件提醒</el-checkbox>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" @keyup.enter.native="login('loginForm')"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassword" v-if="signupFlag">
          <el-input type="password" v-model="loginForm.rePassword"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickName" v-if="signupFlag">
          <el-input v-model="loginForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="个人网站" prop="website" v-if="signupFlag">
          <el-input v-model="loginForm.website"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-submit">
        <el-button type="success" @click="login('loginForm')" v-if="!signupFlag">登录</el-button>
        <el-button type="primary" @click="signup('loginForm')" v-if="signupFlag">注册</el-button>
      </div>
      <div class="goHome">
        <router-link to="/">Go Home</router-link>
      </div>
    </div>
    <my-upload field="avatar" id="avatar-upload"
      :width="200"
      :height="200"
      v-model="uploadShow"
      url="api/picture/avatar"
      :params="params"
      :headers="headers"
      @crop-upload-success="cropUploadSuccess"
      img-format="jpg"></my-upload>
  </div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload'
  const crypto = require('crypto');
  export default {
    name: 'Login',
    components: {
       myUpload
    },
    data() {
      return {
        uploadShow: false,
        headers: {
          smail: '*_~'
        },
        params: {
          avatar: ''
        },
        signupFlag: false,
        avatarRoot: '../../../static/images/avatar/',
        loginForm: {
          email: '',
          password: '',
          rePassword: '',
          nickName: '',
          website: '',
          avatar: 'avatar.jpg',
          reminder: ''
        },
        rules: {
          email: [
            { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请填写密码', trigger: 'blur' }
          ],
          rePassword: [
            { required: true, message: '请填写密码', trigger: 'blur' }
          ],
          nickName: [
            { required: true, message: '请填写大名', trigger: 'blur' }
          ],
        },
      }
    },
    beforeCreate() {
      this.$http.get('/api/getSession')
        .then((res) => {
          if(res.data !== false) {
            this.$router.push('/admin');
          }
        })
        .catch((err) => {
          throw err;
        })
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            this.$http.post('/api/user/login', {
              email: this.loginForm.email,
              password: crypto.createHash('sha1').update(this.loginForm.password.trim()).digest('hex')
            }).then((res) => {
              res = res.data;
              if(res.status !== undefined && res.status === false){
                this.$message.error(res.msg);
                return;
              }
              this.$message.success('登陆成功');
              this.$router.push('/admin');
            }).catch((err) => {
              throw err;
            })
          }else {
            this.$message({
              showClose: true,
              message: '数据有误，请重新填写',
              type: 'error'
            });
            return false;
          }
        })
      },
      signup(formName) {
        this.$refs[formName].validate((valid) => {
          if(valid) {
            if (this.loginForm.password !== this.loginForm.rePassword) {
              this.$message.error('两次密码输入不一样');
              return;
            }
            this.$http.post('/api/user/signup', {
              email: this.loginForm.email,
              password: crypto.createHash('sha1').update(this.loginForm.password.trim()).digest('hex'),
              rePassword: crypto.createHash('sha1').update(this.loginForm.rePassword.trim()).digest('hex'),
              name: this.loginForm.nickName.trim(),
              avatar: this.loginForm.avatar,
              website: this.loginForm.website.trim(),
              reminder: this.loginForm.reminder ? 1 : 0
            }).then((res) => {
              if (res.data.status === true) {
                let email = this.loginForm.email, password =  this.loginForm.password;
                this.$message.success('注册成功');
                this.signupFlag = false;
                this.$refs[formName].resetFields();
                this.loginForm.email = email;
                this.loginForm.password = password;
              } else {
                this.$message.error(res.data.msg);
              }
            }).catch((err) => {
              throw err;
            })
          }else {
            this.$message({
              showClose: true,
              message: '数据有误，请重新填写',
              type: 'error'
            });
            return false;
          }
        })
      },
      goToSignup(formName) {
        this.signupFlag = true;
        this.$refs[formName].resetFields();
      },
      goToLogin(formName) {
        this.signupFlag = false;
        this.$refs[formName].resetFields();
      },
      cropUploadSuccess(fileName, field) {
        this.params.avatar = fileName;
        this.loginForm.avatar = fileName;
      }
    }
  }
</script>

<style>
  .login {
    min-height: 100%;
    background: #f1f1f1;
    text-align: center;
    padding: 20px 0;
    box-sizing: border-box;
  }

  .login-avatar {
    margin-bottom: 20px;
  }

  .login-avatar img {
    border-radius: 100%;
    width: 150px;
    height: 150px;
    cursor: pointer;
    display: inline-block;
    border: 1px dotted #ccc;
    line-height: 150px;
  }

  .tabs {
    margin-bottom: 20px;
    font-size: 1.2em;
    color: #555;
  }

  .tabs span {
    cursor: pointer;
    padding: 10px;
    opacity: 0.7;
  }

  .tabs span:hover {
    color: #403333;
    opacity: 1;
  }

  .tabs span.tabClicked {
    border-bottom: 2px solid #0f88eb;
    color: #0f88eb;
  }

  .panel {
    width: 300px;
    position: relative;
    left: 50%;
    margin-left: -150px;
    background: #fff;
    border: 1px solid #d5d5d5;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
  }

  .panel label {
    color: #000
  }

  .panel input {
    background: transparent;
    color: #000
  }

  .btn-submit button {
    width: 100%;
  }

  .goHome {
    text-align: center;
    padding: 10px 5px;
  }
  .goHome a {
    text-decoration: none;
    padding: 0 5px 5px 5px;
    color: #0f88eb;
  }
  .goHome a:hover {
    border-bottom: 2px solid #0f88eb
  }

  /* 上次头像组件自适应 */
  @media only screen and (max-width: 568px) {
    #avatar-upload .vicp-wrap {
      width: 300px;
      height: 500px;
    }
    #avatar-upload .vicp-wrap .vicp-close {
      background: #a9a7a7;
      right: 0px;
      top: 0px;
    }
  }

  @media only screen and (min-width: 568px) and (max-width: 667px){
    #avatar-upload .vicp-wrap {
      width: 550px;
      height: 280px;
    }
    #avatar-upload .vicp-wrap .vicp-close {
      background: #a9a7a7;
      right: 0px;
      top: 0px;
    }
  }
</style>
