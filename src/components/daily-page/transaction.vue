<template>
	<div
		class="transaction"
		:class="classname"
		:data-id="id"
		@click.stop="handleClick()"
	>
		<span class="transaction__title">{{ categoryName }}</span>
		<div class="transaction__detail">
			<span class="transaction__method">{{ assetName }}</span>
			<span class="transaction__desc">{{ description }}</span>
			<span class="transaction__timestamp"> {{ timeString }} </span>
		</div>
		<strong class="transaction__cost"> {{ costWithComma }}원 </strong>
	</div>
</template>

<script>
import { computed } from '@vue/composition-api';

// constants
import { TRANSACTION_TYPE } from '@/constants';

// utils
import { numberWithCommas } from '@/utils/filter';
import { getAssetName, getCategoryName } from '@/utils/helper';
import { formatDate } from '@/utils/date';

export default {
	name: 'transaction',

	props: {
		// 거래 내역 Id
		id: {
			type: String,
			default: '',
			required: true,
		},

		// 소비/지출 카테고리
		category: {
			type: String,
			default: '',
			required: true,
		},

		// 현금, 카드 여부
		asset: {
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
			type: String,
			default: '0',
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
			type: Number,
			default: Date.now(),
			required: true,
		},
	},

	setup(props, { root: { $store } }) {
		// 자산 종류
		const assetName = computed(() => getAssetName(props.asset));

		// 카테고리 종류
		const categoryName = computed(() => getCategoryName(props.category));

		// 사용 금액
		const costWithComma = computed(() =>
			numberWithCommas(Number(props.cost)),
		);

		// 오전/오후 시:분
		const timeString = computed(() => {
			return formatDate(props.timestamp, 'A hh:mm');
		});

		const classname = computed(() => {
			return props.type === TRANSACTION_TYPE.INCOME
				? 'income'
				: 'outcome';
		});

		// 거래 내역 클릭 이벤트
		const handleClick = async () => {
			// 거래 내역 정보 조회
			await $store.dispatch(
				'transactions/GET_TRANSACTION_INFO',
				props.id,
			);

			// 거래 내역 상세 팝업 열기
			$store.commit('OPEN_TRANSACTION_MODAL');
		};

		return {
			assetName,
			categoryName,
			costWithComma,
			timeString,
			classname,

			handleClick,
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
