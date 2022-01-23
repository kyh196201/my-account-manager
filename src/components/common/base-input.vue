<template>
	<input
		class="base-input"
		type="text"
		:value="value"
		@input="$emit('input', $event.target.value)"
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
};
</script>

<style lang="scss" scoped>
.base-input {
	width: 100%;
}
</style>
