<template>
    <div
        class="btn"
        :class="{
            light: !darkTheme && !ignoreColorMode,
            dark: darkTheme && !ignoreColorMode
        }"
    >
        <slot name="text"></slot>

        <span class="material-icons">
            <slot name="icon"></slot>
        </span>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        ignoreColorMode: Boolean
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

.btn {
    width: auto;
    min-width: 25px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    padding: 0 10px 0 10px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;

    // button styles
    &.light {
        border: 1px solid light(200);
        background-color: light(100);

        &:hover {
            border: 1px solid light(300);
        }

        &:active {
            background-color: darken(light(100), 1%);
        }
    }

    &.dark {
        border: 1px solid dark(200);
        background-color: dark(100);

        &:hover {
            border: 1px solid dark(300);
        }

        &:active {
            background-color: darken(dark(100), 1%);
        }
    }

    // button types
    &.circle {
        width: 50px;
        padding: 0;
        border-radius: 50%;
    }
}
</style>