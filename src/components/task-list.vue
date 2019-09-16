<template>
    <div class="task-list">
        <div class="task-list__header">
            <div class="cell task-list__item" @click="sort('title')">
                Title
                <img src="../assets/arrows.svg" alt="Sort">
            </div>
            <div class="cell task-list__item" @click="sort('dueBy')">
                Date
                <img src="../assets/arrows.svg" alt="Sort">
            </div>
            <div class="cell task-list__item" @click="sort('priorityNumber')">
                Priority
                <img src="../assets/arrows.svg" alt="Sort">
            </div>
            <div class="cell"></div>
        </div>

        <div v-for="task in sortedData" :key="task.id">
            <TaskItem :task="task" />
        </div>
    </div>
</template>

<script>
   import TaskItem from '@/components/task-item.vue';
    export default {
        name: 'task-list',
        props: {
            tasks: Array
        },
        components: {
            TaskItem
        },
        data(){
            return {
                sortBy: 'title',
                sortDir: 'asc'
            }
        },
        computed: {
            sortedData () {
                if(this.tasks) {
                    return this.tasks.sort((a,b) => {
                        const asc = 1;
                        const desc = -1;
                        let modifier = this.sortDir === 'desc' ? desc : asc;

                        if(this.isDate(this.sortBy) || this.isPriority(this.sortBy)){
                            return a[this.sortBy] < b[this.sortBy]
                                ? desc * modifier
                                : asc * modifier;
                        } else {
                            return (a[this.sortBy]).toLowerCase() < (b[this.sortBy]).toLowerCase()
                                ? desc * modifier
                                : asc * modifier;
                        }
                    });
                }
            }
        },
        methods: {
            sort(sortKey){
                if(sortKey === this.sortBy) {
                    this.sortDir = this.sortDir==='asc'?'desc':'asc';
                }
                this.sortBy = sortKey;
            },
            isDate(fieldName){
                return fieldName === "dueBy";
            },
            isPriority(fieldName){
                return fieldName === "priorityNumber";
            }
        }
    }
</script>

<style scoped lang="stylus">
    .task-list {
        width 100%
        max-width 900px

        &__header {
            display flex
            justify-content space-between
            padding 15px 0
            border-bottom 1px solid #dedfde
            font-weight bold
        }

        &__item {
            cursor pointer
        }

        &__buttons {
            display flex
            justify-content space-around
            margin-top 50px

            @media screen and (max-width: 550px)  {
                flex-direction column
                max-width 120px
                align-items center
                margin 0 auto
            }
        }

        &__btn {
            margin-bottom 0

            @media screen and (max-width: 550px)  {
                &:not(:last-child) {
                    margin-bottom 0
                }
            }
        }
    }
</style>
