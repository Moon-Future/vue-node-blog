<template>
    <div class="login">
            <div class="login-avatar">
                <img src="../../../static/images/avatar/head2.jpg" alt="">
            </div>
        <div class="panel">
            <el-form label-position="left" :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email"></el-input>
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
                <el-form-item>
                    <el-button type="success" @click="login('loginForm')" v-if="!signupFlag">登录</el-button>
                    <el-button type="primary" @click="signup('loginForm')" v-if="!signupFlag">注册</el-button>
                    <el-button type="success" @click="submit('loginForm')" v-if="signupFlag">提交</el-button>
                    <el-button type="primary" @click="backToLogin('loginForm')" v-if="signupFlag">返回登陆</el-button>
                    <router-link to="/" class="goHome">Go Home</router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    const crypto = require('crypto');
    export default {
        name: 'Login',
        data() {
            return {
                signupFlag: false,
                loginForm: {
                    email: '236338364@qq.com',
                    password: '489584507',
                    rePassword: '',
                    nickName: '',
                    avatar: '../../../static/images/avatar/head2.jpg'
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
                            password: crypto.createHash('sha1').update(this.loginForm.password).digest('hex')
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
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        if (this.loginForm.password !== this.loginForm.rePassword) {
                            this.$message.error('两次密码输入不一样');
                            return;
                        }
                        this.$http.post('/api/user/signup', {
                            email: this.loginForm.email,
                            password: crypto.createHash('sha1').update(this.loginForm.password).digest('hex'),
                            rePassword: crypto.createHash('sha1').update(this.loginForm.rePassword).digest('hex'),
                            name: this.loginForm.nickName,
                            avatar: this.loginForm.avatar
                        }).then((res) => {
                            if (res.data.status === true) {
                                this.$message.success('注册成功');
                                this.signupFlag = false;
                                this.$refs[formName].resetFields();
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
            signup(formName) {
                this.signupFlag = true;
                this.$refs[formName].resetFields();
            },
            backToLogin(formName) {
                this.signupFlag = false;
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    .login {
        height: 100%;
        background: #f1f1f1;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    @media only screen and (max-height: 568px) {
        .login {
            padding: 20px;
            height: initial;
        }
    }

    .login-avatar {
        margin-bottom: 20px;
    }

    .login-avatar img {
        border-radius: 100%;
        width: 150px;
        height: 150px;
        cursor: pointer;
    }

    .panel {
        width: 300px;
        background: #fff;
        box-shadow: 0 1px 3px #352626;
        padding: 20px 20px 0 20px;
        opacity: 0.8;
        box-sizing: border-box;
    }

    .panel label {
        color: #000
    }

    .panel input {
        background: transparent;
        color: #000
    }

    .goHome {
        text-decoration: none;
        float: right;
        padding: 0 5px;
    }
    .goHome:hover {
        border-bottom: 2px solid red
    }
</style>
