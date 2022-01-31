<template>
	<div class="transaction-form-wrapper">
		<form
			class="transaction-form form"
			:class="[transactionType]"
			@submit.prevent="handleSubmit()"
		>
			<fieldset class="transaction-form__fieldset">
				<legend class="sr-only">거래 내역 상세</legend>

				<!-- 날짜 -->
				<div class="form-control">
					<label class="form-control__label"> 날짜 </label>
					<div class="form-control__box">
						<div class="transaction-form__date-box">
							<BaseInput
								type="text"
								:value="formattedDate"
								readonly
								@focus="openDatePicker()"
							/>
							<BaseInput
								type="text"
								:value="formattedTime"
								readonly
								@focus="openTimePicker()"
							/>
						</div>
					</div>
				</div>
				<!-- 자산 -->
				<div class="form-control">
					<label class="form-control__label"> 자산 </label>
					<div class="form-control__box">
						<v-select
							class="transaction-form__assets"
							v-model="asset"
							:items="assets"
							item-text="name"
							item-value="value"
							:label="asset ? '' : '자산을 선택해주세요.'"
							hide-details
							single-line
							solo
							flat
							:color="themeColorDark"
						></v-select>
					</div>
				</div>
				<!-- 분류 -->
				<div class="form-control">
					<label class="form-control__label"> 분류 </label>
					<div class="form-control__box">
						<v-select
							class="transaction-form__categories"
							v-model="category"
							:items="categories"
							item-text="name"
							item-value="value"
							:label="category ? '' : '분류를 선택해주세요.'"
							hide-details
							single-line
							solo
							flat
							:color="themeColorDark"
						></v-select>
					</div>
				</div>
				<!-- 금액 -->
				<div class="form-control">
					<label class="form-control__label"> 금액 </label>
					<div class="form-control__box">
						<BaseInput
							v-model="computedCost"
							@keyup="handleKeyupCost($event)"
						></BaseInput>
					</div>
				</div>
				<!-- 내용 -->
				<div class="form-control">
					<label class="form-control__label"> 내용 </label>
					<div class="form-control__box">
						<BaseInput v-model="description"></BaseInput>
					</div>
				</div>
			</fieldset>

			<fieldset class="transaction-form__fieldset">
				<legend class="sr-only">거래 내역 부가 정보</legend>
				<div class="form-control">
					<label class="form-control__label"> 메모 </label>
					<div class="form-control__box">
						<BaseInput v-model="memo"></BaseInput>
					</div>
				</div>
			</fieldset>

			<button type="submit" class="transaction-form__submit">
				<span>저장하기</span>
			</button>
		</form>

		<!-- 데이트피커 모달 -->
		<template v-if="isDatePickerOpen">
			<DatePicker
				:value="date"
				@input="handleInputDatePicker($event)"
				@cancel="closeDatePicker()"
			></DatePicker>
		</template>

		<!-- 타임피커 모달 -->
		<template v-if="isTimePickerOpen">
			<TimePicker
				:value="time"
				@input="handleInputTimePicker($event)"
				@cancel="closeTimePicker()"
			></TimePicker>
		</template>
	</div>
</template>

<script>
import { reactive, computed, toRefs, ref } from '@vue/composition-api';

// components
import BaseInput from '@/components/common/base-input.vue';
import DatePicker from '@/components/home/date-picker.vue';
import TimePicker from '@/components/home/time-picker.vue';

// utils
import { numberWithCommas } from '@/utils/filter';
import { formatDate, getToday, formatTime } from '@/utils/date';
import { ASSETS, CATEGORIES } from '@/constants';

