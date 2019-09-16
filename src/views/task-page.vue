<template>
    <div>
        <SingleTask :id="id" />
    </div>
</template>

<script>
    import SingleTask from '@/components/single-task.vue';

    export default {
        name: "task-page",
        props: {
            id: Number
        },
        components: {
            SingleTask
        }
    }
</script>

<style scoped>

</style>
