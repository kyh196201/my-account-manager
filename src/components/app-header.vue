<template>
	<header
		class="app-header"
		:style="{
			'background-color': themeColor,
		}"
	>
		헤더
	</header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'AppHeader',

	computed: {
		...mapGetters(['themeColor']),
	},
};
</script>

<style lang="scss" scoped>
.app-header {
	padding: $side-padding;
	font-size: 2rem;
	text-align: center;
}
</style>
