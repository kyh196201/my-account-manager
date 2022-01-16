<template>
	<section class="daily-page">
		<h2 class="sr-only">일일 수입/지출 페이지</h2>

		<div class="daily-page__inner">
			<ul class="daily-page__list">
				<li class="daily-page__item">
					<daily-transaction></daily-transaction>
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
import dailyTransaction from '@/components/daily-page/daily-transaction.vue';

export default {
	name: 'DailyPage',

	components: {
		dailyTransaction,
	},
};
</script>

<style lang="scss" scoped>
@import '@/scss/views/daily-page.scss';
</style>
