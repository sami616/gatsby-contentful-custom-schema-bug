module.exports = {
	siteMetadata: {
		title: `sr-gatsby-test`
	},
	plugins: [
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: `r6n170gty74g`,
				accessToken: `f35bd21e36cc50bf9c44c43a71025b2099dd918266252e6a472d6c0690a160ce`
			}
		},
		`gatsby-transformer-remark`
	]
}
