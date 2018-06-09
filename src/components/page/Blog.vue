<template>
    <div>
        111
    </div>
</template>

<script>
    export default {
        name: 'blog',
        data() {
            return {
                switchType: true,
                avatar: 'head2.jpg'
            }
        },
        components: {
            
        },
        created() {

        },
        methods: {
            
        },
        computed: {
            
        }
    }
    
</script>

<style scoped>
    .blog-content {
        position: absolute;
        right: 0;
        box-sizing: border-box;
        padding: 20px 10%;
        width: 80%;
        height: 100%;
        /* background: #EBEBEB; */
        overflow-y: auto;
        /* background: url(../../../static/images/bg1.jpg) no-repeat; */
        background: #f5f5f5;
        background-size: cover;
    }
    @media only screen and (max-width: 992px) {
        .blog-content {
            width: 100%;
            padding: 20px;
        }
        .switch-type {
            display: none;
        }
    }
    @media only screen and (min-width: 992px) {
        .blog-content {
            width: 80%;
            height: 100%;
        }
    }
    .blog-header {
        padding: 20px;
        margin-bottom: 10px;
        margin-top: -20px;
    }
    .breadcrumb {
        float: left;
    }
    .switch-type {
        float: right;
        cursor: pointer;
    }
</style>