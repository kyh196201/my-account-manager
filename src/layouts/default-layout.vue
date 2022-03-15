<template>
	<div class="container">
		<template v-if="isLoading">
			<PageProgress />
		</template>
		<template v-else>
			<AppHeader v-if="isAuthenticated"></AppHeader>
			<div class="wrapper">
				<slot></slot>
			</div>
			<DockBar v-if="isAuthenticated"></DockBar>
		</template>
	</div>
</template>

<script>
// components
import AppHeader from '@/components/app-header.vue';
import DockBar from '@/components/dock-bar.vue';
import PageProgress from '@/components/common/page-progress.vue';

export default {
	components: {
		AppHeader,
		DockBar,
		PageProgress,
	},

	computed: {
		isAuthenticated() {
			return this.$store.getters['auth/isAuthenticated'];
		},

		isLoading() {
			return this.$store.getters.isLoading;
		},
	},
};
</script>

<style lang="scss" scoped></style>
