<template>
    <div
        id="results"
        class="section-size center"
        v-if="pollExists"
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

        <div id="results-charts" v-if="totalVotes > 0 && sortedPollData">
            <Bar
                :data="sortedPollData"
                :barColors="barColors"
            />

            <Pie
                :data="sortedPollData"
                :barColors="barColors"
            />
        </div>

        <div id="no-votes" v-else>
            <p>There are no votes yet.</p>
        </div>

        <div id="results-btns">
            <router-link
                :to="{
                    name: totalVotes > 0 ? 'CreatePoll' : 'Vote',
                    params: {
                        id: totalVotes > 0 ? '' : this.$route.params.id
                    }
                }"
            >
                <Button class="primary" :ignore-color-mode="true">
                    <template v-slot:text>
                        {{ totalVotes > 0 ? 'Create a new poll' : 'Vote' }}
                    </template>

                    <template v-slot:icon>
                        arrow_forward
                    </template>
                </Button>
            </router-link>

            <Button class="right" @click="copyLink">
                <template v-slot:text>
                    Copy link
                </template>

                <template v-slot:icon>
                    content_copy
                </template>
            </Button>
        </div>
    </div>

    <div v-else id="not-found">
        <NotFound />
    </div>
</template>

<script>
import Bar from '@/components/charts/Bar.vue'
import Pie from '@/components/charts/Pie.vue'
import Button from '@/components/Button.vue'
import NotFound from '@/components/NotFound.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        Bar,
        Pie,
        Button,
        NotFound
    },
    data() {
        return {
            pollExists: false,

            pollData: {},
            sortedPollData: {},
            totalVotes: 0,

            // colors
            colorsList: ['#FFEB3B', '#03A9F4', '#E53935', '#8BC34A', '#FB8C00', '#7E57C2', '#E91E63', '#3F51B5'],
            barColors: {}
        }
    },
    methods: {
        ...mapMutations('modal', ['setShowModal', 'setModalOptions']),

        getResults() {
            fetch('http://localhost:3000/results/' + this.$route.params.id)
                .then(response => response.json())
                .then(data => {
                    const {question, votes} = data.results

                    this.pollData = {
                        question,
                        votes: JSON.parse(votes)
                    }
                })
        },
        copyLink() {
            const url = 'localhost:8080'

            this.setModalOptions({
                component: 'CopyModal',
                title: 'Copy link',
                message: 'A link to your poll:',
                data: {
                    copyText: url + '/vote/' + this.$route.params.id
                },
                width: '400px'
            })

            this.setShowModal()
        }
    },
    computed: {
        ...mapState('theme', ['darkTheme'])
    },
    watch: {
        pollExists: {
            handler: function() {
                if (this.pollExists) {
                    this.getResults()
                }
            }
        },
        pollData: {
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

                // create a sorted version of the data
                const sortedData = Object.entries(this.pollData.votes).sort(([keyA,a], [keyB,b]) => b - a)
                this.sortedPollData = Object.fromEntries(sortedData)

                // sort colors
                const sortedBarColors = Object.fromEntries(Object.entries(this.sortedPollData).map(([option], index) => {
                    return [option, this.barColors[option]]
                }))

                this.barColors = sortedBarColors
            },
            deep: true
        }
    },
    mounted() {
        fetch('http://localhost:3000/manage/exists/' + this.$route.params.id)
            .then(response => response.json())
            .then(data => {
                const {exists} = data

                this.pollExists = exists
            })
    }
}
</script>

<style lang="scss">
@import "../sass/variables";

#results {
    color: dark(100);
    user-select: none;

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

    #results-charts, #no-votes {
        padding: 20px 0 50px 0;
    }

    #no-votes {
        p {
            margin: 0;
            font-size: 18px;
        }
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