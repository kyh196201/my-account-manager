<template>
	<div>
		Home Page

		<span>{{ message }}</span>
	</div>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {
	name: 'HomePage',

	setup(props) {
		console.log(props);

		const message = ref('hello');

		return {
			message,
		};
	},
};
</script>
