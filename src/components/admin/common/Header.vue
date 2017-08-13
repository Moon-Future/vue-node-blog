<template>
    <div class="header">
        <el-row>
            <el-col class="logo" :md="5" :sm="8" :xs="12">
                <i class="iconfont icon-diannaoyushouji"></i>
                <p>后台管理</p>
            </el-col>

            <el-col class="hello" :md="5" :sm="8">
                <p class="time">{{ currentTime }}</p>
                <p class="inform">夜深了，注意休息</p>
            </el-col>

            <el-col :md="4" :offset="2" class="search">
                <el-input icon="search"></el-input>
            </el-col>

            <el-col :md="8" :sm="8" :xs="12" class="right">
                <el-dropdown trigger="click" class="notice">
                    <el-badge is-dot>陈亮</el-badge>
                    <el-dropdown-menu>
                        <el-dropdown-item><el-badge :value="12">评论</el-badge></el-dropdown-item>
                        <el-dropdown-item><el-badge :value="9">阅读</el-badge></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-dropdown trigger="click" class="user-infor">
                    <img :src="imgAvatar" alt="">
                    <el-dropdown-menu>
                        <el-dropdown-item @click.native="uploadDisplay">更改头像</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown> 
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'Header',
        props: ['imgAvatar'],
        data() {
            return {
                name: '假面',
                time: '2017-08-09',
            }
        },
        methods:{
            uploadDisplay() {
                this.$emit('uploadDisplay', true);
            }
        },
        computed: {
            currentTime() {
                return this.timeFormat(new Date().getTime());
            },
        }
    }
</script>
<style scoped>
    .header {
        position: fixed;
        box-sizing: border-box;
        width: 100%;
        font-size: 14px;
        background-color:#00cccc;
        box-shadow:2px 0 3px rgba(0,0,0,.5);
        color: #fff;
        padding: 0 40px;
        line-height: 70px;
        height: 70px;
    }
    .header p {
        margin: 0;
    }
    .logo i {
        font-size: 60px;
        float: left
    }
    .logo p {
        font-size: 20px;
    }
    .hello {
        line-height: 35px;
        text-align: center;
        display: none;
    }

    .search {
        display: none;
    }

    .right {
        text-align: right;
    }

    .notice {
        margin-right: 25px;
        color: #fff;
        font-size: 20px;
        line-height: 30px;
        cursor: pointer;
    }

    .user-infor img {
        height: 40px;
        width: 40px;
        position: relative;
        top: 15px;
        border-radius: 50%;
        cursor: pointer;
    }

    @media only screen and (min-width: 992px) {
		.search {
			display: block
		}
	} 
    @media only screen and (min-width: 768px) {
		.hello {
			display: block
		}
	}
    @media only screen and (max-width: 768px) {
		.logo i {
            font-size: 30px;
            float: left
        }
        .notice {
            /* font-size: 16px; */
            margin-right: 10px;
        }
        .header {
            padding: 0 20px;
        }
	}
</style>
