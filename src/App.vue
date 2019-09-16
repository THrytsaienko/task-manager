<template>
  <div id="app">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import USER_TOKEN from '@/utils/utils';

  export default {
    created() {
      if(USER_TOKEN){
        this.$router.push({name: 'tasks', params: {id: USER_TOKEN }});
      }
    }
  };
</script>

<style lang="stylus">
  #app {
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    background-color #cbcac6
    padding 50px 0
    min-height 100vh
  }

  .container {
    width 100%
    max-width 1040px
    padding 40px 20px
    margin 0 auto
    background-color #f0f0f0
    box-shadow: 0px 0px 8px rgba(0,0,0,0.7);
  }

  *, *:before, *:after {
    margin 0
    padding 0
    box-sizing border-box
  }

  .cell {
    display flex
    align-items center
    width 20%

    &:first-child {
      width 45%
    }

    &:last-child {
      width 10%
    }
  }

  #tj-datetime-input {
    height 37px
    border 1px solid #e9e9e9
    text-indent 10px
    min-width 0
  }
</style>
