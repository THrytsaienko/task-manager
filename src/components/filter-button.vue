<template>
    <button @click="clicked" :class="{'active' : active}" class="button">{{buttonName}}</button>
</template>

<script>
    export default {
        name: 'filter-btn',
        props: ['buttonName', 'active'],
        methods: {
            clicked () {
                this.$emit('clicked')
            }
        }
    }
</script>

<style scoped lang="stylus">
    .button {
        text-transform: uppercase;
        font-size: 16px;
        color: #404148;
        border: none;
        outline: none;
        background-color: #fff;
        cursor: pointer;
        padding: 0 30px 5px 30px;
        transition: 0.2s;

        &:hover {
            color: #000;
            transform: scale(1.1);
            border-bottom: 1px solid #404148;
        }

        &.active {
            border-bottom: 2px solid #000;
            font-weight: bold;
        }
    }
</style>
