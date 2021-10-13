<template>
    <div
        id="results"
        class="section-size center"
    >
        <h2 id="results-title">
            {{ pollData.question }}
        </h2>

        <div id="results-charts">
            <Bar
                :data="pollData.votes"
            />

            <Pie
                :data="pollData.votes"
            />
        </div>
    </div>
</template>

<script>
import Bar from '@/components/charts/Bar.vue'
import Pie from '@/components/charts/Pie.vue'

export default {
    components: {
        Bar,
        Pie
    },
    data() {
        return {
            pollData: {}
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
        padding: 20px;
        font-size: 28px;
        box-sizing: border-box;
        border-bottom: 1px solid light(200);
    }

    #results-charts {
        padding: 20px;
    }
}
</style>