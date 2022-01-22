// 전역 믹스인
export default {
	computed: {
		// 메인 테마 색상
		themeColor() {
			return this.$store.getters.themeColor;
		},

		// 메인 테마 색상 어두운 버전
		themeColorDark() {
			return this.$store.getters.themeColorDark;
		},
	},
};
