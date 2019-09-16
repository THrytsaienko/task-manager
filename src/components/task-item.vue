<template>
    <div class="item">
        <p class="cell">{{task.title}}</p>
        <p class="cell">{{dueDate}}</p>
        <p class="cell">{{task.priority}}</p>
        <div class="cell">
            <img src="../assets/arrow_forward_ios.svg" alt="Details" @click="openDetails(task.id)"
            class="item__button">
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "task-item",
        props: {
            task: Object
        },
        computed: {
            dueDate(){
                return moment(this.task.dueBy*1000).format('L');
            }
        },
        methods: {
            openDetails(id){
                this.$router.push({name: 'task', params: {id: id}});
            }
        }
    }
</script>

<style scoped lang="stylus">
    .item {
        display flex
        justify-content space-between
        padding 15px 0

        &__button {
            cursor pointer
            transition .2s ease-in

            &:hover {
                transform scale(1.2)
            }
        }
    }
</style>
