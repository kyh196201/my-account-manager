<template>
	<div class="page-progress">
		<v-row class="fill-height" align-content="center" justify="center">
			<v-col class="text-subtitle-1 text-center" cols="12">
				<h3 class="page-progress__message">페이지로 이동중입니다.</h3>
			</v-col>
			<v-col cols="8">
				<v-progress-linear
					class="page-progress__bar"
					color="indigo darken-2"
					indeterminate
					rounded
				></v-progress-linear>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: 'PageProgress',
};
</script>

<style lang="scss" scoped>
.page-progress {
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;

	&__message {
		margin-bottom: 1rem;
		font-size: 2rem;
	}

	&__bar {
		height: 0.5rem !important;
	}
}
</style>
