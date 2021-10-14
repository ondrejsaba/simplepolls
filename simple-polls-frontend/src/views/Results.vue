<template>
    <div
        id="results"
        class="section-size center"
        :class="{
            dark: darkTheme
        }"
    >
        <h2 id="results-title">
            {{ pollData.question }}
        </h2>

        <h3 id="results-votes">
            {{ totalVotes }} votes
        </h3>

        <div id="results-charts">
            <Bar
                :data="pollData.votes"
                :barColors="barColors"
            />

            <Pie
                :data="pollData.votes"
                :barColors="barColors"
            />
        </div>

        <div id="results-btns">
            <Button @click="copyLink">
                <template v-slot:text>
                    Copy link
                </template>

                <template v-slot:icon>
                    content_copy
                </template>
            </Button>

            <router-link :to="{ name: 'CreatePoll' }">
                <Button
                    class="primary right"
                    :ignore-color-mode="true"
                >
                    <template v-slot:text>
                        Create a new poll
                    </template>

                    <template v-slot:icon>
                        arrow_forward
                    </template>
                </Button>
            </router-link>
        </div>
    </div>
</template>

<script>
import Bar from '@/components/charts/Bar.vue'
import Pie from '@/components/charts/Pie.vue'
import Button from '@/components/Button.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        Bar,
        Pie,
        Button
    },
    data() {
        return {
            pollData: {},
            totalVotes: 0,

            // colors
            colorsList: ['#FFEB3B', '#03A9F4', '#E53935', '#8BC34A', '#FB8C00', '#7E57C2'],
            barColors: {}
        }
    },
    methods: {
        ...mapMutations('modal', ['setShowModal', 'setModalOptions']),
        copyLink() {
            // add code for actually copying the code into user's clipboard

            // informative dialog
            this.setModalOptions({
                component: 'MessageModal',
                title: 'Copied',
                message: 'Link to the poll was succesfully copied to your clipboard.',
                width: '400px'
            })

            this.setShowModal()
        }
    },
    computed: {
        ...mapState('theme', ['darkTheme'])
    },
    watch: {
        pollData: {
            deep: true,
            handler: function() {
                // assign colors to options
                Object.keys(this.pollData.votes).forEach((option, index) => {
                    // start from 0 if there aren't any new colors
                    const colorIndex = index + 1 > this.colorsList.length ? index % this.colorsList.length : index

                    this.barColors[option] = this.colorsList[colorIndex]
                })

                // update position according to the content
                this.$emit('updateContentPosition')

                // get total votes from the poll data
                this.totalVotes = Object.values(this.pollData.votes).reduce((total, current) => total + current)
            }
        }
    },
    mounted() {
        fetch('http://localhost:3000/results/' + this.$route.params.id)
            .then(response => response.json())
            .then(data => {
                const {question, votes} = data.results

                this.pollData = {
                    question,
                    votes: JSON.parse(votes)
                }
            })
    }
}
</script>

<style lang="scss">
@import "../sass/variables";

#results {
    h2#results-title {
        width: 100%;
        margin: 0;
        padding: 20px 20px 5px 0;
        font-size: 28px;
    }

    h3#results-votes {
        width: 100%;
        margin: 0;
        padding: 0 20px 20px 0;
        box-sizing: border-box;
        border-bottom: 1px solid light(200);
        font-weight: 500;
        font-size: 18px;
    }

    #results-charts {
        padding: 20px 0 50px 0;
    }

    &.dark {
        color: light(100);

        h3#results-votes {
            border-bottom: 1px solid dark(200);
        }
    }

    #results-btns {
        width: 100%;
        height: auto;
    }
}
</style>