<template>
	<component :is="layout">
		<slot></slot>
	</component>
</template>

<script>
// Layouts
import defaultLayout from './default-layout.vue';

export default {
	components: {
		defaultLayout,
	},

	data() {
		return {
			layout: 'defaultLayout',
		};
	},
};
</script>

<style></style>
