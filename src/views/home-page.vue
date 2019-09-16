<template>
  <div class="home">
    <div class="home__container">
      <div v-if="loading" class="home__spinner-block">
        <img src="../assets/spinner.gif" alt="Spinner" class="home__spinner">
      </div>
      <div v-else>
        <div class="home__header">
          <h2>My tasks</h2>
          <div class="home__button-container">
            <button @click="addTask" class="home__button">Create new task</button>
          </div>
        </div>
        <TaskList :tasks="tasks"/>
      </div>
    </div>
  </div>
</template>

<script>
  import USER_TOKEN from '../utils/utils';
  import TaskList from '@/components/task-list.vue';

export default {
  name: 'home-page',
  components: {
    TaskList
  },
  data(){
    return {
      tasks: [],
      loading: true,
      priorityList: {}
    }
  },
  created() {
    const priorities = this.$store.state.priorityList;
    this.priorityList = priorities.reduce((acc, item, idx) => {
      acc[item] = idx+1;
      return acc;
    }, {});

    this.$http.get('https://testapi.doitserver.in.ua/api/tasks?page=1&sort=title%20asc', {
      headers: {
        Authorization: `Bearer ${USER_TOKEN}`
      }
    })
      .then(response => {
        let data = response.body.tasks;
        this.$store.dispatch('getTasks', data);
        this.tasks = data;
        this.tasks = this.tasks.map(task => {
          this.$set(task, 'priorityNumber', this.priorityList[task.priority]);
          return task;
        });
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    addTask(){
      this.$router.push({ name: 'add' });
    }
  }
}
</script>

<style scoped lang="stylus">
  .home {
    &__container {
      width 100%
      max-width 900px
      margin 0 auto
    }

    &__header {
      display flex
      justify-content space-between
      align-items center
      margin-bottom 25px
    }

    &__button-container {
      width 100%
      max-width 200px
    }

    &__spinner-block {
      width 100%
      max-width 200px
      margin 50px auto 0 auto
    }

    &__button {
      border none
      outline none
      width 100%
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
</style>
