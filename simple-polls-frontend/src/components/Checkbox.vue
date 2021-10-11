<template>
    <div
        class="checkbox"
        :class="{
            dark: darkTheme
        }"
        @click="switchCheck"
    >
        <div
            class="box"
            :class="{
                active: checked
            }"
        >
            <span class="material-icons" v-if="checked">
                check
            </span>
        </div>

        <span class="text">
            <slot name="text"></slot>
        </span>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        modelValue: Boolean
    },
    data() {
        return {
            checked: false
        }
    },
    methods: {
        switchCheck() {
            this.checked = !this.checked
            this.$emit('update:modelValue', this.checked)
        }
    },
    computed: {
        ...mapState('theme', [
            'darkTheme'
        ])
    }
}
</script>

<style lang="scss">
@import "../sass/variables";

.checkbox {
    width: auto;
    margin-top: 10px;
    cursor: pointer;
    user-select: none;

    .box {
        position: relative;
        display: inline-block;
        width: 30px;
        height: 30px;
        background-color: light(100);
        border: 1px solid light(200);
        box-sizing: border-box;
        text-align: center;

        span.material-icons {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }

        &.active {
            background-color: blue(300);
            color: light(100);
        }
    }

    &.dark .box {
        background-color: dark(200);
        border: 1px solid dark(300);

        &.active {
            background-color: blue(300);
        }
    }

    .text {
        line-height: 30px;
        vertical-align: top;
        padding-left: 10px;
    }

    &:hover .box {
        border: 1px solid light(300);
    }

    &:active .box {
        background-color: darken(light(100), 4%);
    }

    &.dark:hover .box {
        border: 1px solid dark(400);
    }

    &.dark:active .box {
        background-color: darken(dark(200), 2%);
    }
}
</style>