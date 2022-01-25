<template>
	<v-dialog ref="dialog" v-model="modal" persistent>
		<v-time-picker
			v-if="modal"
			v-model="time"
			format="ampm"
			full-width
			ampm-in-title
			scrollable
			:color="themeColorDark"
			class="time-picker"
		>
			<v-spacer></v-spacer>
			<v-btn
				class="time-picker__btn"
				text
				:color="themeColorDark"
				@click="$emit('cancel')"
			>
				취소
			</v-btn>
			<v-btn
				class="time-picker__btn"
				text
				:color="themeColorDark"
				@click="$emit('input', time)"
			>
				확인
			</v-btn>
		</v-time-picker>
	</v-dialog>
</template>

<script>
// utils
import { validateHhMm, getToday } from '@/utils/date';

export default {
	name: 'TimePicker',

	props: {
		value: {
			type: String,
			default: getToday().format('HH:mm'),
			required: true,
			validator(time) {
				return validateHhMm(time);
			},
		},
	},

	data() {
		return {
			modal: true,
			time: '',
		};
	},

	watch: {
		value: {
			handler(newValue) {
				this.time = newValue;
			},

			immediate: true,
		},
	},
};
</script>

<style lang="scss" scoped>
.time-picker {
	&__btn {
		font-size: 1.5rem !important;
	}
}
</style>
