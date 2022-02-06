<template>
	<nav class="dock-bar">
		<ul class="dock-bar__list">
			<li class="dock-bar__item">
				<router-link to="/home" class="dock-bar__link">
					<i class="fas fa-book"></i>
					<span>가계부</span>
				</router-link>
			</li>
			<li class="dock-bar__item">
				<div class="dock-bar__link">
					<i class="fas fa-chart-bar"></i>
					<span>통계</span>
				</div>
			</li>
			<li class="dock-bar__item">
				<div class="dock-bar__link">
					<i class="fas fa-cog"></i>
					<span>설정</span>
				</div>
			</li>
		</ul>
	</nav>
</template>

<script>
export default {
	name: 'DockBar',
};
</script>

<style lang="scss" scoped>
.dock-bar {
	padding: 1rem 2rem;
	background-color: $dockbar-color;
	text-align: center;

	&__list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0;
	}

	&__link {
		color: $gray-7;

		&.router-link-exact-active {
			color: $blue-color;
		}

		i {
			display: block;
			margin-bottom: 0.1rem;
			font-size: 2rem;
		}

		span {
			font-size: 1.3rem;
			line-height: 1;
		}
	}
}
</style>
