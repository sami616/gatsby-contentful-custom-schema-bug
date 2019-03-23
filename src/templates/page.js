import React from 'react'
import { graphql } from 'gatsby'

const Page = ({
  data: {
    contentfulPage: { id, title, sections }
  }
}) => (
    <div key={id}>
      <h1>{title}</h1>
      {sections && sections.map(s => <p>{s.title}</p>)}
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
    		}
		}
	}
`
