<template>
	<form class="transaction-form form" :class="[transactionType]">
		<fieldset>
			<legend class="sr-only">거래 내역 상세</legend>

			<!-- 날짜 -->
			<div class="form-control">
				<label class="form-control__label"> 날짜 </label>
				<div class="form-control__box">
					<input type="text" value="날짜" />
				</div>
			</div>
			<!-- 자산 -->
			<div class="form-control">
				<label class="form-control__label"> 자산 </label>
				<div class="form-control__box">
					<input type="text" value="현금" />
				</div>
			</div>
			<!-- 분류 -->
			<div class="form-control">
				<label class="form-control__label"> 분류 </label>
				<div class="form-control__box">
					<input type="text" value="현금" />
				</div>
			</div>
			<!-- 금액 -->
			<div class="form-control">
				<label class="form-control__label"> 금액 </label>
				<div class="form-control__box">
					<BaseInput v-model="cost"></BaseInput>
				</div>
			</div>
			<!-- 내용 -->
			<div class="form-control">
				<label class="form-control__label"> 내용 </label>
				<div class="form-control__box">
					<input type="text" value="현금" />
				</div>
			</div>
		</fieldset>

		<fieldset>
			<legend class="sr-only">거래 내역 부가 정보</legend>
			<div class="form-control">
				<label class="form-control__label"> 메모 </label>
				<div class="form-control__box">
					<input type="text" value="사진" />
				</div>
			</div>
		</fieldset>
	</form>
</template>

<script>
import { reactive, computed } from '@vue/composition-api';

// components
import BaseInput from '@/components/common/base-input.vue';

// utils
import { numberWithCommas } from '@/utils/filter';

export default {
	name: 'TransactionForm',

	components: {
		BaseInput,
	},

	props: {
		// 거래 유형
		transactionType: {
			type: String,
			default: 'income',
			required: false,
		},
	},

	setup() {
		const state = reactive({
			cost: '123',
		});

		const cost = computed({
			get() {
				return state.cost.trim()
					? numberWithCommas(state.cost.trim())
					: state.cost;
			},

			set(value) {
				// NOTE(01-23)
				// https://stackoverflow.com/questions/10610402/javascript-replace-all-commas-in-a-string
				state.cost = value.replace(/,/g, '');
				// https://mi-nya.tistory.com/248
				// state.cost = value.replace(/[^0-9]+/g, '');
			},
		});

		return {
			cost,
		};
	},
};
</script>

<style lang="scss" scoped>
.form-control {
	display: flex;
	align-items: center;
	width: 100%;
	font-size: 1.5rem;

	&__label {
		flex: 1 1 10%;
		min-width: 0;
		padding: 1rem;
		color: $gray-7;
		@include ellipsis(1);
	}

	&__box {
		flex: 1 1 90%;
		min-width: 0;
		padding: 1rem;
		border-bottom: 0.1rem solid $gray-5;
	}
}

.transaction-form {
	// NOTE(01-23)
	// https://sass-lang.com/documentation/at-rules/control/each#with-maps
	$types: (
		'income': #{$income-color},
		'outcome': #{$outcome-color},
		'transfer': #{$transfer-color},
	);

	@each $name, $color in $types {
		&.#{$name} {
			.form-control {
				&__box {
					// NOTE(01-23)
					// https://developer.mozilla.org/ko/docs/Web/CSS/:focus-within
					&:focus-within {
						border-color: $color;
					}
				}
			}
		}
	}
}
</style>
