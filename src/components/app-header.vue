<template>
	<header
		class="app-header"
		:style="{
			'background-color': themeColor,
		}"
	>
		헤더
		<div>
			<router-link to="/login">로그인하기</router-link>
			<router-link to="/home">홈 페이지로</router-link>
		</div>
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
