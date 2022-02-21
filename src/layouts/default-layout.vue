<template>
	<div class="container">
		<AppHeader v-if="isAuthenticated"></AppHeader>
		<div class="wrapper">
			<slot></slot>
		</div>
		<DockBar v-if="isAuthenticated"></DockBar>
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

	computed: {
		isAuthenticated() {
			return this.$store.getters['auth/isAuthenticated'];
		},
	},
};
</script>

<style lang="scss" scoped></style>
