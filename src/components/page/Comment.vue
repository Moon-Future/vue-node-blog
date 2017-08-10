<template>
	<div class="article-comment">
        <el-form :model="ruleForm" :rules="rules" label-position="top" ref="commentForm" class="from-comment">
            <el-form-item label="大名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
                <el-checkbox v-model="ruleForm.reminder">收到回复邮件提醒</el-checkbox>
            </el-form-item>
            <el-form-item label="留言" prop="comment" class="comment-item">
                <el-input type="textarea" spellcheck="false" :rows="5" v-model="ruleForm.comment"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="success" @click="submitHandle('commentForm')">提交</el-button>
        <div class="comment-detail">
            <div class="comment-count">评论：（共{{ comments.length }}条）</div>
            <div class="comment-list">
                <div class="comment-area">
                    <div><img src="" alt="头像"></div>
                    <div>
                        22
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
    import axios from 'axios'
	export default {
        name: 'comment',
        data() {
            return {
                ruleForm: {
                    name: '',
                    email: '',
                    reminder: false,
                    comment: ''
                },
                rules: {
                    name: [
                        { required: true, message: '亲输入大名', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    comment: [
                        { required: true, message: '亲输入你的见解', trigger: 'blur' },
                    ]
                },
                comments: ''
            }
        },
        created() {
            var self = this;
            axios.get('/api/comment/getComment')
				.then((res) => {
                    console.log('comment', res);
					self.comments = res.data;
				})
				.catch((err) => {
					console.log('err', err);
				});
        },
        methods: {
            submitHandle(formName) {
                var self = this;
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        axios.post('/api/comment/writeComment', {
                            name: self.ruleForm.name,
                            email: self.ruleForm.email,
                            reminder: self.ruleForm.email ? (self.ruleForm.reminder ? 1 : 0) : 0,
                            text: self.ruleForm.comment,
                            aid: 2
                        }).then((res) => {
                            this.$message.success('提交成功');
                        }).catch((err) => {
                            throw err;
                        })
                    }else {
                        this.$message({
                            showClose: true,
                            message: '数据有误，提交失败',
                            type: 'error'
                        });
                        return false;
                    }
                })
            },
        }
	}
</script>

<style scoped>
	.article-comment{
        margin-top: 10px;
		padding: 20px;
		background: #fff;
	}

    .from-comment {
        width: 300px;
    }

    .comment-item {
        width: 600px;
    }

    @media only screen and (max-width: 768px) {
		.from-comment, .comment-item {
            width: 100%;
        }
	}

    .comment-detail {
        border-top: 1px solid #ccc;
        margin-top: 60px; 
        padding-top: 20px
    }

    .comment-count {
        margin-bottom: 20px;
    }

    .comment-list {
        /* border: 1px solid #ccc; */
        /* height: 50px; */
    }

    .comment-area {
        border: 1px solid #ccc;
        height: 200px;
    }
</style>