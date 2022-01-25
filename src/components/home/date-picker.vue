<template>
	<v-dialog ref="dialog" v-model="modal" persistent>
		<v-date-picker
			v-model="date"
			scrollable
			full-width
			:color="themeColorDark"
			class="date-picker"
		>
			<v-spacer></v-spacer>
			<v-btn
				class="date-picker__btn"
				text
				:color="themeColorDark"
				@click="$emit('cancel')"
			>
				취소
			</v-btn>
			<v-btn
				class="date-picker__btn"
				text
				:color="themeColorDark"
				@click="$emit('input', date)"
			>
				확인
			</v-btn>
		</v-date-picker>
	</v-dialog>
</template>

<script>
import { getToday, validateDate, DATE_FORMATS } from '@/utils/date';

export default {
	name: 'DatePicker',

	props: {
		value: {
			type: String,
			default: getToday().format(DATE_FORMATS.DATE),
			required: true,
			validator(date) {
				return validateDate(date);
			},
		},
	},

	data() {
		return {
			modal: true,
			date: '',
		};
	},

	watch: {
		/**
		 * NOTE(01-25) v-date-picker에 연결한 v-model에 value를 바로 연결할 경우 날짜를 선택할 때
		 * props를 바로 업데이트하게 되므로 뷰의 "안티패턴"에 해당하게된다.
		 * 따라서, 최초에 value를 받아서 내부에 선언한 date 변수에 값을 세팅하고, 이 date 변수를 v-date-picker의
		 * v-model과 연결시킨다.
		 * 현재는 확인 버튼을 눌러서 값을 고를 수 있게 작성되어있는데, handler안에서 값이 변경될 때마다
		 * $emit('input', date); $emit('cancel');을 실행할 경우 값을 고름과 동시에 모달을 닫고, 부모 컴포넌트의
		 * 데이터를 업데이트할 수 있다.
		 */
		value: {
			handler(newValue) {
				this.date = newValue;
			},

			immediate: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.date-picker {
	&__btn {
		font-size: 1.5rem !important;
	}
}

.v-picker {
	font-size: 1.5rem !important;
}
</style>
