<template>
	<section class="home">
		<!-- #region 헤더 -->
		<header class="home__header">
			<nav class="home__nav" :style="{ 'background-color': themeColor }">
				<NavList></NavList>
			</nav>

			<!-- 수입, 지출, 합계 -->
			<div class="home__counter">
				<TotalCounter></TotalCounter>
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
		<TransactionDetail
			v-if="isTransactionModal"
			@close="CLOSE_TRANSACTION_MODAL()"
		></TransactionDetail>
	</section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

// components
import NavList from '../components/home/nav-list.vue';
import TotalCounter from '@/components/home/total-counter.vue';

// modals
import TransactionDetail from '../components/home/transaction-detail.vue';

export default {
	name: 'HomePage',

	components: {
		NavList,
		TransactionDetail,
		TotalCounter,
	},

	computed: {
		...mapState(['isTransactionModal', 'currentDate']),

		// 총 수입
		totalIncome() {
			return this.$store.getters['transactions/totalIncome'];
		},

		// 총 지출
		totalOutcome() {
			return this.$store.getters['transactions/totalOutcome'];
		},

		// 총 수입, 지출 합계
		totalCost() {
			return this.totalIncome + this.totalOutcome;
		},
	},

	methods: {
		...mapMutations(['OPEN_TRANSACTION_MODAL']),
		...mapActions(['CLOSE_TRANSACTION_MODAL']),
	},
};
</script>

<style lang="scss" scoped>
@import '@/scss/views/home-page.scss';
</style>
