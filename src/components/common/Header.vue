<template>
    <div class="m-header">
        <div class="m-avatar">
            <img class="left-avatar" src="../../../static/images/head1.jpg"/>
            <p>我的博客我的博客我的博客我的博客</p>
        </div>
        <div class="md-menu">
            <el-menu mode="horizontal">
                <el-menu-item index="0"><i class="iconfont icon-wenzhang"></i>Article</el-menu-item>
				<el-menu-item index="1"><i class="iconfont icon-about"></i>About</el-menu-item>
				<el-menu-item index="2"><i class="iconfont icon-comments"></i>Comment</el-menu-item>
				<el-menu-item index="3"><i class="iconfont icon-icon3"></i>Contact</el-menu-item>
            </el-menu>
        </div>
         <div class="xs-menu">
             <i class="iconfont" :class="menuOpen ? 'icon-caidandakai' : 'icon-caidan'" @click="menuHandle"></i>
        </div>
        <div class="m-detail" v-show="menuOpen">
            <el-menu theme="dark">
                <el-menu-item index="0"><i class="iconfont icon-wenzhang"></i>Article</el-menu-item>
				<el-menu-item index="1"><i class="iconfont icon-about"></i>About</el-menu-item>
				<el-menu-item index="2"><i class="iconfont icon-comments"></i>Comment</el-menu-item>
				<el-menu-item index="3"><i class="iconfont icon-icon3"></i>Contact</el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menuOpen: false,
            }
        },
        methods: {
            menuHandle() {
                this.menuOpen = !this.menuOpen;
            }
        }
    }
</script>

<style>
    .m-header {
        height: 60px;
    }

    .m-avatar {
        width: 200px;
        margin-left: 30px;
        float: left;
    }

    .m-avatar img {
        float: left;
    }

    .m-avatar p {
        line-height: 60px;
        margin: 0;
        text-align: left;
        text-indent: 10px;
    }

    .md-menu {
        margin-right: 30px;
        float: right;
        display: none;
    }

    .md-menu ul {
        background: #fff;
    }

    .xs-menu {
        line-height: 60px;
        float: right;
        margin-right: 30px;
    }

    .m-detail {
        position: absolute;
        width: 100%;
        opacity: 0.8;
        color: #fff;
        z-index: 99;
        margin-top: 60px;
    }

    @media only screen and (min-width: 992px) {
        .m-header {
            display: none;
        }
    }

    @media only screen and (min-width: 768px) {
        .xs-menu,
        .m-detail {
            display: none;
        }
        .md-menu {
            display: block;
        }
    }
</style>