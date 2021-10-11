<template>
    <div id="error-modal">
        {{ modalOptions.message }}
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('modal', [
            'modalOptions'
        ])
    }
}
</script>

<style lang="scss">
#error-modal {
    padding: 10px;
    font-size: 18px;
}
</style>