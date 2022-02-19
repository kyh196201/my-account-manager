<template>
	<div class="container">
		<AppHeader v-if="false"></AppHeader>
		<div class="wrapper">
			<slot></slot>
		</div>
		<DockBar v-if="false"></DockBar>
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
