<template>
    <div id="new-poll" class="section-size center">
        <form
            id="new-poll-form"
            :class="{
                dark: darkTheme
            }"
        >
            <label for="title">Poll Question</label>
            <input type="text" name="title" placeholder="Type your question here">

            <label>Options</label>
            <div id="poll-options">
                <input
                    type="text"
                    v-for="(option, index) in options"
                    :key="index + 1"
                    :placeholder="'Option ' + (index + 1)"
                    :name="'option' + (index + 1)"
                >
            </div>
        </form>

        <div
            id="new-poll-settings"
            :class="{
                dark: darkTheme
            }"
        >
            <h2>Poll Settings</h2>

            <div id="new-poll-settings-form">
                <Checkbox v-model="settings.multipleChoices">
                    <template v-slot:text>
                        Allow multiple choices
                    </template>
                </Checkbox>
            </div>
        </div>

        <div id="new-poll-btns">
            <Button
                class="primary"
                :ignore-color-mode="true"
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
import { mapState } from 'vuex'

export default {
    components: {
        Button,
        Checkbox
    },
    data() {
        return {
            options: [],
            settings: {
                multipleChoices: false
            }
        }
    },
    methods: {
        addOption() {

        }
    },
    computed: {
        ...mapState('theme', [
            'darkTheme'
        ])
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
    }

    input[type=text] {
        box-sizing: border-box;
        height: 50px;
        padding: 0 10px 0 10px;
        font-size: 20px;
        border: 1px solid light(300);
        border-radius: 4px;
        font-family: 'Inter';

        &:focus {
            border: 1px solid light(500);
            outline: 3px solid rgba(blue(100), 0.2);
        }
    }

    border-bottom: 1px solid light(200);

    &.dark {
        border-bottom: 1px solid dark(200);
    }
}

#new-poll-settings {
    padding: 20px 0 20px 0;

    h2 {
        margin: 0;
        font-size: 24px;
    }

    border-bottom: 1px solid light(200);

    &.dark {
        border-bottom: 1px solid dark(200);
    }
}

#new-poll-btns {
    padding: 20px 0 20px 0;
}
</style>