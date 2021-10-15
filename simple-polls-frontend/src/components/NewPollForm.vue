<template>
    <div id="new-poll" class="section-size center">
        <div
            id="new-poll-form"
            :class="{
                dark: darkTheme
            }"
        >
            <label for="title">Poll Question</label>
            <input
                type="text"
                name="title"
                autocomplete="off"
                spellcheck="false"
                placeholder="Type your question here"
                v-model="question"
                :class="{
                    dark: darkTheme
                }"
            >

            <label>Options</label>
            <div id="poll-options">
                <div
                    class="option"
                    v-for="(option, index) in options"
                    :key="index + 1"
                >
                    <input
                        type="text"
                        autocomplete="off"
                        spellcheck="false"
                        v-model="options[index]"
                        :placeholder="'Option ' + (index + 1)"
                        :name="'option' + (index + 1)"
                        :class="{
                            dark: darkTheme
                        }"
                    >

                    <span
                        class="material-icons remove-option"
                        v-if="options.length > 2"
                        @click="removeOption(index)"
                    >
                        close
                    </span>
                </div>
            </div>

            <Button @click="addOption">
                <template v-slot:text>
                    Add Option
                </template>

                <template v-slot:icon>
                    add
                </template>
            </Button>
        </div>

        <div
            id="new-poll-settings"
            :class="{
                dark: darkTheme
            }"
        >
            <h2>Poll Settings</h2>

            <div id="new-poll-settings-form">
                <Checkbox v-model="settings.multipleChoices">
                    Allow multiple choices
                </Checkbox>
            </div>
        </div>

        <div id="new-poll-btns">
            <Button
                class="primary"
                :ignore-color-mode="true"
                @click="createPoll"
            >
                <template v-slot:text>
                    Create Poll
                </template>

                <template v-slot:icon>
                    arrow_forward
                </template>
            </Button>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Button.vue'
import Checkbox from '@/components/Checkbox.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        Button,
        Checkbox
    },
    data() {
        return {
            question: '',
            options: [],
            settings: {
                multipleChoices: false
            }
        }
    },
    methods: {
        ...mapMutations('modal', [
            'setModalOptions',
            'setShowModal'
        ]),
        addOption() {
            this.options.push('')
            this.$emit('updateContentPosition')
        },
        removeOption(deleteIndex) {
            this.options = this.options.filter((option, index) => index != deleteIndex)
            this.$emit('updateContentPosition')
        },
        createPoll() {
            if (this.formIsValid) {
                let pollVotes = {}
                this.options.forEach(option => {
                    pollVotes[option] = 0
                })

                fetch('http://localhost:3000/manage/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        question: this.question,
                        options: this.options.filter(option => option.length > 0),
                        votes: pollVotes,
                        settings: this.settings
                    })
                }).then(response => {
                    return response.json()
                }).then(data => {
                    const { id, pwd } = data

                    this.$router.push({
                        name: 'Results',
                        params: { id }
                    })

                    this.setModalOptions({
                        component: 'CopyModal',
                        title: 'Poll admin password',
                        message: "Save your poll's password in case you wanted to delete it in the future:",
                        data: {
                            copyText: pwd
                        },
                        width: '400px'
                    })

                    this.setShowModal()
                })
            } else {
                this.setModalOptions({
                    component: 'MessageModal',
                    title: 'Error',
                    message: 'Please add two or more options in order to create a new poll.',
                    width: '400px'
                })

                this.setShowModal()
            }
        }
    },
    computed: {
        ...mapState('theme', [
            'darkTheme'
        ]),
        formIsValid() {
            let validOptions = 0

            this.options.forEach(option => {
                if (option.length) {
                    validOptions += 1
                }
            })

            return validOptions >= 2
        }
    },
    mounted() {
        for (let i = 0; i < 2; i++) {
            this.options.push('')
        }
    }
}
</script>

<style lang="scss">
@import "../sass/variables";

#new-poll {
    color: dark(100);
}

#new-poll-form {
    padding: 20px 0 20px 0;

    label, input[type=text] {
        display: block;
        margin: 10px 0 10px;
        width: 100%;
    }

    label {
        font-size: 18px;
        font-weight: 600;
        color: dark(100);
        user-select: none;
    }

    .option {
        position: relative;

        .remove-option {
            position: absolute;
            right: 10px;
            top: 0;
            line-height: 50px;
            font-size: 28px;
            color: light(500);
            cursor: pointer;
            user-select: none;

            &:hover {
                color: dark(100);
            }

            &:active {
                transform: scale(0.8);
            }
        }
    }

    border-bottom: 1px solid light(200);

    &.dark {
        border-bottom: 1px solid dark(200);

        label {
            color: light(100);
        }
    }
}

#new-poll-settings {
    padding: 20px 0 20px 0;
    color: dark(100);
    user-select: none;

    h2 {
        margin: 0;
        font-size: 24px;
    }

    border-bottom: 1px solid light(200);

    &.dark {
        border-bottom: 1px solid dark(200);
        color: light(100);
    }
}

#new-poll-btns {
    padding-top: 20px;
}
</style>