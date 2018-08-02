<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" label-position="top" ref="commentForm" class="from-comment">
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" :disabled="login"></el-input>
        <el-checkbox v-model="ruleForm.reminder" v-if="!login">收到回复邮件提醒</el-checkbox>
      </el-form-item>
      <el-form-item label="大名" prop="name">
        <el-input v-model="ruleForm.name" :disabled="login"></el-input>
      </el-form-item>
      <el-form-item label="个人网站" prop="website">
        <el-input v-model="ruleForm.website" :disabled="login"></el-input>
      </el-form-item>
      <el-form-item :label="labelString" prop="content" class="comment-text">
        <el-input type="textarea" spellcheck="false" :rows="5" v-model="ruleForm.content"></el-input>
      </el-form-item>
    </el-form>
    <el-checkbox v-model="remember" v-if="!login" style="display:block;margin-bottom:5px;width:0">记住我？</el-checkbox>
    <el-button type="success" @click="submitHandle('commentForm')">提交</el-button>
    <el-button v-show="replyUserName" type="danger" @click="cancleHandle('commentForm')">取消</el-button>
    <el-dialog
      title="提示：email用户已存在如下信息"
      :visible.sync="dialogVisible">
      <span>
        <p><strong>大名：</strong>{{ oriName }}</p>
        <p><strong>个人网站：</strong>{{ oriWebsite }}</p>
        <p><el-checkbox v-model="oriReminder" :disabled="true">收到回复邮件提醒</el-checkbox></p>
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
        login: false,
        dialogVisible: false,
        oriName: '',
        oriWebsite: '',
        oriReminder: false,
        remember: false,
        ruleForm: {
          name: '',
          email: '',
          website: '',
          avatar: '',
          reminder: false,
          content: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入大名', trigger: 'blur' },
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
                avatar: this.ruleForm.avatar,
                rid: this.replyUserId,
                rname: this.replyUserName,
                rCommentID: this.replyUserId ? this.commentID : null,
                email: this.ruleForm.email,
                content: this.ruleForm.content,
                reminder: this.ruleForm.email ? (this.ruleForm.reminder ? 1 : 0) : 0,
                time: new Date().getTime()
              }
              if (res) {
                res.reminder = res.reminder === 1 ? true : false;
                if (res.name !== this.ruleForm.name.trim() || res.reminder !== this.ruleForm.reminder || (res.website && this.ruleForm.website !== res.website)) {
                  this.oriName = res.name;
                  this.oriWebsite = res.website || '';
                  this.oriReminder = res.reminder;
                  this.dialogVisible = true;
                  return;
                } else {
                  formData.uid = res.id;
                  formData.avatar = res.avatar;
                }
              }
              this.$http.post('/api/comment/writeComment', formData)
                .then((res) => {
                  this.$message.success('提交成功');
                  this.replyUserId ? this.formHanle({show: false, data: res.data}) : this.formHanle({show: true, data: res.data});
                  if (this.remember) {
                    let visitorMes = {
                      email: this.ruleForm.email,
                      name: this.ruleForm.name.trim(),
                      website: this.ruleForm.website.trim(),
                      reminder: this.ruleForm.reminder,
                      remember: this.remember
                    }
                    localStorage.visitorMes = JSON.stringify(visitorMes);
                  } else {
                    delete localStorage.visitorMes;
                  }
                  this.ruleForm.content = '';
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
        if (this.login) { return; }
        this.$http.post('/api/visitor/updVisitorMes', {
          email: this.ruleForm.email,
          name: this.ruleForm.name.trim(),
          website: this.ruleForm.website.trim(),
          reminder: this.ruleForm.email ? (this.ruleForm.reminder ? 1 : 0) : 0,
        }).then((res) => {
          if (res.data) {
            this.$message.success('更新成功,请再次提交');
            this.dialogVisible = false;
          } else {
            this.$message.error('更新失败,请更换eamil');
          }
          this.dialogVisible = false;
        }).catch((err) => {
          throw err;
        })
      },
      useVisitorMes() {
        this.ruleForm.name = this.oriName;
        this.ruleForm.website = this.oriWebsite;
        this.ruleForm.reminder = this.oriReminder;
        this.dialogVisible = false;
      }
    },
    computed: {
      labelString() {
        return this.label + (this.replyUserName ? ' @' + this.replyUserName : '');
      }
    },
    created() {
      let visitorMes = localStorage.visitorMes && JSON.parse(localStorage.visitorMes);
      if (visitorMes) {
        this.ruleForm.name = visitorMes.name;
        this.ruleForm.email = visitorMes.email;
        this.ruleForm.website = visitorMes.website;
        this.ruleForm.reminder = visitorMes.reminder;
        this.remember = visitorMes.remember;
      }
      this.$http.get('/api/getSession')
        .then((res) => {
          res = res.data;
          if (res && res.root === 1) {
            this.ruleForm.name = res.name;
            this.ruleForm.email = res.email;
            this.ruleForm.website = res.website || '';
            this.ruleForm.avatar = res.avatar;
            this.login = true;
          }
        })
        .catch((err) => {
          throw err;
        });
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