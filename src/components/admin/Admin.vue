<template>
    <div>
        <vHeader :userAvatar="userData.avatar" :userName="userData.name" @uploadDisplay="uploadHandle"></vHeader>
        <vSidebar></vSidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view :userRoot="userData.root"></router-view></transition>
        </div>
        <my-upload field="avatar"
            :width="200"
            :height="200"
            v-model="uploadShow"
            url="api/picture/avatar"
            :params="params"
            :headers="headers"
            @crop-upload-success="cropUploadSuccess"
            img-format="jpg"></my-upload>
    </div>
</template>

<script>
    import vHeader from './common/Header'
    import vSidebar from './common/Sidebar'
    import myUpload from 'vue-image-crop-upload';
    export default {
        name: 'Admin',
        components: {
           vHeader,
           vSidebar,
           myUpload
        },
        data() {
            return {
                avatarRoot: '../../../../static/images/avatar/',
                userData: {
                    id: 8023,
                    name: '假面',
                    avatar: '../../../../static/images/avatar/head2.jpg',
                },
                uploadShow: false,
                params: {
                    // token: '123456798',
                    // name: 'avatar',
                },
                headers: {
                    smail: '*_~'
                },
            }
        },
        methods: {
            uploadHandle(data) {
                this.uploadShow = data;
            },
            cropUploadSuccess(jsonData, field) {
                this.$message.success('上传成功！');
                this.userData.avatar = this.avatarRoot + jsonData;
            }
        },
        beforeCreate() {
            this.$http.get('/api/getSession')
                .then((res) => {
                    res = res.data;
                    res === false ? this.$router.push('/login') : this.userData = JSON.parse(JSON.stringify(res));
                    this.userData.avatar = this.avatarRoot + res.avatar;
                    this.params.userID = res.id;
                    this.params.userAvatar = res.avatar;
                })
                .catch((err) => {
                    throw err;
                });
        }
    }
</script>

<style>
    .content {
        background: none repeat scroll 0 0 #fff;
        position: absolute;
        left: 250px;
        right: 0;
        top: 70px;
        bottom:0;
        width: auto;
        padding: 40px;
        box-sizing: border-box;
        overflow-y: scroll;
    }
    .crumbs{
        margin-bottom: 20px;
    }
    @media only screen and (max-width: 768px) {
        .content {
            left: 0;
            padding: 20px;
        }
    }
</style>
