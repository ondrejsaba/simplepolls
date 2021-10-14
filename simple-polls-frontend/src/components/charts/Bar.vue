<template>
    <div
        id="bar-chart"
        :class="{
            dark: darkTheme
        }"
    >
        <div
            class="item-bar"
            v-for="(votes, name) in data"
            :key="name"
        >
            <p class="item-details">
                <span class="name">
                    {{ name }}
                </span>

                <span class="votes">
                    {{ votePercentage(votes) }} ({{ votes }} votes)
                </span>
            </p>

            <div class="bar">
                <div
                    class="bar-fill"
                    :style="{
                        width: (votes / totalVotes) * 100 + '%',
                        backgroundColor: barColors[name]
                    }"
                ></div>
            </div>
        </div>
    </div>
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
    methods: {
        votePercentage(votes) {
            return ((votes / this.totalVotes) * 100).toFixed(2) + '%'
        }
    },
    computed: {
        ...mapState('theme', ['darkTheme']),

        totalVotes() {
            return Object.values(this.data).reduce((total, current) => total + current, 0)
        }
    }
}
</script>

<style lang="scss">
@import "../../sass/variables";

#bar-chart {
    display: inline-block;
    width: calc(100% - 300px);
    height: 200px;

    .item-bar {
        width: calc(100% - 20px);
        height: 50px;

        &:not(:first-of-type) {
            margin-top: 20px;
        }

        .item-details {
            width: 100%;
            height: 20px;
            margin: 0;

            span.name {
                font-weight: 600;
            }

            span.votes {
                float: right;
            }
        }

        .bar {
            width: 100%;
            height: 25px;
            margin-top: 5px;
            border: 1px solid light(200);
            box-sizing: border-box;
            background-color: lighten(light(200), 5%);

            .bar-fill {
                height: 100%;
            }
        }
    }

    &.dark {
        .item-bar {
            .bar {
                border: 1px solid dark(300);
                background-color: dark(200);
            }
        }
    }
}
</style>