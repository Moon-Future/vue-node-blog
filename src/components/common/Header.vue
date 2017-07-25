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
@import url("../../../static/css/header.css");
</style>