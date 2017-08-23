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
            <el-form-item label="留言" prop="comment" class="comment-text">
                <el-input type="textarea" spellcheck="false" :rows="5" v-model="ruleForm.comment"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="success" @click="submitHandle('commentForm')">提交</el-button>
        <div class="comment-detail">
            <div class="comment-count">评论：（共{{ comments.length }}条）</div>
            <div class="comment-list clearfix" v-for="(comment, i) in comments" :key="i">
                <div class="comment-psn">
                    <img src="../../../static/images/avatar/head1.jpg" alt="">
                    <div class="psn-mes">
                        <p>陈亮</p>
                        <p>2017-08-23 08:18</p>
                    </div>
                </div>
                <p>{{ comment.txt }}</p>
                <div class="comment-btn">
                    <span>支持</span>
                    <span>回复</span>
                </div>
                <div class="reply">
                    <p v-for="(reply, i) in replys" :key="i">
                        <span class="reply-psn">陈亮 </span>
                        <span v-if="reply.nam2">回复
                            <span class="reply-psn">魏茹月</span>
                        </span>: 
                        {{ reply.txt }}
                    </p>
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
                ],
                replys: [
                    {
                        txt: '很不错哟，继续努力哟！',
                        nam1: '陈亮',
                        // nam2: '魏茹月'
                    },
                    {
                        txt: '很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！很不错哟，继续努力哟！',
                        nam1: '陈亮',
                        nam2: '魏茹月'
                    },
                    {
                        txt: '很不错哟，继续努力哟！',
                        nam1: '陈亮',
                        // nam2: '魏茹月'
                    },
                    {
                        txt: '很不错哟，继续努力哟！',
                        nam1: '陈亮',
                        nam2: '魏茹月'
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

    .comment-text {
        width: 600px;
    }

    @media only screen and (max-width: 768px) {
		.from-comment, .comment-text {
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


    .comment-psn img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        float: left;
    }

    .comment-psn .psn-mes {
        height: 35px;
        line-height: 20px;
        margin-left: 45px;
    }

    .comment-psn .psn-mes p, .comment-btn {
        padding: 0;
        margin: 0;
        font-size: .5em;
    }
    
    .comment-btn span {
        margin-right: 10px;
        cursor: pointer;
    }

    .reply {
        background: #C0CCDA;
        padding: 10px;
        margin-top: 5px;
    }

    .reply p {
        margin: 0;
        font-size: .5em;
        padding: 3px 0;
    }
    .reply .reply-psn {
        color: #1D8CE0;
        cursor: pointer;
    }
</style>