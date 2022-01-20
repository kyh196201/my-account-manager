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

// constants
import { TRANSACTION_TYPE } from '@/constants';

const data = [
	{
		date: '2022.01.15',
		transactionList: [
			{
				category: '식비',
				method: '현금',
				description: '붕어빵',
				cost: 8050,
				type: TRANSACTION_TYPE.OUTCOME,
				timestamp: Date.now(),
			},
			{
				category: '식비',
				method: '카드',
				description: '점심 식비',
				cost: 12000,
				type: TRANSACTION_TYPE.OUTCOME,
				timestamp: Date.now(),
			},
		],
	},

	{
		date: '2022.01.16',
		transactionList: [
			{
				category: '식비',
				method: '현금',
				description: '붕어빵',
				cost: 8050,
				type: TRANSACTION_TYPE.INCOME,
				timestamp: Date.now(),
			},
			{
				category: '식비',
				method: '카드',
				description: '점심 식비',
				cost: 12000,
				type: TRANSACTION_TYPE.OUTCOME,
				timestamp: Date.now(),
			},
		],
	},
];

export default {
	name: 'DailyPage',

	components: {
		DailyTransaction,
	},

	setup() {
		const transactionList = data;

		return {
			transactionList,
		};
	},
};
</script>

<style lang="scss" scoped>
@import '@/scss/views/daily-page.scss';
</style>
