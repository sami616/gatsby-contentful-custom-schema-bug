const path = require('path')

exports.createPages = ({ graphql, actions }) =>
  new Promise(async (resolve, reject) => {
    // Fetch data
    const { data: { allContentfulPage } } = await graphql(`
			{
				allContentfulPage {
					edges {
						node {
							slug
						}
					}
				}
			}
		`).catch(err => reject(err))

    // Create pages
    allContentfulPage.edges.forEach(({ node: { slug } }) => {
      actions.createPage({
        path: slug,
        component: path.resolve('./src/templates/page.js'),
        context: { slug }
      })
    })
    resolve()
  })
