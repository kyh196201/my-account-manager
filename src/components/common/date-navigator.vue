<template>
	<div class="date-navigator">
		<v-btn icon class="date-navigator__btn" @click="handleClickPrev()">
			<v-icon small color="white">fas fa-caret-left</v-icon>
		</v-btn>
		<span class="date-navigator__date"> {{ formattedCurrentDate }} </span>
		<v-btn icon class="date-navigator__btn" @click="handleClickNext()">
			<v-icon small color="white">fas fa-caret-right</v-icon>
		</v-btn>
	</div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

// utils
import { addMonth, addYear } from '@/utils/date';

export default {
	name: 'DateNavigator',

	computed: {
		...mapGetters(['dateType', 'currentDate', 'formattedCurrentDate']),

		// YYYY년 m월 타입 여부
		isMonthType() {
			return this.dateType === 'month';
		},
	},

	methods: {
		...mapMutations(['SET_CURRENT_DATE']),

		// next 버튼 클릭 이벤트
		handleClickNext() {
			const newDate = this.isMonthType
				? addMonth(this.currentDate, 1)
				: addYear(this.currentDate, 1);
			this.SET_CURRENT_DATE(newDate.toISOString());
		},

		// prev 버튼 클릭 이벤트
		handleClickPrev() {
			const newDate = this.isMonthType
				? addMonth(this.currentDate, -1)
				: addYear(this.currentDate, -1);
			this.SET_CURRENT_DATE(newDate.toISOString());
		},
	},
};
</script>

<style scoped lang="scss">
.date-navigator {
	display: flex;
	align-items: center;

	&__date {
		color: $white-color;
	}

	&__btn {
		&.v-btn--icon {
			width: 3.6rem;
			height: 3.6rem;

			.v-icon {
				width: 2.4rem;
				height: 2.4rem;
				font-size: 2rem !important;
			}
		}
	}
}
</style>
