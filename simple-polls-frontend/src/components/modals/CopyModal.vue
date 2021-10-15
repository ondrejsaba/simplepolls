<template>
    <div id="copy-modal">
        <p>{{ modalOptions.message }}</p>

        <input
            type="text"
            ref="textToCopy"
            :value="modalOptions.data.copyText"
            :class="{
                dark: darkTheme
            }"
            readonly
        >

        <div id="copy-modal-btns" class="mt-10">
            <Button class="primary" :ignore-color-mode="true" @click="copyToClipboard">
                <template v-slot:text>
                    {{ copyBtnText }}
                </template>

                <template v-slot:icon>
                    {{ copyBtnIcon }}
                </template>
            </Button>

            <Button class="right" @click="setShowModal">
                <template v-slot:text>
                    Cancel
                </template>

                <template v-slot:icon>
                    close
                </template>
            </Button>
        </div>
    </div>
</template>

<script>
import Button from '@/components/Button.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        Button
    },
    data() {
        return {
            copyClicked: false
        }
    },
    methods: {
        ...mapMutations('modal', ['setShowModal']),

        copyToClipboard() {
            navigator.clipboard.writeText(this.$refs.textToCopy.value)

            this.copyClicked = true
            setTimeout(() => {
                this.copyClicked = false
            }, 1000)
        }
    },
    computed: {
        ...mapState('modal', ['modalOptions']),
        ...mapState('theme', ['darkTheme']),

        copyBtnText() {
            return this.copyClicked ? 'Copied to clipboard!' : 'Copy to clipboard'
        },
        copyBtnIcon() {
            return this.copyClicked ? 'check' : 'content_copy'
        }
    }
}
</script>

<style lang="scss">
@import "../../sass/variables";

#copy-modal {
    padding: 10px;
    
    p {
        margin: 0;
        font-size: 18px;
    }

    input[type=text] {
        width: 100%;
        margin-top: 10px;
    }
}

#copy-modal-btns {
    overflow: auto;
}
</style>