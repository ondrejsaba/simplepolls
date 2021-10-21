<template>
	<div class="accordion">
		<div class="accordion-title" @click="openSwitch">
			<slot name="title"></slot>

			<span
				class="material-icons"
				:class="{
					rotate180: opened
				}"
			>
				arrow_drop_down
			</span>
		</div>

		<transition name="fade">
			<div class="accordion-content" v-if="opened">
				<slot name="content"></slot>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			opened: false
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
	margin: 10px 0 0 0;

	.accordion-title {
		height: 40px;
		line-height: 40px;
		font-size: 24px;
		font-weight: 700;

		span.material-icons {
			line-height: 40px;
			vertical-align: top;
		}

		cursor: pointer;
	}

	.accordion-content {
		margin-top: 10px;
	}
}
</style>