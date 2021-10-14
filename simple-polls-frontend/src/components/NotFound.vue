<template>
    <div
        class="not-found-content"
        :class="{
            dark: darkTheme
        }"
    >
        <h2>Error</h2>
        <h3>This poll doesn't exist.</h3>

        <router-link :to="{ name: 'CreatePoll' }">
            <Button>
                <template v-slot:text>
                    Go back
                </template>

                <template v-slot:icon>
                    arrow_forward
                </template>
            </Button>
        </router-link>
    </div>
</template>

<script>
import Button from '@/components/Button.vue'
import { mapState } from 'vuex'

export default {
    components: {
        Button
    },
    computed: {
        ...mapState('theme', ['darkTheme'])
    }
}
</script>

<style lang="scss">
@import "../sass/variables";

.not-found-content {
    padding-top: 20px;
    color: dark(100);
    user-select: none;

    h2, h3 {
        margin: 0;
    }

    h2 {
        font-size: 42px;
    }

    h3 {
        font-size: 24px;
        font-weight: 500;
        padding-bottom: 20px;
    }
    
    &.dark {
        color: light(100);
    }
}
</style>