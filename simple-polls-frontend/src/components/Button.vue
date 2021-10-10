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
    display: inline-block;
    min-width: 20px;
    height: 40px;
    line-height: 40px;
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
            background-color: darken(light(100), 4%);
        }
    }

    &.dark {
        border: 1px solid darken(dark(200), 2%);
        background-color: darken(dark(100), 2%);
        color: light(100);

        &:hover {
            border: 1px solid dark(300);
        }

        &:active {
            background-color: darken(dark(100), 4%);
        }
    }

    &.primary {
        background-color: blue(300);
        color: light(100);

        &:hover {
            background-color: blue(400);
        }

        &:active {
            background-color: blue(500);
        }
    }

    // button types
    &.circle {
        width: 50px;
        padding: 0;
        border-radius: 50%;
    }

    // icons
    span.material-icons {
        line-height: 40px;
        vertical-align: top;
    }

    // sizes
    &.big {
        min-width: 25px;
        height: 50px;
        line-height: 50px;

        span.material-icons {
            line-height: 50px;
        }
    }
}
</style>