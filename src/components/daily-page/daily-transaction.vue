<template>
	<div class="daily-transaction">
		<div class="daily-transaction__summary">
			<span class="daily-transaction__date"> {{ dateString }} </span>
			<strong class="daily-transaction__cost income">
				{{ totalIncome }}원
			</strong>
			<strong class="daily-transaction__cost outcome">
				{{ totalOutcome }}원
			</strong>
		</div>
		<div class="daily-transaction__detail">
			<ul class="daily-transaction__list">
				<li
					v-for="(transaction, index) in transactions"
					:key="`transaction-${index}`"
				>
					<Transaction v-bind="transaction"></Transaction>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { computed, inject, toRefs } from '@vue/composition-api';

// utils
import { numberWithCommas } from '@/utils/filter';
import { filterOutcomes, filterIncomes } from '@/utils';

import Transaction from '@/components/daily-page/transaction.vue';

export default {
	name: 'DailyTransaction',

	components: {
		Transaction,
	},

	props: {
		// 소비/지출 날짜
		date: {
			type: String,
			default: '',
			required: true,
		},

		// 소비/지출 내역
		transactions: {
			type: Array,
			default: () => [],
			required: true,
		},
	},

	setup(props) {
		const $dayjs = inject('$dayjs');

		const { date } = toRefs(props);

		// 총 지출
		const totalOutcome = computed(() => {
			const outcomes = filterOutcomes(props.transactions);

			const total = outcomes.reduce((sum, transaction) => {
				return sum + Number(transaction.cost);
			}, 0);

			return numberWithCommas(total);
		});

		// 총 수입
		const totalIncome = computed(() => {
			const incomes = filterIncomes(props.transactions);

			const total = incomes.reduce((sum, transaction) => {
				return sum + Number(transaction.cost);
			}, 0);

			return numberWithCommas(total);
		});

		// 연-월-일
		const dateString = computed(() =>
			$dayjs(date.value).format('YYYY-MM-DD'),
		);

		return {
			totalOutcome,
			totalIncome,
			dateString,
		};
	},
};
</script>

<style lang="scss" scoped>
.daily-transaction {
	&__summary {
		padding: 0.5rem 1rem;
	}

	&__summary {
		@include flexBox(center, space-between);
		border-bottom: 0.1rem solid $gray-3;
	}

	&__date {
		width: 40%;
		color: $gray-7;
	}

	&__cost {
		flex: 1 1 30%;
		text-align: right;
		font-weight: 500;
		font-size: 1.7rem;

		&.income {
			color: $blue-color;
		}

		&.outcome {
			color: $red-color;
		}
	}

	&__list {
		padding: 0 !important;
	}
}
</style>
