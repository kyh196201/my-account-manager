module.exports = {
	devServer: {
		overlay: false,
		open: true,
	},

	transpileDependencies: ['vuetify'],

	css: {
		loaderOptions: {
			scss: {
				additionalData: `
					@import "@/scss/_mixins.scss";
				`,
			},
		},
	},
};
