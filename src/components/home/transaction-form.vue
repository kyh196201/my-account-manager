<template>
	<div class="transaction-form">폼</div>
</template>

<script>
export default {
	name: 'TransactionForm',

	props: {
		transactionType: {
			type: String,
			default: 'income',
			required: false,
		},
	},
};
</script>

<style lang="scss" scoped></style>
