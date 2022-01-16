<template>
	<div class="daily-transaction">
		<div class="daily-transaction__summary">
			<span class="daily-transaction__date"> 2022.01.15 토요일 </span>
			<strong class="daily-transaction__const outcome"> 0원 </strong>
			<strong class="daily-transaction__const income"> 18040원 </strong>
		</div>
		<div class="daily-transaction__detail">
			<ul class="daily-transaction__list">
				<li>
					<div class="transaction income">
						<span class="transaction__title">식비</span>
						<div class="transaction__detail">
							<span class="transaction__method">현금</span>
							<span class="transaction__timestamp">
								오후 11:14
							</span>
						</div>
						<strong class="transaction__cost">18040원</strong>
					</div>
				</li>
				<li>
					<div class="transaction outcome">
						<span class="transaction__title">식비</span>
						<div class="transaction__detail">
							<span class="transaction__method">현금</span>
							<span class="transaction__timestamp">
								오후 11:14
							</span>
						</div>
						<strong class="transaction__cost">18040원</strong>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DailyTransaction',
};
</script>

<style lang="scss" scoped>
.daily-transaction {
	&__summary {
		padding: 0.5rem 1rem;
	}

	&__summary {
		@include flexBox(center, space-between);
		border-bottom: 0.1rem solid $gray-3;
	}

	&__date {
		width: 60%;
		color: $gray-7;
	}

	&__const {
		flex: 1 1 20%;
		text-align: right;
		font-weight: 500;
		font-size: 1.7rem;

		&.income {
			color: $blue-color;
		}

		&.outcome {
			color: $red-color;
		}
	}

	&__detail {
		.transaction {
			@include flexBox(center, space-between);
			padding: 0.75rem 1rem;
			color: $gray-7;

			&__title,
			&__cost {
				width: 25%;
			}

			&__detail {
				display: flex;
				flex-direction: column;
				justify-content: center;
				width: 50%;
			}

			&__cost {
				text-align: right;
				font-size: 1.7rem;
				font-weight: 500;
			}

			&.income {
				.transaction {
					&__cost {
						color: $blue-color;
					}
				}
			}

			&.outcome {
				.transaction {
					&__cost {
						color: $red-color;
					}
				}
			}
		}
	}
}
</style>
