<template>
	<input
		class="base-input"
		type="text"
		:value="value"
		v-bind="$attrs"
		v-on="inputListeners"
	/>
</template>

<script>
export default {
	name: 'BaseInput',

	props: {
		value: {
			type: String,
			default: '',
			required: true,
		},
	},

	computed: {
		// https://kr.vuejs.org/v2/guide/components-custom-events.html#%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EC%9D%B4%EB%B2%A4%ED%8A%B8%EB%A5%BC-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90-%EB%B0%94%EC%9D%B8%EB%94%A9-%ED%95%98%EA%B8%B0
		inputListeners() {
			const vm = this;

			return Object.assign({}, this.$listeners, {
				// $listeners안에 있는 input을 오버라이드함
				input(event) {
					vm.$emit('input', event.target.value);
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.base-input {
	width: 100%;
}
</style>
