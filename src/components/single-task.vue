<template>
    <div class="details">
        <div class="details__container">
            <div class="details__button-container">
                <div class="details__button" @click="returnBack">
                    <img src="../assets/arrow_back_ios.svg" alt="Details" class="details__button">
                    Back
                </div>
            </div>
            <div class="details__data">
                <h2 class="details__title">Task details</h2>
                <div class="details__info">
                    <div class="details__header">
                        <p class="cell">Title</p>
                        <p class="cell">Priority</p>
                        <p class="cell">Date</p>
                        <p class="cell details__actions">Actions</p>
                    </div>
                    <div class="details__task">
                        <p  ref="editable"
                            :contenteditable="!task.disabled"
                            @blur="updateElement($event, 'title')"
                            @keydown.enter.prevent
                            :disabled="task.disabled"
                            class="details__input cell"
                            :class="{'disabled' : task.disabled}"
                        >
                            {{task.title}}
                        </p>
                        <div class="cell">
                            <select v-model="task.priority" :disabled="task.disabled" class="details__input">
                                <option v-for="item in priorityList" :key="item">{{item}}</option>
                            </select>
                        </div>
                        <p v-if="task.disabled" class="cell details__date">{{dueDate}}</p>
                        <div class="cell" v-else>
                            <Datepicker format="YYYY-MM-DD" width="100%" v-model="date"
                                        class="details__datepicker" />
                            <p v-show="error" class="details__error">Date can't be in the past!</p>
                        </div>

                        <div class="cell details__actions">
                            <div class="details__button" @click="editItem(task, true)" v-if="!task.disabled">
                                <div class="details__button">
                                    <img src="../assets/floppy-o.svg" alt="Edit" class="details__icon">
                                </div>
                            </div>

                            <div class="details__button" @click="editItem(task)" v-else>
                                <div class="details__image">
                                    <img src="../assets/edit.svg" alt="Edit" class="details__icon">
                                </div>
                            </div>
                            <div class="details__button" @click="deleteTask(task.id)">
                                <div class="details__image">
                                    <img src="../assets/trash-o.svg" alt="Delete" class="details__icon">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="details__description">
                        <p class="details__subtitle">Description</p>
                        <p class="details__text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A asperiores facere fuga labore magni quae reiciendis repellat veniam voluptatibus! Laboriosam.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import USER_TOKEN from '../utils/utils';
    import moment from 'moment';
    import Datepicker from 'vuejs-datetimepicker';

    export default {
        name: "single-task",
        props: {
            id: Number
        },
        components: {
            Datepicker
        },
        data(){
            return {
                task: null,
                deleted: false,
                priorityList: [],
                date: null,
                error: false
            }
        },
        computed: {
            dueDate(){
                return moment(this.task.dueBy*1000).format('L');
            }
        },
        created() {
            const task = this.$store.state.tasks.filter(task => {
                return task.id === this.id;
            });

            this.task = task[0];
            this.$set(this.task, 'disabled', true);
            this.priorityList = this.$store.state.priorityList;
            this.priority = this.task.priority;
            this.date = moment(this.task.dueBy*1000).format('YYYY-MM-DD').toString();
        },
        methods: {
            returnBack(){
                this.$router.push({ name: 'tasks', params: {id: USER_TOKEN } });
            },
            deleteTask(id){
                this.$http.delete(`https://testapi.doitserver.in.ua/api/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${USER_TOKEN}`
                    }
                })
                    .then(response => {
                        console.log(response);
                        this.$store.commit('deleteTask', id);
                        this.$router.push({ name: 'tasks', params: {id: USER_TOKEN } });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
            editItem(task, save = false){
                task.disabled = false;
                if(save){
                    let dateInt = new Date(this.date).getTime()/1000;
                    if(dateInt < new Date().getTime()/1000){
                        this.error = true;
                        setTimeout(() => {
                            this.error = false;
                        }, 5000);
                    } else {
                        this.task.dueBy = dateInt;
                        delete this.task.disabled;
                        delete this.task.id;
                        delete this.task.priorityNumber;
                        this.updateItem();
                    }
                }
            },
            updateItem(){
                this.$http.put(`https://testapi.doitserver.in.ua/api/tasks/${this.id}`,
                    this.task, {
                        headers: {
                            Authorization: `Bearer ${USER_TOKEN}`
                        }
                    }).then(response => {
                        console.log(response);
                        this.$store.commit('updateTask', this.id, this.task);
                        this.$router.push({name: 'tasks', params: {id: USER_TOKEN }});
                    }).catch(error => {
                        console.log(error)
                    });
            },
            updateElement(e, fieldName){
                this.task[fieldName] = e.target.innerText;
            }
        }
    }
</script>

<style scoped lang="stylus">
    .details {
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

        &__title {
            margin-bottom 15px
        }

        &__button {
            display flex
            align-items center
        }

        &__header
        &__task {
            display flex
            justify-content space-between
            padding 0 0 15px 0
        }

        &__header {
            font-weight bold
        }

        &__task {
            margin-bottom 25px
        }

        &__info {
            background-color #fff
            padding 30px
        }

        &__description {
            width 50%
        }

        &__subtitle {
            font-weight bold
            margin-bottom 10px
        }

        &__actions {
            display flex
            justify-content flex-end
        }

        &__button {
            display flex
            align-items center
            font-size 13px
            cursor pointer
            transition .2s

            &:not(:last-child){
                margin-right 20px
            }

            &:hover {
                transform scale(1.2)
            }
        }
        &__icon {
            width 100%
            height 20px
        }
        &__image {
            width 15px
            height 20px
        }

        &__input {
            padding 10px
            border none
            outline none
            background-color #f5f5f5
            color #595959
            height 40px

            &.disabled {
                background-color #fff
            }
        }

        &__date {
            display flex
            align-items center
        }

        &__error {
            font-size 12px
            color red
            margin 10px 0
        }
    }
</style>
