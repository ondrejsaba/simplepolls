<template>
    <div id="pie-chart">

    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: {}
        }
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
    border: 1px solid lime;
    vertical-align: top;
}
</style>