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
import { ref } from '@vue/composition-api';

import DailyTransaction from '@/components/daily-page/daily-transaction.vue';

// constants
import { TRANSACTION_TYPE } from '@/constants';

const data = [
	{
		timestamp: new Date().toISOString(),
		category: '식비',
		method: '현금',
		description: '붕어빵',
		cost: 8050,
		type: TRANSACTION_TYPE.OUTCOME,
	},
	{
		timestamp: new Date().toISOString(),
		category: '식비',
		method: '카드',
		description: '점심 식비',
		cost: 12000,
		type: TRANSACTION_TYPE.OUTCOME,
	},
];

export default {
	name: 'DailyPage',

	components: {
		DailyTransaction,
	},

	setup() {
		const transactionList = ref([]);

		// https://stackoverflow.com/questions/46802448/how-do-i-group-items-in-an-array-by-date
		// this gives an object with dates as keys
		const groups = data.reduce((groups, transaction) => {
			const date = transaction.timestamp.split('T')[0];
			if (!groups[date]) {
				groups[date] = [];
			}
			groups[date].push(transaction);
			return groups;
		}, {});

		// Edit: to add it in the array format instead
		const groupArrays = Object.keys(groups).map(date => {
			return {
				date,
				transactions: groups[date],
			};
		});

		transactionList.value = groupArrays;

		console.log(groupArrays);

		return {
			transactionList,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/scss/views/daily-page.scss';
</style>
