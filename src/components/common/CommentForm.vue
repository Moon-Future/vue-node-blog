<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" label-position="top" ref="commentForm" class="from-comment">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
                <el-checkbox v-model="ruleForm.reminder">收到回复邮件提醒</el-checkbox>
            </el-form-item>
            <el-form-item label="大名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="个人网站" prop="website">
                <el-input v-model="ruleForm.website"></el-input>
            </el-form-item>
            <el-form-item :label="labelString" prop="content" class="comment-text">
                <el-input type="textarea" spellcheck="false" :rows="5" v-model="ruleForm.content"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="success" @click="submitHandle('commentForm')">提交</el-button>
        <el-button v-show="replyUserName" type="danger" @click="cancleHandle('commentForm')">取消</el-button>
        <el-dialog
            title="提示：email用户已存在如下信息"
            :visible.sync="dialogVisible"
            size="tiny">
            <span>
                <p><strong>大名：</strong>{{ oriName }}</p>
                <p><strong>个人网站：</strong>{{ oriWebsite }}</p>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="success" @click="updVisitorMes">更新信息</el-button>
                <el-button type="primary" @click="useVisitorMes">使用已存在信息</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'CommentForm',
        props: ['replyUserId', 'replyUserName', 'commentID'],
        data() {
            return {
                label: '留言',
                dialogVisible: false,
                oriName: '',
                oriWebsite: '',
                ruleForm: {
                    name: '',
                    email: '',
                    website: '',
                    reminder: false,
                    content: ''
                },
                rules: {
                    name: [
                        { required: true, message: '亲输入大名', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '亲输入你的见解', trigger: 'blur' },
                    ]
                },
            }
        },
        methods: {
            submitHandle(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.get('/api/visitor/getVisitor', {
                            params: {email: this.ruleForm.email}
                        }).then((res) => {
                            res = res.data;
                            let formData = {
                                aid: this.$route.params.id,
                                uname: this.ruleForm.name.trim(),
                                website: this.ruleForm.website.trim(),
                                rid: this.replyUserId,
                                rname: this.replyUserName,
                                rCommentID: this.replyUserId ? this.commentID : null,
                                email: this.ruleForm.email,
                                reminder: this.ruleForm.email ? (this.ruleForm.reminder ? 1 : 0) : 0,
                                content: this.ruleForm.content
                            }
                            if (res) {
                                if (res.name !== this.ruleForm.name.trim() || (res.website && this.ruleForm.website !== res.website)) {
                                    this.oriName = res.name;
                                    this.oriWebsite = res.website || '';
                                    this.dialogVisible = true;
                                    return;
                                } else {
                                    formData.uid = res.id;
                                }
                            }
                            this.$http.post('/api/comment/writeComment', formData)
                                .then((res) => {
                                    this.$message.success('提交成功');
                                    this.replyUserId ? this.formHanle({show: false, data: res.data}) : this.formHanle({show: true, data: res.data})
                                    this.$refs[formName].resetFields();
                                }).catch((err) => {
                                    throw err;
                                })
                        }).catch((err) => {
                            throw err;
                        })
                    } else {
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
                this.formHanle({show: false});
            },
            formHanle(opt) {
                this.$emit('formHanle', opt);
            },
            updVisitorMes() {
                this.$http.post('/api/visitor/updVisitorMes', {
                    email: this.ruleForm.email,
                    name: this.ruleForm.name,
                    website: this.ruleForm.website
                }).then((res) => {
                    if (res.data) {
                        this.$message.success('更新成功,请再次提交');
                        this.dialogVisible = false;
                    } else {
                        this.$message.error('更新失败');
                    }
                    this.dialogVisible = false;
                }).catch((err) => {
                    throw err;
                })
            },
            useVisitorMes() {
                this.ruleForm.name = this.oriName;
                this.ruleForm.website = this.oriWebsite;
                this.dialogVisible = false;
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