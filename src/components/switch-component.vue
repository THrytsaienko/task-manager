<template>
    <div class="switch">
        <label for="switch" class='switch__label'>{{text}}</label>
        <div class="switch__button">
            <button role='switch' aria-checked='true' id='switch' class="switch__container"
                    @click="toggle" :checked="checked" :class="{'checked' : checked}">
                <div class='switch__circle'></div>
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "switch-component",
        props: {
            text: {
                type: String,
                required: true
            }
        },
        data(){
            return {
                checked: false
            }
        },
        methods: {
            toggle(){
                this.checked = !this.checked;
                this.$emit('toggle', this.checked);
            }
        }
    }
</script>

<style scoped lang="stylus">
    .switch {
        display flex
        align-items center

        &__button {
            width: 100%
            max-width: 50px
            margin-left: 20px
        }

        &__label {
            font-style italic
        }

        &__circle {
            width: 20px
            height: 20px
            border-radius: 50%
            background-color: #fff
            transition: .2s
        }

        &__container {
            position: relative
            border: none
            outline: none
            background-color: #babbba
            display: flex
            align-items: center
            cursor: pointer
            padding: 0 5px
            border-radius: 20px
            width: 50px
            height: 30px

            &.checked {
                background-color: #00a2a2

                .switch__circle {
                    transform: translateX(20px)
                    transition: .2s
                }
            }
        }
    }
</style>
