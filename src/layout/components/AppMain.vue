<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive>
                <router-view />
            </keep-alive>
        </transition>
    </section>
</template>
<script>
export default {
    name: 'AppMain',
    computed: {
    },
    created() {
        // eslint-disable-next-line no-console
        console.log(this.$route);
    }
}
</script>
<style scoped>

</style>