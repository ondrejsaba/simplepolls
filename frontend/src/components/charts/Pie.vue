<template>
    <div
        id="pie-chart"
        :style="{
            background: conicGradient
        }"
        :class="{
            dark: darkTheme
        }"
    ></div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: {
        data: {
            type: Object,
            default: {}
        },
        barColors: {
            type: Object,
            default: {}
        }
    },
    computed: {
        ...mapState('theme', ['darkTheme']),

        totalVotes() {
            return Object.values(this.data).reduce((total, current) => total + current)
        },
        conicGradient() {
            let gradientStops = Object.values(this.data).map(value => value / this.totalVotes)

            gradientStops = gradientStops.map((value, index) => {
                const offset = gradientStops.slice(0, index + 1).reduce((total, current) => total + current)

                return offset
            }).map(percentage => percentage * 100 + "%")

            let gradientStyle = "conic-gradient("
            
            gradientStops.forEach((stop, index) => {
                const optionName = Object.keys(this.barColors)[index]

                gradientStyle += this.barColors[optionName] + ' 0 ' + stop
                gradientStyle += index < gradientStops.length - 1 ? ',' : ')' 
            })

            return gradientStyle
        }
    }
}
</script>

<style lang="scss">
@import "../../sass/variables";
@import "../../sass/mediaqueries";

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

    @include mobile {
        display: none;
    }
}
</style>