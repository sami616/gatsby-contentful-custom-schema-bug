const path = require('path')

exports.sourceNodes = ({ actions: { createTypes } }) => {
  createTypes(`
    type ContentfulSubSectionSibling implements Node {
      title: String
    }
    
    type ContentfulSubSection implements Node {
      title: String
    }
    
    union ContentfulSubSectionContentfulSubSectionSiblingUnion =
        ContentfulSubSection
      | ContentfulSubSectionSibling
    
    type ContentfulSection implements Node {
      title: String
      subSections: [ContentfulSubSectionContentfulSubSectionSiblingUnion]
        @addResolver(type: "link", options: { from: "subSections___NODE" })
    }
    
    type ContentfulPage implements Node {
      title: String
      slug: String
      sections: [ContentfulSection]
        @addResolver(type: "link", options: { from: "sections___NODE" })
    }
  `)
}

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
