<template>
    <div id="not-found" class="section-size center">
        <h2>404</h2>
        <p>The page you were looking for doesn't exist.</p>

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

export default {
    components: {
        Button
    }
}
</script>

<style lang="scss">
@import "../sass/variables";

#not-found {
    h2, p {
        margin: 0;
    }

    h2 {
        padding-top: 20px;
        font-size: 48px;
    }

    p {
        padding-bottom: 20px;
        font-size: 24px;
    }
}
</style>