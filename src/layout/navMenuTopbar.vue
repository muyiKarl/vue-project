<template>
    <div class="main-container">
        <div>
            SIDE_BAR
            <div class="app-body">
                <app-main/>
            </div>
        </div>
    </div>
</template>
<script>
import { AppMain } from './components'

export default {
    name: 'TopBar',
    components: {
        AppMain,
    }
}
</script>
<style scoped>
    
</style>