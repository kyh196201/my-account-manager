<template>
	<ul class="counter">
		<li class="counter__box">
			<span class="counter__title">수입</span>
			<strong class="counter__ammount income">{{ income }}</strong>
		</li>
		<li class="counter__box">
			<span class="counter__title">지출</span>
			<strong class="counter__ammount outcome">{{ outcome }}</strong>
		</li>
		<li class="counter__box">
			<span class="counter__title">합계</span>
			<strong class="counter__ammount">{{ totalCost }}</strong>
		</li>
	</ul>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

// Utils
import { numberWithCommas } from '@/utils/filter';

const { mapGetters } = createNamespacedHelpers('transactions');

export default {
	name: 'TotalCounter',

	computed: {
		...mapGetters(['totalIncome', 'totalOutcome']),

		income() {
			return numberWithCommas(this.totalIncome);
		},

		outcome() {
			return numberWithCommas(this.totalOutcome);
		},

		// 총 수입, 지출 합계
		totalCost() {
			return numberWithCommas(this.totalIncome + this.totalOutcome);
		},
	},
};
</script>

<style lang="scss" scoped>
.counter {
	display: flex;
	padding: 0;
	background-color: $white-color;
	border-left: none;
	border-right: none;
	color: $black-color;

	&__box {
		width: 33.33%;
		padding: 0.5rem 1rem;
		text-align: center;
	}

	&__ammount {
		display: block;
		margin-top: 0.5rem;
		font-weight: 700;
		font-size: 1.2em;
		@include ellipsis(1);

		&.income {
			color: $income-color;
		}

		&.outcome {
			color: $outcome-color;
		}
	}
}
</style>
