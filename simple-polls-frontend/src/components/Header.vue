<template>
    <header
        class="section-size center"
        :class="{
            dark: darkTheme
        }"
    >
        <ul>
            <li>
                <div id="logo" class="ml-10">
                    <div class="logo-yellow-bar"></div>
                    <div class="logo-blue-bar"></div>
                    <div class="logo-red-bar"></div>
                </div>
            </li>

            <li id="title">
                Simple Polls
            </li>

            <li class="right">
                <Button class="big circle mr-10" @click="setDarkTheme">
                    <template v-slot:text>
                        {{ themeIcon }}
                    </template>
                </Button>
            </li>
        </ul>
    </header>
</template>

<script>
import Button from '@/components/Button.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        Button
    },
    methods: {
        ...mapMutations('theme', [
            'setDarkTheme'
        ])
    },
    computed: {
        ...mapState('theme', [
            'darkTheme'
        ]),
        themeIcon() {
            return this.darkTheme ? '🌙' : '☀️'
        }
    }
}
</script>

<style lang="scss">
@import "../sass/variables";

header {
    overflow: hidden;
    border-bottom: 1px solid light(200);
    padding-bottom: 25px;
    background-color: light(100);

    ul {
        list-style-type: none;
        padding: 0;
        margin-top: 25px;

        li {
            float: left;
            height: 50px;
            line-height: 50px;
        }
    }

    &.dark {
        background-color: dark(100);
        color: light(100);
        border-bottom: 1px solid dark(200);
    }
}

#logo {
    display: inline-flex;
    flex-direction: row;
    align-items: flex-end;
    width: 50px;
    height: 50px;
    gap: 2px;
    margin: 0 20px 0 0;

    .logo-bar {
        flex-basis: 0;
        flex-grow: 1;
    }

    .logo-yellow-bar {
        @extend .logo-bar;
        height: 33.3%;
        background-color: #FFC107;
    }

    .logo-blue-bar {
        @extend .logo-bar;
        height: 66.6%;
        background-color: #039BE5;
    }

    .logo-red-bar {
        @extend .logo-bar;
        height: 100%;
        background-color: #E53935;
    }
}

#title {
    font-weight: 700;
    font-size: 38px;
}
</style>