export default {
	name: 'TransactionForm',

	components: {
		BaseInput,
		DatePicker,
		TimePicker,
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
		// 현재 시간 세팅
		const today = getToday();

		const state = reactive({
			date: today.format('YYYY-MM-DD'),
			time: today.format('HH:mm'),
			category: '',
			asset: '',
			cost: '',
			description: '',
			memo: '',
		});

		// 금액
		const computedCost = computed({
			get() {
				const { cost } = state;

				return cost.trim() ? numberWithCommas(cost.trim()) : '';
			},

			set(value) {
				// NOTE(01-23)
				// https://stackoverflow.com/questions/10610402/javascript-replace-all-commas-in-a-string
				// state.cost = value.replace(/,/g, '');
				// https://mi-nya.tistory.com/248
				state.cost = value.replace(/[^0-9]+/g, '');
			},
		});

		//#region 데이트피커
		const isDatePickerOpen = ref(false);

		const openDatePicker = () => (isDatePickerOpen.value = true);

		const closeDatePicker = () => (isDatePickerOpen.value = false);

		const handleInputDatePicker = $event => {
			state.date = $event;

			closeDatePicker();
		};

		// 년-월-일 요일로 포맷팅된 날짜
		const formattedDate = computed(() => {
			return formatDate(state.date, 'YYYY-MM-DD ddd');
		});
		//#endregion

		//#region 타임피커
		const isTimePickerOpen = ref(false);

		const openTimePicker = () => (isTimePickerOpen.value = true);

		const closeTimePicker = () => (isTimePickerOpen.value = false);

		const handleInputTimePicker = $event => {
			state.time = $event;

			closeTimePicker();
		};

		const formattedTime = computed(() => {
			return formatTime(state.time);
		});
		//#endregion

		//#region 자산, 분류
		const assets = ref(ASSETS.slice());
		const categories = ref(CATEGORIES.slice());
		//#endregion

		//#region 이벤트 핸들러
		// 금액 keyup 이벤트 핸들러
		const handleKeyupCost = event => {
			const value = event.target.value.trim();

			if (!value.length) return;

			const reg = /[^\d,]+$/;

			// 숫자, 콤마를 제외한 문자가 있는지 확인
			const checkWord = (string = '') => {
				return reg.test(string);
			};

			if (checkWord(value)) {
				state.cost = value.replace(/[^\d]+$/, '');
			}
		};

		const handleSubmit = () => {
			console.log(state);
		};
		//#endregion

		return {
			computedCost,
			handleKeyupCost,
			handleSubmit,

			// 데이트피커
			isDatePickerOpen,
			formattedDate,
			openDatePicker,
			closeDatePicker,
			handleInputDatePicker,

			// 타임피커
			isTimePickerOpen,
			formattedTime,
			openTimePicker,
			closeTimePicker,
			handleInputTimePicker,

			// 자산
			assets,

			// 분류
			categories,

			...toRefs(state),
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
		flex: 1 1 20%;
		min-width: 0;
		padding: 1rem;
		color: $gray-7;
		@include ellipsis(1);
	}

	&__box {
		flex: 1 1 80%;
		min-width: 0;
		padding: 1rem;
		border-bottom: 0.1rem solid $gray-5;
		transition: border-color 0.2s;
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

	&__date-box {
		display: flex;

		.base-input {
			flex: 1 1 50%;
			font-weight: 500;
		}
	}

	// 자산, 분류
	&__assets,
	&__categories {
		margin: 0;
		padding: 0;

		&.v-input {
			font-size: 1.5rem;
		}

		&::v-deep .v-input__control {
			min-height: auto !important;

			.v-input__slot {
				padding: 0 !important;
			}

			.v-label {
				font-size: 1.3rem;
			}

			.v-select__selections {
				input {
					padding: 0;
				}

				.v-select__selection--comma {
					margin: 0;
				}
			}
		}
	}

	&__submit {
		display: block;
		width: 100%;
		margin-top: 3rem;
		padding: 1rem;
		border-radius: 0.6rem;
		background-color: $red-color;
		text-align: center;
		color: $white-color;
		font-size: 1.5rem;
	}
}

::v-deep .v-list-item__title {
	font-size: 1.3rem !important;
}
</style>
