<template>
	<ul class="nav-list">
		<li v-for="(route, index) in routes" :key="`route-${index}`">
			<router-link class="nav-item" :to="route.path">
				{{ route.name }}
			</router-link>
		</li>
	</ul>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
	name: 'NavList',

	setup() {
		const routes = ref([
			{
				name: '일일',
				path: '/home/daily',
			},
			{
				name: '달력',
				path: '/home/daily',
			},
			{
				name: '주별',
				path: '/home/daily',
			},
			{
				name: '월별',
				path: '/home/daily',
			},
			{
				name: '결산',
				path: '/home/daily',
			},
		]);

		return {
			routes,
		};
	},
};
</script>

<style lang="scss" scoped>
.nav-list {
	display: flex;
	align-items: center;

	li {
		width: 20%;
	}
}

.nav-item {
	display: block;
	position: relative;
	padding: 0.75rem 1rem;
	text-align: center;
	color: rgba($white-color, 0.7);

	&.active {
		color: $white-color;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 0.25rem;
			background-color: $white-color;
		}
	}
}
</style>
