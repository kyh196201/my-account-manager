<template>
	<div class="daily-transaction">
		<div class="daily-transaction__summary">
			<span class="daily-transaction__date"> 2022.01.15 토요일 </span>
			<strong class="daily-transaction__const income">
				{{ totalIncome }}원
			</strong>
			<strong class="daily-transaction__const outcome">
				{{ totalOutcome }}원
			</strong>
		</div>
		<div class="daily-transaction__detail">
			<ul class="daily-transaction__list">
				<li>
					<div class="transaction income">
						<span class="transaction__title">식비</span>
						<div class="transaction__detail">
							<span class="transaction__method">현금</span>
							<span class="transaction__desc">붕어빵 사먹음</span>
							<span class="transaction__timestamp">
								오후 11:14
							</span>
						</div>
						<strong class="transaction__cost">18040원</strong>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { ref, computed } from '@vue/composition-api';

const TRANSACTION_TYPE = {
	INCOME: 'income', // 수입
	OUTCOME: 'outcome', // 지출
};

const mockData = {
	date: '2022-01-15',
	transactionList: [
		{
			category: '식비',
			method: '현금',
			description: '붕어빵',
			cost: '8050',
			type: TRANSACTION_TYPE.OUTCOME,
		},
		{
			category: '식비',
			method: '카드',
			description: '점심 식비',
			cost: '10000',
			type: TRANSACTION_TYPE.OUTCOME,
		},
	],
};

export default {
	name: 'DailyTransaction',

	setup() {
		const data = ref(mockData);

		// 총 지출 금액
		const totalOutcome = computed(() => {
			const transactionList = data.value.transactionList;
			let total = 0;

			for (let i = 0; i < transactionList.length; i++) {
				const transaction = transactionList[i];
				if (transaction.type === TRANSACTION_TYPE.OUTCOME) {
					total += transaction.cost;
				}
			}

			return total;
		});

		// 총 수입 금액
		const totalIncome = computed(() => {
			const transactionList = data.value.transactionList;
			let total = 0;

			for (let i = 0; i < transactionList.length; i++) {
				const transaction = transactionList[i];
				if (transaction.type === TRANSACTION_TYPE.INCOME) {
					total += transaction.cost;
				}
			}

			return total;
		});

		return {
			data,
			totalOutcome,
			totalIncome,
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
		width: 60%;
		color: $gray-7;
	}

	&__const {
		flex: 1 1 20%;
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

	&__detail {
		.transaction {
			@include flexBox(center, space-between);
			padding: 0.75rem 1rem;
			color: $gray-7;

			&__title,
			&__cost {
				width: 25%;
			}

			&__detail {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 50%;
			}

			&__cost {
				text-align: right;
				font-size: 1.7rem;
				font-weight: 500;
			}

			&__desc {
				font-weight: bolder;
			}

			&.income {
				.transaction {
					&__cost {
						color: $blue-color;
					}
				}
			}

			&.outcome {
				.transaction {
					&__cost {
						color: $red-color;
					}
				}
			}
		}
	}
}
</style>
