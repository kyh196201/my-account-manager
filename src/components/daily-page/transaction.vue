<template>
	<div class="transaction" :class="classname">
		<span class="transaction__title">{{ category }}</span>
		<div class="transaction__detail">
			<span class="transaction__method">{{ method }}</span>
			<span class="transaction__desc">{{ description }}</span>
			<span class="transaction__timestamp"> {{ timeString }} </span>
		</div>
		<strong class="transaction__cost"> {{ costWithComma }}원 </strong>
	</div>
</template>

<script>
import { computed, inject } from '@vue/composition-api';

// constants
import { TRANSACTION_TYPE } from '@/constants';

// utils
import { numberWithCommas } from '@/utils/filter';

export default {
	name: 'transaction',

	props: {
		// 소비/지출 카테고리
		category: {
			type: String,
			default: '',
			required: true,
		},

		// 현금, 카드 여부
		method: {
			type: String,
			default: '',
			required: true,
		},

		// 지출/소비 상세 내용
		description: {
			type: String,
			default: '',
			required: true,
		},

		// 지출/소비 금액
		cost: {
			type: Number,
			default: 0,
			required: true,
		},

		// 지출/소비 여부
		type: {
			type: String,
			default: TRANSACTION_TYPE.OUTCOME,
			required: true,
		},

		// 지출/소비 시간
		timestamp: {
			type: String,
			default: '',
			required: true,
		},
	},

	setup(props) {
		const $dayjs = inject('$dayjs');

		// 사용 금액
		const costWithComma = computed(() => numberWithCommas(props.cost));

		// 오전/오후 시:분
		const timeString = computed(() => {
			return $dayjs(props.timestamp).format('A hh:mm');
		});

		const classname = computed(() => {
			return props.type === TRANSACTION_TYPE.INCOME
				? 'income'
				: 'outcome';
		});

		return {
			costWithComma,
			timeString,
			classname,
		};
	},
};
</script>

<style lang="scss" scoped>
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
</style>
