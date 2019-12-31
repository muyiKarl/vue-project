<template>
    <div class="app-wrapper">
        <top-bar v-if="false" />
        <side-bar />
    </div>
</template>
<script>
import TopBar from './navMenuTopbar'
import SideBar from './navMenuSidebar'
export default {
    name: 'Layout',
    components: {
        TopBar,
        SideBar
    }
}
</script>
<style scoped>

</style>