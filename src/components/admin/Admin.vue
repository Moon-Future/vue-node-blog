<template>
    <div>
        <vHeader></vHeader>
        <vSidebar></vSidebar>
        <div class="content">
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHeader from './common/Header'
    import vSidebar from './common/Sidebar'
    export default {
        name: 'Admin',
        components: {
           vHeader,
           vSidebar
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
        padding:40px;
        box-sizing: border-box;
        overflow-y: scroll;
    }
    .crumbs{
        margin-bottom: 20px;
    }
    @media only screen and (max-width: 768px) {
		.content {
            left: 0;
        }
	}
</style>
