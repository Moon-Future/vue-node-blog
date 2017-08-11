<template>
    <div>
        <vHeader></vHeader>
        <vSidebar></vSidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
        <my-upload field="img"
            v-model="show"
            url="/upload"
            :params="params"
            :headers="headers"
            img-format="png"></my-upload>
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
                imgDataUrl: '../../../../static/images/head2.jpg',
                show: true,
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    smail: '*_~'
                },
            }
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
