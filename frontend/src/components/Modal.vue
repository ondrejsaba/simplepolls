<template>
    <div
        id="modal"
        :style="{
            width: modalOptions.width,
            height: modalOptions.height
        }"
        :class="{
            dark: darkTheme
        }"
    >
        <div class="modal-title">
            {{ modalOptions.title }}

            <span class="material-icons close" @click="setShowModal">
                close
            </span>
        </div>

        <component :is="modalOptions.component"></component>
    </div>
</template>

<script>
import MessageModal from '@/components/modals/MessageModal.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import CopyModal from '@/components/modals/CopyModal.vue'
import { mapState, mapMutations } from 'vuex'

export default {
    components: {
        MessageModal,
        DeleteModal,
        CopyModal
    },
    methods: {
        ...mapMutations('modal', [
            'setShowModal'
        ])
    },
    computed: {
        ...mapState('modal', [
            'modalOptions'
        ]),
        ...mapState('theme', [
            'darkTheme'
        ])
    }
}
</script>

<style lang="scss">
@import "../sass/variables";

#modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid light(200);
    background-color: light(100);
    border-radius: 8px;
    user-select: none;

    .modal-title {
        width: calc(100% - 10px);
        height: 50px;
        border-bottom: 1px solid light(200);
        font-size: 24px;
        line-height: 50px;
        font-weight: 600;
        padding-left: 10px;

        .close {
            position: absolute;
            right: 0;
            top: 0;
            line-height: 50px;
            width: 50px;
            text-align: center;
            font-size: 24px;
            cursor: pointer;

            &:active {
                transform: scale(0.9);
            }
        }
    }

    &.dark {
        border: 1px solid dark(300);
        background-color: dark(100);
        color: light(100);

        .modal-title {
            border-bottom: 1px solid dark(200)
        }
    }
}
</style>