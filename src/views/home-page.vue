<template>
	<section class="home">
		<!-- #region 헤더 -->
		<header
			class="home__header"
			:style="{ 'background-color': themeColor }"
		>
			<nav class="home__nav">
				<navList></navList>
			</nav>

			<!-- 수입, 지출, 합계 -->
			<div class="home__counter">
				<div class="counter__box">
					<span class="counter__title">수입</span>
					<strong class="counter__ammount income">0</strong>
				</div>
				<div class="counter__box">
					<span class="counter__title">지출</span>
					<strong class="counter__ammount outcome">197,200</strong>
				</div>
				<div class="counter__box">
					<span class="counter__title">합계</span>
					<strong class="counter__ammount">-197,200</strong>
				</div>
			</div>
		</header>
		<!-- #endregion -->

		<div class="home__content">
			<router-view></router-view>
		</div>
	</section>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

// components
import navList from '../components/home/nav-list.vue';

export default {
	name: 'HomePage',

	components: {
		navList,
	},

	setup(props, { root }) {
		const themeColor = computed(() => root.$store.getters.themeColor);

		const message = ref('hello');

		console.log(themeColor);

		return {
			message,
			themeColor,
		};
	},
};
</script>

<style lang="scss" scoped>
.home {
	display: flex;
	flex-direction: column;
	height: 100%;
	font-size: 1.5rem;

	// 헤더
	&__header {
		color: $white-color;
	}

	&__counter {
		display: flex;
		background-color: $white-color;
		border: 0.1rem solid #ddd;
		border-left: none;
		border-right: none;
		color: $black-color;

		.counter {
			&__box {
				width: 33.33%;
				padding: 0.5rem 1rem;
				text-align: center;
			}

			&__ammount {
				display: block;
				margin-top: 0.5rem;
				font-weight: 700;
				font-size: 1.1em;
				@include ellipsis(1);

				&.income {
					color: $blue-color;
				}

				&.outcome {
					color: $red-color;
				}
			}
		}
	}

	// 컨텐츠
	&__content {
		flex: 1 1 auto;
		overflow-y: auto;
		height: 0px;
	}
}
</style>
