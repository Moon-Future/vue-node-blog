<template>
    <div>
        <vHeader :imgAvatar="imgDataUrl" @uploadDisplay="uploadHandle"></vHeader>
        <vSidebar></vSidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
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
                name: '假面',
                time: '2017-08-09',
                uploadShow: false,
                imgDataUrl: '../../../../static/images/avatar/head2.jpg',
                params: {
                    token: '123456798',
                    name: 'avatar'
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
                console.log('-------- upload success --------');
                this.imgDataUrl = jsonData;
            }
        },
        created() {
            this.$http.get('/api/user/getUserAll')
				.then((res) => {
                    console.log('res', res);
                    this.imgDataUrl = '../../../../static/images/avatar/' + res.data[0].avatar
				})
				.catch((err) => {
					console.log('err', err);
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
