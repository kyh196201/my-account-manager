<template>
	<div class="transaction-skeleton">
		<v-skeleton-loader
			v-for="line in lines"
			type="chip, image"
			v-bind="attrs"
			:key="line"
		></v-skeleton-loader>
	</div>
</template>

<script>
export default {
	name: 'TransactionSkeleton',

	data() {
		return {
			attrs: {},
		};
	},

	props: {
		lines: {
			type: Number,
			default: 1,
			required: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.transaction-skeleton {
	.v-skeleton-loader {
		padding: 1rem;
		border-radius: 0.4rem;
		box-shadow: $transaction-box-shadow;

		&:not(:last-child) {
			margin-bottom: 1rem;
		}

		::v-deep .v-skeleton-loader {
			&__chip,
			&__image {
				border-radius: 0.4rem;
				background-color: lightgray;
			}

			&__chip {
				height: 2rem;
				width: 10rem;
				margin-bottom: 1rem;
			}

			&__image {
				height: 5rem;
			}
		}
	}
}
</style>
