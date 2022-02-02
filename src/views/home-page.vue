<template>
	<section class="home">
		<!-- #region 헤더 -->
		<header class="home__header">
			<nav class="home__nav" :style="{ 'background-color': themeColor }">
				<NavList></NavList>
			</nav>

			<!-- 수입, 지출, 합계 -->
			<div class="home__counter">
				<!-- TODO 컴포넌트로 분리하기 -->
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
			<!-- https://kr.vuejs.org/v2/guide/transitions.html#%ED%8A%B8%EB%9E%9C%EC%A7%80%EC%85%98-%EB%AA%A8%EB%93%9C -->
			<transition name="fade" mode="out-in">
				<router-view></router-view>
			</transition>
		</div>

		<v-btn
			icon
			fab
			elevation="2"
			color="white"
			class="home__plus-btn"
			@click="OPEN_TRANSACTION_MODAL()"
			:style="{
				'background-color': themeColorDark,
			}"
		>
			<v-icon small>fas fa-plus</v-icon>
		</v-btn>

		<!-- 거래 내역 추가/수정 모달 -->
		<AddTransaction
			v-if="isTransactionModal"
			@close="CLOSE_TRANSACTION_MODAL()"
		></AddTransaction>
	</section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

// components
import NavList from '../components/home/nav-list.vue';

// modals
import AddTransaction from '../components/home/add-transaction.vue';

// utils
import { getFirstAndLastDate } from '@/utils/date';

export default {
	name: 'HomePage',

	components: {
		NavList,
		AddTransaction,
	},

	computed: {
		...mapState(['isTransactionModal', 'currentDate']),
	},

	methods: {
		...mapMutations(['OPEN_TRANSACTION_MODAL', 'CLOSE_TRANSACTION_MODAL']),
	},

	created() {
		// TODO 소스 정리 : 공통되는 로직이 transaction-form.vue에서도 쓰임
		const { start, end } = getFirstAndLastDate(this.currentDate);

		this.$store.dispatch('transactions/GET_TRANSACTIONS', {
			start: start.unix() * 1000,
			end: end.unix() * 1000,
		});
	},
};
</script>

<style lang="scss" scoped>
@import '@/scss/views/home-page.scss';
</style>
