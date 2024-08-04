<template>
    <div>
        <Chat :messages="messages"></Chat>
    </div>
</template>

<script>
import axios from '../axios'
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
    async mounted() {
        console.log('Dashboard component mounted.')
        const res = await axios.get('/api/messages');
        this.messages = res.data.data
    }
}
</script>

<style>

</style>