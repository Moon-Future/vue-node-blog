<template>
    <div class="login">
        <div class="panel">
            <el-form label-position="left">
                <el-form-item label="用户">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="login">登录</el-button>
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

            }
        },
        methods: {
            login() {
                this.$router.push('/admin');
            }
        }
    }
</script>

<style>
    .login {
        height: 100%;
        background: url('../../../static/images/pic10.jpg') no-repeat;
        background-position: center
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
