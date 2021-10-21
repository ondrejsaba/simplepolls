<template>
    <div id="delete-modal">
        <p>In order to delete the poll, please enter the poll's admin password.</p>

        <p id="wrongPwd" v-if="wrongPwd">
            Wrong password.
        </p>

        <input
            type="password"
            placeholder="Password"
            v-model="inputPwd"
            :class="{
                dark: darkTheme
            }"
            @keyup.enter="deletePoll"
        >

        <div id="delete-modal-btns" class="mt-10">
            <Button class="red" :ignore-color-mode="true" @click="deletePoll">
                <template v-slot:text>
                    Delete poll
                </template>

                <template v-slot:icon>
                    delete
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
            inputPwd: '',
            wrongPwd: false
        }
    },
    methods: {
        ...mapMutations('modal', ['setShowModal', 'setModalOptions']),

        deletePoll() {
            fetch('http://localhost:3000/manage/delete/' + this.$route.params.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputPwd: this.inputPwd
                })
            }).then(response => {
                return response.json()
            }).then(data => {
                const {success} = data
                
                if (success) {
                    // hide this modal
                    this.setShowModal()

                    /* open a new modal informing the user about the fact that
                    they've entered the correct password and
                    that the poll has been deleted */
                    this.setModalOptions({
                        component: 'MessageModal',
                        title: 'Success',
                        message: 'Your poll has been deleted.',
                        width: '400px'
                    })
                    setTimeout(() => {
                        this.setShowModal()

                        this.$router.push({
                            name: 'CreatePoll'
                        })
                    }, 200)
                } else {
                    this.wrongPwd = true
                }
            })
        }
    },
    computed: {
        ...mapState('modal', ['modalOptions']),
        ...mapState('theme', ['darkTheme'])
    },
    mounted() {
        this.wrongPwd = false
    }
}
</script>

<style lang="scss">
@import "../../sass/variables";

#delete-modal {
    padding: 10px;

    p {
        margin: 0;
        font-size: 18px;
    }

    p#wrongPwd {
        padding-top: 10px;
        font-size: 14px;
        font-weight: 600;
        color: red(100);
    }

    input[type=password] {
        width: 100%;
        margin-top: 10px;
    }
}

#delete-modal-btns {
    overflow: auto;
}
</style>