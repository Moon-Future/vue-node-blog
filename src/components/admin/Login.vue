<template>
    <div class="login">
        <div class="panel">
            <el-form label-position="left" :model="loginForm" :rules="rules" ref="loginForm">
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="loginForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="login('loginForm')">登录</el-button>
                    <el-button type="primary">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>    
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                rules: {
                    email: [
                        { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' }
                    ],
                },
            }
        },
        methods: {
            login(formName) {
                var self = this;
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.$http.post('/api/user/login', {
                            email: this.loginForm.email,
                            password: this.loginForm.password
                        }).then((res) => {
                            res = res.data;
                            if(res.status !== undefined && res.status === false){
                                this.$message.error(res.msg);
                                return;
                            }
                            this.$message.success('登陆成功');
                            // this.$router.push('/admin');
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
            }
        }
    }
</script>

<style>
    .login {
        height: 100%;
        background: url('../../../static/images/pic10.jpg') no-repeat;
        background-position: center;
        background-size: cover;
    }

    .panel {
        width: 300px;
        height: 224px; 
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -170px;
        margin-top: -132px;
        background: #fff;
        padding: 20px;
        opacity: 0.8
    }

    .panel label {
        color: #000
    }

    .panel input {
        background: transparent;
        color: #000
    }
</style>
