<template>
    <div
        id="vote"
        v-if="pollExists"
        class="section-size center"
        :class="{
            dark: darkTheme
        }"
    >
        <h2 id="vote-title">
            {{ pollData.question }}
        </h2>

        <h3 id="options-select-amount">
            {{ optionsSelectAmountMessage }}
        </h3>

        <div id="vote-form">
            <Checkbox
                v-for="(option, index) in pollData.options"
                v-model="selectedBoxes[option]"
                :checked-prop="selectedBoxes[option]"
                :key="index"
                @click="selectOption(option)"
            >
                {{ option }}
            </Checkbox>
        </div>

        <Button
            :ignore-color-mode="true"
            class="primary mt-20"
            @click="submitVote"
        >
            <template v-slot:text>
                Submit
            </template>

            <template v-slot:icon>
                arrow_forward
            </template>
        </Button>

        <router-link
            :to="{
                name: 'Results',
                params: { id: $route.params.id }
            }"
        >
            <Button class="mt-20 right">
                <template v-slot:text>
                    Show results
                </template>
            </Button>
        </router-link>
    </div>

    <div v-else id="not-found">
        <NotFound />
    </div>
</template>

<script>
import Checkbox from '@/components/Checkbox.vue'
import Button from '@/components/Button.vue'
import NotFound from '@/components/NotFound.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        Checkbox,
        Button,
        NotFound
    },
    data() {
        return {
            pollExists: false,

            pollData: {},
            selectedBoxes: {}
        }
    },
    methods: {
        ...mapMutations('modal', [
            'setModalOptions',
            'setShowModal'
        ]),

        getData() {
            fetch('http://localhost:3000/results/' + this.$route.params.id)
                .then(response => response.json())
                .then(data => {
                    const {id, question, options, settings} = data.results

                    this.pollData = {
                        id, question,
                        options: JSON.parse(options),
                        settings: JSON.parse(settings)
                    }

                    this.pollData.options.forEach(option => {
                        this.selectedBoxes[option] = false
                    })
                })
        },

        selectOption(option) {
            /* in case we want the user to check only one option - check one, uncheck others */
            if (!this.canCheckOption) {
                Object.keys(this.selectedBoxes).forEach(option => {
                    if (this.selectedBoxes[option]) {
                        this.selectedBoxes[option] = false
                    }
                })
            }

            this.selectedBoxes[option] = !this.selectedBoxes[option]
        },

        submitVote() {
            const selectedOptions = Object.keys(this.selectedBoxes).filter(option => this.selectedBoxes[option] == true)

            if (selectedOptions.length > 0) {
                fetch('http://localhost:3000/vote/' + this.pollData.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({selectedOptions})
                }).then(response => response.json()).then(data => {
                    const { success } = data

                    if (success) {
                        this.$router.push({
                            name: 'Results',
                            params: { id: this.$route.params.id }
                        })
                    } else {
                        this.setModalOptions({
                            component: 'MessageModal',
                            title: 'Error',
                            message: 'You can only vote once from one IP address.',
                            width: '400px'
                        })

                        this.setShowModal()
                    }
                })
            } else {

            }
        }
    },
    computed: {
        ...mapState('theme', [
            'darkTheme'
        ]),
        optionsSelectAmountMessage() {
            if (this.pollData.settings) {
                return this.pollData.settings.multipleChoices ?
                    'You can select multiple options.' :
                    'Please select one option.'
            }
        },
        canCheckOption() {
            if (this.pollData.settings) {
                const totalSelectedBoxes = Object.keys(this.selectedBoxes).reduce((total, current) => {
                    return total + (this.selectedBoxes[current] ? 1 : 0)
                }, 0)

                return this.pollData.settings.multipleChoices ? true : totalSelectedBoxes < 1
            }
        }
    },
    watch: {
        pollExists: {
            handler: function() {
                if (this.pollExists) {
                    this.getData()
                }
            }
        }
    },
    mounted() {
        fetch('http://localhost:3000/manage/exists/' + this.$route.params.id)
            .then(response => response.json())
            .then(data => {
                const {exists} = data

                this.pollExists = exists
            })
    },
}
</script>

<style lang="scss">
@import "../sass/variables";

#vote {
    h2#vote-title {
        margin: 0;
        padding: 20px 20px 0 20px;
        font-size: 28px;
    }

    h3#options-select-amount {
        width: 100%;
        margin: 0;
        padding: 5px 20px 20px 20px;
        font-size: 18px;
        font-weight: 500;
        border-bottom: 1px solid light(200);
        box-sizing: border-box;
    }

    #vote-form {
        width: 100%;
        padding: 20px;
        border-bottom: 1px solid light(200);
        box-sizing: border-box;
    }

    &.dark {
        color: light(100);

        h3#options-select-amount, #vote-form {
            border-bottom: 1px solid dark(200);
        }
    }
}
</style>