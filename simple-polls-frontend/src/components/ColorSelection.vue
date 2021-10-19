<template>
    <div id="accent-colors">
        <div
            class="accent-color"
            v-for="(color, key) in accentColors"
            :style="{
                backgroundColor: color.hex,
                outline: modelValue == color.hex ? '2px solid ' + color.hex : 'none' 
            }"
            :class="{
                picked: modelValue == color.hex
            }"
            :key="key"
            @click="pickColor(color.hex)"
        >
            <span
                class="material-icons"
                :class="{
                    picked: modelValue == color.hex
                }"
                v-if="modelValue == color.hex"
            >
                check
            </span>

            <div class="hover-name">
                {{ color.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: String
    },
    data() {
        return {
            accentColors: {
                red: {name: 'Red', hex: '#F44336'},
                orange: {name: 'Orange', hex: '#FF9800'},
                tangerine: {name: 'Tangerine', hex: '#FFC107'},
                yellow: {name: 'Yellow', hex: '#FFEB3B'},
                lime: {name: 'Lime', hex: '#CDDC39'},
                green: {name: 'Green', hex: '#8BC34A'},
                forest: {name: 'Forest', hex: '#4CAF50'},
                teal: {name: 'Teal', hex: '#009688'},
                lightBlue: {name: 'Light Blue', hex: '#03A9F4'},
                blue: {name: 'Blue', hex: '#2b64ff'},
                indigo: {name: 'Indigo', hex: '#3F51B5'},
                deepPurple: {name: 'Deep Purple', hex: '#673AB7'},
                purple: {name: 'Purple', hex: '#9C27B0'},
                pink: {name: 'Pink', hex: '#E91E63'},
                blueGrey: {name: 'Blue Grey', hex: '#607D8B'},
                black: {name: 'Black', hex: '#212121'}
            }
        }
    },
    methods: {
        pickColor(color) {
            this.$emit('update:modelValue', color)
        }
    }
}
</script>

<style lang="scss">
@import "../sass/variables";

#accent-colors {
    width: 100%;

    .accent-color {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 40px;
        height: 40px;
        margin-right: 5px;
        margin-bottom: 5px;
        border-radius: 50%;
        box-sizing: border-box;
        cursor: pointer;
        transition: transform 0.1s ease;
        overflow: visible;

        span.material-icons {
            vertical-align: top;
            line-height: 40px;
            width: 40px;
            text-align: center;
            color: light(100);

            &.picked {
                line-height: 36px;
                width: 36px;
            }
        }

        &.picked {
            border: 2px solid light(100);
        }

        &:active {
            transform: scale(0.9);
        }

        .hover-name {
            display: none;
            position: absolute;
            z-index: 1000;
            left: 50%;
            bottom: -35px;
            padding: 5px;
            width: fit-content;
            transform: translateX(-50%);
            background-color: rgba(dark(400), 0.5);
            color: light(100);
            white-space: nowrap;
        }

        &:hover .hover-name {
            display: block;
        }

        &:active .hover-name {
            display: none;
        }
    }
}
</style>