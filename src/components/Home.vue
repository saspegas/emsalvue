<template>
    <div>
        <Chat></Chat>
    </div>
</template>

<script>
import Chat from './Chat.vue'

export default {
    components: {
        Chat,
    },
    data() {
        return {
            messages: [],
        }
    },
}
</script>

<style>

</style>