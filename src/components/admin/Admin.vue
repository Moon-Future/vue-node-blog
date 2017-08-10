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

