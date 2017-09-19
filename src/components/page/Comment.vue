<template>
    <div class="article-comment">
        <commentForm v-if="commentFormShow"></commentForm>
        <div class="comment-detail">
            <div class="comment-count">评论：（共 {{ commentLen }} 条）</div>
            <div class="comment-list clearfix" v-for="(comment, key) in comments" :key="key">
                <div class="comment-psn">
                    <img src="../../../static/images/avatar/head1.jpg" alt="">
                    <div class="psn-mes">
                        <p :class="{highlight:isHighLight}">{{ comment.user_name }}</p>
                        <p>{{ comment.time }}</p>
                    </div>
                </div>
                <p>{{ comment.content }}</p>
                <div class="comment-btn">
                    <span>支持</span>
                    <span @click="replyHandle(key, comment.user_id, comment.user_name)">回复</span>
                </div>
                <div class="reply" v-if="comment.replys">
                    <p v-for="(reply, i) in comment.replys" :key="i">
                        <span class="reply-psn" :class="{highlight:isHighLight}" @click="replyHandle(key, reply.user_id, reply.user_name, $event)">{{ reply.user_name }} </span>
                        <span v-if="reply.reply_name">回复
                            <span class="reply-psn" :class="{highlight:isHighLight}" @click="replyHandle(key, reply.reply_id, reply.reply_name, $event)">{{ reply.reply_name }}</span>
                        </span>: 
                        {{ reply.content }}
                    </p>
                </div>
                <commentForm :replyUserId="replyUserId" :replyUserName="replyUserName" @formHanle="formShowState" v-if="comment.replyFormShow" style="padding: 10px;margin: 10px 0;border: 1px dotted #ccc;background: #fff;"></commentForm>
            </div>
        </div>
    </div>
</template>

<script>
    import commentForm from '../common/CommentForm'
    export default {
        name: 'comment',
        components: {
            commentForm
        },
        data() {
            return {
                replyUserId: '',
                replyUserName: '',
                commentFormShow: true,
                isHighLight: false,
                comments: [],
                commentLen: 0
            }
        },
        created() {
            var self = this, articleID = this.$route.params.id;
            this.$http.get('/api/comment/getComment', { 
                params: {articleID: articleID}
            }).then((res) => {
                self.comments = res.data.data;
                self.commentLen = res.data.len;
                for(let key in self.comments){
                    self.comments[key].replyFormShow = false;
                }
            }).catch((err) => {
                console.log('err', err);
            });
        },
        methods: {
            replyHandle(key, replyId, replyName, event) {
                for (let i in this.comments) {
                    // this.comments[i].replyFormShow = i == key ? true : false;
                    // this.$set(this.comments[i], 'replyFormShow', i == key ? true : false);
                    // 对象更改检测注意事项 https://cn.vuejs.org/v2/guide/list.html#对象更改检测注意事项
                    this.comments[i] = Object.assign({}, this.comments[i], {
                        replyFormShow: i == key ? true : false
                    })
                    i == key ? (this.replyUserId = replyId, this.replyUserName = replyName) : false;
                }
                this.commentFormShow = false;
            },
            formShowState(opt) {
                console.log('opt', opt);
                let show = opt.show, newComment = opt.data;
                // if (!show) {
                //     for(let i in this.comments){
                //         this.comments[i] = Object.assign({}, this.comments[i], {
                //             replyFormShow: false
                //         })
                //     }
                //     this.commentFormShow = true;
                // }
                // if (newComment) {
                //     if (newComment.rid) {
                //         this.comments[newComment.rCommentID].replys.push(newComment);
                //     } else {
                //         this.comments.push(newComment);
                //         this.commentLen += 1;
                //     }
                // }
                console.log('comments', this.comments);
            }
        },
        computed: {
           
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

    .comment-list span.highlight, p.highlight {
        color: red;
        font-weight: bold;
    }
</style>