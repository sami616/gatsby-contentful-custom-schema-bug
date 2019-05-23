import React from 'react'
import { graphql } from 'gatsby'

const Page = ({ data: { contentfulPage } }) => {
	console.log(contentfulPage)
	return <div>Hello world</div>
}

export default Page

// QUERY
export const query = graphql`
	query getPage($slug: String!) {
		contentfulPage(slug: { eq: $slug }) {
			id
			title
			slug
			nav {
				... on ContentfulNavigation {
					heading
					items {
						label
						page {
							id
							title
							slug
						}
						items {
							label
							page {
								id
								title
								slug
							}
							items {
								label
								page {
									id
									title
									slug
								}
							}
						}
					}
				}
			}
		}
	}
`
