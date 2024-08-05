<template>
    <div class="flex items-start">
        <div class="flex flex-col w-full leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 mt-2">
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
                <span class="text-sm font-semibold italic text-gray-900 dark:text-white">{{ message.user.name }}</span>
            </div>
            <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{{ message.content }}</p>
                <span class="text-sm font-normal text-gray-500 dark:text-gray-400 text-right">
                {{ new Date(message.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
            </span>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        message: {
            type: Object,
            default: () => ({}),
        },
    },
}
</script>

<style></style>