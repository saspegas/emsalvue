```vue
<template>
    <div class="chat-card border border-gray-300 rounded-lg w-full max-w-lg mx-auto flex flex-col h-500px mt-2 sm:mt-4 md:mt-6 lg:mt-8">
        
        <!-- Refresh buttons -->
        <div class="flex justify-end p-2">
            <button @click="getMessages" class="p-2 bg-orange-300 text-white rounded mr-2">Refresh Now</button>
            <button @click="toggleAutoRefresh" :class="{'bg-red-500': autoRefresh, 'bg-blue-500': !autoRefresh}" class="p-2 text-white rounded">
                {{ autoRefresh ? 'Stop Auto Refresh' : 'Auto Refresh' }}
            </button>
        </div>

        <!-- delivered messages -->
        <div v-if="messages.length > 0" ref="messagesContainer" class="flex-1 overflow-y-auto p-4 border-b border-gray-300">
            <Message v-for="(message, index) in messages.slice().reverse()" :key="index" :message="message" />
        </div>
        <div v-else ref="messagesContainer" class="flex-1 p-4 border-b border-gray-300 text-center text-gray-500 dark:text-gray-400">
            No messages yet
        </div>

        <!-- last update time -->
        <div class="text-left text-gray-500 dark:text-gray-400 italic p-2 ml-1">
            Last update: {{ lastUpdateTime }}
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
import axios from '../axios'

export default {
    components: {
        Message,
    },
    data() {
        return {
            messages: [],
            newMessage: '',
            minNewMessageLenght: 10,
            autoRefresh: false,
            lastUpdateTime: '',
        }
    },
    created() {
        this.getMessages();
    },
    mounted() {
        this.scrollToBottom();
    },
    updated() {
        this.scrollToBottom();
    },
    methods: {
        sendMessage() {
            axios.post('/api/messages', {
                content: this.newMessage,
            })
                .then(response => {
                    this.newMessage = '';
                    this.getMessages();
                })
                .catch(error => {
                    console.error(error);
                });
        },
        scrollToBottom() {
            const container = this.$refs.messagesContainer;
            container.scrollTop = container.scrollHeight;
        },
        getMessages() {
            axios.get('/api/messages')
                .then(response => {
                    this.lastUpdateTime = new Date().toLocaleString();
                    this.messages = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        toggleAutoRefresh() {
            if (this.autoRefresh) {
                clearInterval(this.autoRefreshInterval);
            } else {
                this.autoRefreshInterval = setInterval(() => {
                    this.getMessages();
                }, 5000);
            }
            this.autoRefresh = !this.autoRefresh;
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