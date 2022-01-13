<template>
	<div class="container">
		<app-header></app-header>
		<div class="wrapper">
			<slot></slot>
		</div>
		<dock-bar></dock-bar>
	</div>
</template>

<script>
// components
import appHeader from '@/components/app-header.vue';
import dockBar from '@/components/dock-bar.vue';

export default {
	components: {
		appHeader,
		dockBar,
	},
};
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;

	.wrapper {
		flex: 1 1 auto;
		overflow: hidden;
		height: 0px;
	}
}
</style>
