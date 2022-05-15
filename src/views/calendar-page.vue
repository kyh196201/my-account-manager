<template>
	<section class="calendar-page">
		<h2 class="sr-only">수입/지출 달력 페이지</h2>

		<div class="calendar-wrapper">
			<v-calendar
				class="calendar"
				:value="currentDate"
				type="month"
				:weekday="weekday"
				locale="ko"
			>
				<template v-slot:day="{ date }">
					<div class="calendar__day">
						<ul class="calendar__transactions">
							<li
								v-for="(
									value, key
								) in getTransactionDataPerDate(date)"
								:key="`calendar-item-${key}-${date}`"
								class="calendar__transactions__item"
							>
								<span
									v-if="value"
									class="calendar__transaction"
									:class="key"
								>
									{{ addComma(value) }}
								</span>
							</li>
						</ul>
					</div>
				</template>
			</v-calendar>
		</div>
	</section>
</template>

<script>
// Vuex
import { createNamespacedHelpers } from 'vuex';

// Utils
import { numberWithCommas } from '@/utils';
import { formatDate } from '@/utils/date';
import {
	filterIncomes,
	filterOutcomes,
	getTotalCost,
} from '@/utils/transactions';

const transactionsModule = createNamespacedHelpers('transactions');

export default {
	name: 'CalendarPage',

	data() {
		return {
			weekday: [0, 1, 2, 3, 4, 5, 6],
			value: '',
		};
	},

	computed: {
		...transactionsModule.mapGetters(['transactionsGroupByDate']),

		// 현재 날짜
		currentDate() {
			const date = this.$store.getters['currentDate'];

			return formatDate(date, 'YYYY-MM-DD');
		},
	},

	methods: {
		addComma(value) {
			return numberWithCommas(value);
		},

		/**
		 *
		 * @param {string} date
		 * @returns {array}
		 */
		getTransactionsPerDate(date = '') {
			return this.transactionsGroupByDate[date] ?? [];
		},

		getTransactionDataPerDate(date = '') {
			const data = this.transactionsGroupByDate[date] ?? [];

			const result = {
				outcome: 0,
				income: 0,
			};

			if (data.length) {
				const outcomes = filterOutcomes(data);
				const incomes = filterIncomes(data);

				result.outcome = getTotalCost(outcomes);
				result.income = getTotalCost(incomes);
			}

			return result;
		},
	},
};
</script>

<style lang="scss" scoped>
.calendar-page,
.calendar-wrapper {
	height: 100%;

	&::v-deep .v-calendar-weekly {
		&__head {
			&-weekday {
				flex: 1;
				padding: 0.5rem;
				border-bottom: 1px solid #e0e0e0;
				font-weight: 500;
			}
		}

		&__day {
			display: flex;
			flex-direction: column;

			.calendar {
				&__day {
					flex: 1;
					padding: 0.25rem;
					font-size: 1.2rem;
				}

				&__transactions {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-end;
					height: 100%;
					padding: 0;

					&__item {
						width: 100%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						text-align: right;

						&.more {
							color: $blue-9;
							text-decoration: underline;
							font-weight: bolder;
							cursor: pointer;
						}
					}
				}

				&__transaction {
					font-weight: 500;

					&.outcome {
						color: $outcome-color;
					}

					&.income {
						color: $income-color;
					}
				}
			}

			&-label {
				margin: 0;
				.v-btn {
					width: 100%;
					height: auto;
					padding: 0 0.5rem;
					justify-content: flex-start;
					border-radius: 0;
					font-size: 1.2rem;
				}
			}
		}
	}
}
</style>
