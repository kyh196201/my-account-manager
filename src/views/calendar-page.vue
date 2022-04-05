<template>
	<section class="calendar-page">
		<h2 class="sr-only">수입/지출 달력 페이지</h2>

		<div class="calendar-wrapper">
			<v-calendar
				class="calendar"
				v-model="value"
				type="month"
				:weekday="weekday"
			>
				<template v-slot:day="{ date }">
					<div class="calendar__day">
						<ul class="calendar__transactions">
							<li
								v-for="(item, index) in getTransactionsPerDate(
									date,
								).slice(0, 3)"
								:key="`${date}-${index}`"
								class="calendar__transactions__item"
							>
								<span
									class="calendar__transaction"
									:class="item.type"
								>
									{{ addComma(item.cost) }}
								</span>
							</li>
							<li
								v-if="getTransactionsPerDate(date).length > 3"
								class="calendar__transactions__item more"
							>
								더보기
							</li>
						</ul>
					</div>
				</template>
			</v-calendar>
		</div>
	</section>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

import { numberWithCommas } from '@/utils';

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
							color: $teal-9;
							text-decoration: underline;
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
