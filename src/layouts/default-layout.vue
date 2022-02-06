<template>
	<div class="container">
		<AppHeader></AppHeader>
		<div class="wrapper">
			<slot></slot>
		</div>
		<DockBar></DockBar>
	</div>
</template>

<script>
// components
import AppHeader from '@/components/app-header.vue';
import DockBar from '@/components/dock-bar.vue';

export default {
	components: {
		AppHeader,
		DockBar,
	},
};
</script>

<style lang="scss" scoped></style>
