import React from 'react'
import { graphql } from 'gatsby'

const Page = ({
	data: {
		contentfulPage: { id, title, sections }
	}
}) => (
		<div key={id}>
			<h1>{title}</h1>
			{sections.map(s => <p>
				<h3>{s.title}</h3>
				{!s.subSections && <p>:( <b>subSections</b> field is <b>null</b> because the it is <i>not</i> referencing  at least one of all of the available union types, in this example only <b>ContentfulSubSection</b> is being referenced and not <b>ContentfulSubSectionSibling</b></p>}
				{s.subSections && s.subSections.map(ss => (
					<p>{ss.title}</p>
				))}
			</p>)}
		</div>
	)

export default Page

// QUERY
export const query = graphql`
	query getPage($slug: String!) {
		contentfulPage(slug: { eq: $slug }) {
			id
			title
			sections {
				title
				subSections {
					__typename
					... on ContentfulSubSection {
						title
					}
					... on ContentfulSubSectionSibling {
						title
					}
				}
			}
			}
	}
`
