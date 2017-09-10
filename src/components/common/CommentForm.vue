<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" label-position="top" ref="commentForm" class="from-comment">
            <el-form-item label="大名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
                <el-checkbox v-model="ruleForm.reminder">收到回复邮件提醒</el-checkbox>
            </el-form-item>
            <el-form-item :label="labelString" prop="comment" class="comment-text">
                <el-input type="textarea" spellcheck="false" :rows="5" v-model="ruleForm.comment"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="success" @click="submitHandle('commentForm')">提交</el-button>
        <el-button v-show="replyUserName" type="danger" @click="cancleHandle('commentForm')">取消</el-button>
    </div>
</template>

<script>
    export default {
        name: 'CommentForm',
        props: ['replyUserId', 'replyUserName'],
        data() {
            return {
                label: '留言',
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
                        { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    comment: [
                        { required: true, message: '亲输入你的见解', trigger: 'blur' },
                    ]
                },
            }
        },
        methods: {
            submitHandle(formName) {
                var self = this;
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.$http.post('/api/comment/writeComment', {
                            aid: self.$route.params.id,
                            uid: 8023,
                            uname: self.ruleForm.name,
                            rid: '',
                            rname: '',
                            email: self.ruleForm.email,
                            reminder: self.ruleForm.email ? (self.ruleForm.reminder ? 1 : 0) : 0,
                            content: self.ruleForm.comment
                        }).then((res) => {
                            this.$message.success('提交成功');
                            this.replyUserName ? this.formHanle(false) : false;
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
            cancleHandle(formName) {
                this.$refs[formName].resetFields();
                this.ruleForm.reminder = false;
                this.formHanle(false);
            },
            formHanle(flag) {
                this.$emit('formHanle', flag);
            }
        },
        computed: {
            labelString() {
                return this.label + (this.replyUserName ? ' @' + this.replyUserName : '');
            }
        }
    }
</script>

<style>
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
</style>