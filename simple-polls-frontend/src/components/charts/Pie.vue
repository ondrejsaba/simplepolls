<template>
    <div
        id="pie-chart"
        :class="{
            dark: darkTheme
        }"
    >

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    computed: {
        ...mapState('theme', ['darkTheme'])
    }
}
</script>

<style lang="scss">
@import "../../sass/variables";

#pie-chart {
    display: inline-block;
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    border: 1px solid light(200);
    border-radius: 50%;
    vertical-align: top;

    &.dark {
        border: 1px solid dark(200);
    }
}
</style>