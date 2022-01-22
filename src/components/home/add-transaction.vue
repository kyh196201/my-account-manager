<template>
	<v-dialog
		v-model="open"
		fullscreen
		hide-overlay
		transition="dialog-bottom-transition"
	>
		<section class="add-transaction">
			<header class="add-transaction__header">
				<v-btn icon @click="$emit('close')" color="white">
					<v-icon>fas fa-times</v-icon>
				</v-btn>
				<h2 class="add-transaction__title">수입/지출/이체</h2>
			</header>
			<div class="add-transaction__content">
				<!-- 폼 -->
			</div>
		</section>
	</v-dialog>
</template>

<script>
export default {
	name: 'AddTransaction',

	data() {
		return {
			open: true,
		};
	},
};
</script>

<style lang="scss" scoped>
.add-transaction {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: $white-color;

	&__header {
		padding: $side-padding;
		background-color: #809bce;
	}

	&__content {
		flex: 1;
	}
}
</style>
