<template>
	<section class="daily-page">
		<h2 class="sr-only">일일 수입/지출 페이지</h2>

		<div class="daily-page__inner">
			<ul class="daily-page__list">
				<li
					class="daily-page__item"
					v-for="(transaction, index) in transactionList"
					:key="`transaction-${index}`"
				>
					<DailyTransaction v-bind="transaction"></DailyTransaction>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import DailyTransaction from '@/components/daily-page/daily-transaction.vue';

export default {
	name: 'DailyPage',

	components: {
		DailyTransaction,
	},

	computed: {
		transactionList() {
			const { transactions } = this.$store.state.transactions;

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
	},
};
</script>

<style lang="scss" scoped>
@import '@/scss/views/daily-page.scss';
</style>
