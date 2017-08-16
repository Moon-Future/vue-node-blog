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
            <div class="comment-list clearfix" v-for="(comment, i) in comments" :key="i">
                <div class="comment-avatar">
                    <img src="../../../static/images/avatar/head1.jpg" alt="">
                </div>
                <div class="comment-avatar">
                    <div>陈亮</div>
                    <p>{{ comment.txt }}</p>
                    <div>回复</div>
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
                comments: [
                    {
                        time: '',
                        imgSrc: '../../../static/images/avatar/head1.jpg',
                        txt: '很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！',
                    },
                    {
                        imgSrc: '../../../static/images/avatar/head1.jpg',
                        txt: ''
                    },
                    {
                        imgSrc: '../../../static/images/avatar/head1.jpg',
                        txt: ''
                    },
                    {
                        imgSrc: '../../../static/images/avatar/head1.jpg',
                        txt: ''
                    },
                    {
                        imgSrc: '../../../static/images/avatar/head1.jpg',
                        txt: ''
                    }
                ]
            }
        },
        created() {
            var self = this;
            // axios.get('/api/comment/getComment')
			// 	.then((res) => {
            //         console.log('comment', res);
			// 		self.comments = res.data;
			// 	})
			// 	.catch((err) => {
			// 		console.log('err', err);
			// 	});
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
    .clearfix::after {
        content: '';
        display: block;
        clear: both;
    }

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
        border: 1px solid #0db1ff;
        padding: 10px;
        margin-bottom: 20px;
    }

    .comment-avatar {
        float: left;
        margin-right: 10px;
    }

    .comment-avatar img {
        width: 50px;
        height: 50px
    }

    .comment-area {
        float: left
    }
</style>