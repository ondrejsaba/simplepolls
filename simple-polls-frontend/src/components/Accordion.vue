<template>
	<div class="accordion">
		<div class="accordion-title" @click="openSwitch">
			<slot name="title"></slot>
		</div>

		<div class="accordion-content" v-if="opened">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			opened: true
		}
	},
	methods: {
		openSwitch() {
			this.opened = !this.opened
		}
	}
}
</script>

<style lang="scss">
@import "../sass/variables";

.accordion {
	width: auto;
	margin: 10px 0 10px 0;

	.accordion-title {
		height: 40px;
		line-height: 40px;
		font-size: 24px;
		font-weight: 700;
	}
}
</style>