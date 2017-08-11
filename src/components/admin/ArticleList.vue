<template>
    <div class="list">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>Article</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-table :data="articles" border style="width:100%">
            <el-table-column prop="id" label="ID" width="100"></el-table-column>
            <el-table-column prop="title" label="标题" width="300"></el-table-column>
            <el-table-column prop="tags" label="标签" width="200" :filters="tags" :filter-method="filterTag" filter-placement="bottom-end">
                <template scope="scope">
                    <el-tag v-for="tag in scope.row.tags" :key="tag.id" type="primary">{{ tag.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="发表时间" width="200">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.post_time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="更改时间" width="200">
                <template scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.upd_time }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="view" label="浏览" width="100"></el-table-column>
            <el-table-column prop="start" label="点赞" width="100"></el-table-column>
            <el-table-column prop="state" label="状态" width="80">
                <template scope="scope">
                    <span v-if="scope.row.state" style="color:#13ce66">已发布</span>
                    <span v-else style="color:#8391a5">暂存稿</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="200">
                <template scope="scope">
                    <el-button size="small" type="primary">编辑</el-button>
                    <el-button size="small" type="warning" v-if="scope.row.state">存稿</el-button>
                    <el-button size="small" type="success" v-if="!scope.row.state">发布</el-button>
                    <el-button size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'ArticleList',
        data() {
            return {
                articles: [],
                tags: []
            }
        },
        created() {
            this.$http.get('/api/article/getArticleAll')
				.then((res) => {
					this.articles = res.data;
					this.articles.map((article) => {
                        article.post_time = this.timeFormat(article.post_time);
                        article.upd_time = article.upd_time == '' ? '暂无修改' : this.timeFormat(article.upd_time);
                    })
                    console.log('11', this.articles);
				})
				.catch((err) => {
					console.log('err', err);
                });
            this.$http.get('/api/tag/getTagAll')
				.then((res) => {
                    this.tags = res.data;
                    this.tags.map((tag) => {
                        tag.text = tag.name;
                        tag.value = tag.id;
                    })
				})
				.catch((err) => {
					console.log('err', err);
				});	
        },
        methods: {
            filterTag(value, row) {
                let flag = false;
                for(let i = 0, len = row.tags.length; i < len; i++){
                    if(row.tags[i].id == value){
                        flag = true;
                        return row.tags;
                    }
                }
            }
        }
    }
</script>

<style>
    span.el-tag {
        margin-right: 5px;
    }
</style>
