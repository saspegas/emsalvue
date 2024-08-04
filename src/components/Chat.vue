```vue
<template>
    <div class="chat-card border border-gray-300 rounded-lg w-full max-w-lg mx-auto flex flex-col h-500px mt-2 sm:mt-4 md:mt-6 lg:mt-8">
        
        <!-- delivered messages -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 border-b border-gray-300">
            <Message v-for="(message, index) in messages.slice().reverse()" :key="index" :message="message" />
        </div>

        <!-- new message card -->
        <div class="input-container flex p-2 border-t border-gray-300">
            <input 
                v-model="newMessage" 
                @keyup.enter="sendMessage" 
                placeholder="Type a message..." 
                class="flex-1 p-2 border border-gray-300 rounded mr-2" 
            />
            <button 
                @click="sendMessage" 
                :disabled="newMessage.length < minNewMessageLenght"
                :class="{ 'text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed rounded-lg text-center': newMessage.length < minNewMessageLenght }"
                class="p-2 bg-blue-500 text-white rounded"
            >
                Send
            </button>
        </div>
    </div>
</template>

<script>
import Message from './Message.vue'

export default {
    components: {
        Message,
    },
    props: {
        messages: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            newMessage: '',
            minNewMessageLenght: 10,
        }
    },
    mounted() {
        this.scrollToBottom();
    },
    updated() {
        this.scrollToBottom();
    },
    methods: {
        sendMessage() {
            // sen message logic
        },
        scrollToBottom() {
            const container = this.$refs.messagesContainer;
            container.scrollTop = container.scrollHeight;
        }
    }
}
</script>

<style>
.container {
    height: 100vh;
}
.chat-card {
    max-height: 500px;
}
</style>