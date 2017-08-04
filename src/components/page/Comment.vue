<template>
	<div class="article-comment">
        <el-form :model="ruleForm" :rules="rules" label-position="top" class="from-comment">
            <el-form-item label="大名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="留言" prop="comment" class="comment-item">
                <el-input type="textarea" spellcheck="false" :rows="5" v-model="ruleForm.comment"></el-input>
            </el-form-item>
        </el-form>
        <el-button type="success">提交</el-button>
        <div class="comment-detail">
            评论
        </div>
	</div>
</template>

<script>
	export default {
        name: 'comment',
        data() {
            return {
                ruleForm: {
                    name: '',
                    email: '',
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
                }
            }
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
</style>