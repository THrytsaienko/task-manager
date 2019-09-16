<template>
  <div class="sign">
    <h2 class="sign__title">Sign In</h2>
    <div>
      <div class="sign__field">
        <InputField v-model="email" type="email" text="Email" />
      </div>
      <div class="sign__field">
        <InputField v-model="password" type="password" text="Password" />
      </div>
      <div class="sign__field sign__field--switch">
        <SwitchField v-model="checked" text="Remember me" @toggle="toggle" />
      </div>
      <button @click="signIn" class="sign__button">Sign in</button>
    </div>
  </div>
</template>

<script>
  import InputField from '@/components/input-field.vue';
  import SwitchField from '@/components/switch-component.vue';
  let token;
  export default {
    name: 'sign-page',
    components: {
      InputField,
      SwitchField
    },
    data(){
      return {
        email: '',
        password: '',
        checked: false
      }
    },
    methods: {
      toggle(value){
        this.checked = value;
      },
      signIn(){
        let reqBody = {
          "email": this.email,
          "password": this.password
        };
        this.$http.post('https://testapi.doitserver.in.ua/api/auth', reqBody)
                .then(response => {
                  token = response.body.token;
                  localStorage.setItem('userToken', JSON.stringify(token));
                  this.$router.push({name: 'tasks', params: {id: token }});
                })
                .catch(error => {
                  console.log(error);
                });
      }
    }
  }
</script>

<style scoped lang="stylus">
  .sign {
    width 100%
    max-width 400px
    margin 0 auto

    &__title {
      margin-bottom 30px
      text-align center
    }

    &__field {
      margin-bottom 30px

      &--switch {
        display flex
        justify-content flex-end
      }
    }

    &__button {
      border none
      outline none
      width 100%
      text-transform uppercase
      padding 15px
      font-size 16px
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
