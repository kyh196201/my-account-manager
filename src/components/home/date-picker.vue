<template>
	<v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent>
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
			required: false,
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
