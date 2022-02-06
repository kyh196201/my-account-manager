<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		transition="dialog-bottom-transition"
	>
		<section class="transaction-detail">
			<header
				class="transaction-detail__header"
				:style="{ 'background-color': themeColor }"
			>
				<button @click="close()" class="transaction-detail__button">
					<v-icon>fas fa-times</v-icon>
				</button>
				<h2 class="transaction-detail__title">{{ title }}</h2>
				<div class="transaction-detail__buttons">
					<button class="transaction-detail__button">
						<v-icon>fas fa-microphone</v-icon>
					</button>
				</div>
			</header>
			<div class="transaction-detail__content">
				<ul class="transaction-detail__tabs">
					<li
						v-for="(item, index) in transactionTypeList"
						:key="`nav-item-${index}`"
						class="transaction-detail__tab"
					>
						<label
							class="tab"
							:class="[item.value, tabActiveClass(item.value)]"
						>
							<span class="tab__title">{{ item.text }}</span>
							<input
								type="radio"
								v-model="transactionType"
								:value="item.value"
							/>
						</label>
					</li>
				</ul>
				<!-- 폼 -->
				<TransactionForm
					:transaction-type="transactionType"
				></TransactionForm>
			</div>
		</section>
	</v-dialog>
</template>

<script>
import { computed, ref } from '@vue/composition-api';

// components
import TransactionForm from './transaction-form.vue';

import { TRANSACTION_TYPE } from '@/constants';

export default {
	name: 'TransactionDetail',

	components: {
		TransactionForm,
	},

	setup(_, { root: { $store }, emit }) {
		const dialog = ref(true);

		//#region 스토어 거래 내역 정보
		const transactionInfo = computed(
			() => $store.getters['transactions/transactionInfo'],
		);

		// 수정 중 여부
		const isEditing = computed(
			() => $store.getters['transactions/isEditing'],
		);
		//#endregion

		// 거래 타입 리스트
		const transactionTypeList = [
			{
				value: TRANSACTION_TYPE.INCOME,
				text: '수입',
			},
			{
				value: TRANSACTION_TYPE.OUTCOME,
				text: '지출',
			},
			{
				value: TRANSACTION_TYPE.TRANSFER,
				text: '이체',
			},
		];

		// 선택된 거래 타입
		const transactionType = ref(TRANSACTION_TYPE.INCOME);

		if (isEditing.value) {
			transactionType.value = transactionInfo.value.type;
		}

		// 탭 active 클래스
		const tabActiveClass = computed(() => {
			return value => (value === transactionType.value ? 'active' : '');
		});

		// 타이틀
		const title = computed(() => {
			return (
				transactionTypeList.find(
					item => item.value === transactionType.value,
				)?.text ?? ''
			);
		});

		const close = () => {
			emit('close');
		};

		return {
			dialog,
			title,

			transactionTypeList,
			transactionType,
			tabActiveClass,

			close,
		};
	},
};
</script>

<style lang="scss" scoped>
.transaction-detail {
	display: flex;
	flex-direction: column;
	height: 100%;
	background-color: $white-color;

	&__header {
		display: flex;
		align-items: center;
		padding: 1rem;
		color: $white-color;
		box-shadow: rgba(0, 0, 0, 0.24) 0 0.3rem 0.8rem;
	}

	&__title {
		font-size: 2rem;
	}

	&__buttons {
		margin-left: auto;
	}

	&__button {
		padding: 1rem;
		color: inherit;

		i {
			font-size: 2rem;
			color: inherit;
		}
	}

	&__content {
		flex: 1;
		padding: 2rem;
	}

	&__tabs {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 2rem;
		padding: 0;
	}

	&__tab {
		flex: 1 1;
		width: calc((100% - 2rem) / 3);

		&:not(:last-child) {
			margin-right: 1rem;
		}

		.tab {
			display: block;
			padding: 1rem;
			text-align: center;
			font-size: 1.5rem;
			border: 0.15rem solid $gray-5;
			background-color: $gray-1;
			border-radius: 0.4rem;
			transition: background-color 0.2s, color 0.2s;

			input {
				display: none;
			}

			&.active {
				background-color: $white-color;
				border-color: $outcome-color;
				color: $outcome-color;
				font-weight: 600;

				// 수입
				&.income {
					border-color: $income-color;
					color: $income-color;
				}

				// 이체
				&.transfer {
					border-color: $transfer-color;
					color: $transfer-color;
				}
			}
		}
	}
}
</style>
