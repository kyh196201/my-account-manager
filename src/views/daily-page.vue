<template>
	<section class="daily-page">
		<h2 class="sr-only">일일 수입/지출 페이지</h2>

		<div class="daily-page__inner">
			<template v-if="isLoading">
				<TransactionSkeleton :lines="4"></TransactionSkeleton>
			</template>
			<template v-else>
				<ul class="daily-page__list" v-if="isTransactionList">
					<li
						class="daily-page__item"
						v-for="(transaction, index) in transactionList"
						:key="`transaction-${index}`"
					>
						<DailyTransaction
							v-bind="transaction"
						></DailyTransaction>
					</li>
				</ul>
			</template>
		</div>
	</section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

// Components
import DailyTransaction from '@/components/daily-page/daily-transaction.vue';
import TransactionSkeleton from '../components/daily-page/transaction-skeleton.vue';

const { mapGetters } = createNamespacedHelpers('transactions');

export default {
	name: 'DailyPage',

	components: {
		DailyTransaction,
		TransactionSkeleton,
	},

	computed: {
		...mapGetters(['transactions', 'isFetching']),

		transactionList() {
			const transactions = this.transactions;

			// https://stackoverflow.com/questions/46802448/how-do-i-group-items-in-an-array-by-date
			const groups = transactions.reduce((groups, transaction) => {
				const date = transaction.date;
				if (!groups[date]) {
					groups[date] = [];
				}
				groups[date].push(transaction);
				return groups;
			}, {});

			const groupArrays = Object.keys(groups).map(date => {
				return {
					date,
					transactions: groups[date],
				};
			});

			return groupArrays;
		},

		isTransactionList() {
			return this.transactionList.length > 0;
		},

		isLoading() {
			return this.isFetching('transactions');
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/scss/views/daily-page.scss';
</style>
