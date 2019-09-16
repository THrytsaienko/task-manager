<template>
    <div class="add-task">
        <div class="add-task__container">
            <div class="add-task__button-container">
                <div class="add-task__button" @click="returnBack">
                    <img src="../assets/arrow_back_ios.svg" alt="Details" class="add-task__button">
                    Back
                </div>
            </div>
            <div class="add-task__data">
                <h2 class="add-task__title">Create new task</h2>
                <div class="add-task__info">
                    <div class="add-task__inputs">
                        <div class="add-task__block">
                            <div class="add-task__field">
                                <label class="add-task__label">Title</label>
                                <input type="text" v-model="title" class="add-task__input">
                            </div>
                            <div class="add-task__field">
                                <label class="add-task__label">Description</label>
                                <input type="text" v-model="description" class="add-task__input">
                            </div>
                            <div class="add-task__field add-task__field--radio">
                                <div v-for="item in priorityList"
                                     :class="{'active' : priority == item}"
                                     class="add-task__priority"
                                     :key="item" @click="choosePriority(item)">{{item}}</div>
                            </div>
                        </div>
                        <div class="add-task__block">
                            <div class="add-task__field">
                                <label class="add-task__label">Date</label>
                                <Datepicker format="YYYY-MM-DD" width="100%" v-model="date"
                                            class="add-task__datepicker" />
                                <p v-if="error" class="add-task__error">Date can't be in the past!</p>
                            </div>
                        </div>
                    </div>

                    <p v-if="errorMessage" class="add-task__error">{{errorMessage}}</p>

                    <button @click.prevent="save" class="add-task__button add-task__button--save">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import USER_TOKEN from '../utils/utils';

    import Datepicker from 'vuejs-datetimepicker';

    export default {
        name: "add-task",
        components: {
            Datepicker
        },
        data(){
            return {
                title: '',
                description: '',
                priority: '',
                date: null,
                priorityList: [],
                error: false,
                errorMessage: ''
            }
        },
        methods: {
            returnBack(){
                this.$router.push({ name: 'tasks', params: {id: USER_TOKEN } });
            },
            choosePriority(item){
                this.priority = item;
            },
            save(){
                let dateInt = new Date(this.date).getTime()/1000;
                if(dateInt < new Date().getTime()/1000){
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, 5000);
                }
                let reqBody = {
                    title: this.title,
                    dueBy: dateInt,
                    priority: this.priority
                };
                this.$http.post('https://testapi.doitserver.in.ua/api/tasks', reqBody, {
                        headers: {
                            Authorization: `Bearer ${USER_TOKEN}`
                        }
                    })
                    .then(response => {
                        console.log(response);
                        this.$router.push({name: 'tasks', params: {id: USER_TOKEN }});
                    }).catch(error => {
                        console.log(error);
                        if(error.status == 422){
                            this.errorMessage = error.body.fields.title.toString();
                        }
                        if(error.status == 403){
                            this.errorMessage = error.body.fields.title.toString();
                        }
                        setTimeout(() => {
                            this.errorMessage = false;
                        }, 5000);
                    })
            }
        },
        created() {
            this.priorityList = this.$store.state.priorityList;
        }
    }
</script>

<style scoped lang="stylus">
    .add-task {
        &__container {
            width 100%
            max-width 900px
            margin 0 auto
        }

        &__button-container {
            display inline-block
            cursor pointer
            transition .2s ease-in
            margin-bottom 20px

            &:hover {
                transform scale(1.2)
            }
        }

        &__error {
            font-size 12px
            color red
            margin 10px 0
        }

        &__button {
            display flex
            align-items center

            &--save {
                justify-content center
                border none
                outline none
                width 100%
                max-width 200px
                text-transform uppercase
                padding 10px 15px
                font-size 15px
                font-weight bold
                border-radius 3px
                color #ffffff
                background-color #00a2a2
                cursor pointer

                &:hover {
                    background-color darkcyan
                }
            }
        }

        &__title {
            margin-bottom 15px
        }

        &__info {
            background-color #fff
            padding 30px
        }

        &__inputs {
            display flex
            justify-content space-between
        }

        &__block {
            width 48%
        }

        &__field {
            width 100%

            &--radio {
                display flex
            }
        }

        &__label {
            font-size 15px
            font-weight bold
        }

        &__input {
            margin-top 10px
            border 1px solid #e9e9e9
            width 100%
            padding 10px 0
            text-indent 10px
        }

        &__datepicker {
            margin-top 10px
            div {
                input {
                    height 40px
                }
            }
        }

        &__field {
            margin-bottom 40px
        }

        &__priority {
            padding 5px 20px
            background-color #d9dad9
            border-radius 2px
            cursor pointer

            &:not(:last-child){
                margin-right 15px
            }

            &.active {
                background-color #00a2a2
                color #ffffff
            }
        }
    }
</style>
