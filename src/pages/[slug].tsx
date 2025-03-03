import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import client from '@/lib/contentful'
import { type TypeLandingPageSkeleton } from '@/contentful/types'
import Page, { type LandingPageProps } from '@/components/common/Page'

const LandingPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  if (!props.landingPage) return <p>Loading...</p> // Avoids crash if fallback is true

  return <Page {...props} />
}

export const getStaticProps: GetStaticProps<LandingPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string

    const landingPageEntries = await client.getEntries<TypeLandingPageSkeleton>({
      content_type: 'landingPage',
      'fields.slug': slug,
      include: 3,
    })

    const landingPage = landingPageEntries.items[0]

    if (!landingPage) {
      return { notFound: true } // Triggers 404 if no content is found
    }

    return {
      props: { landingPage },
      revalidate: 60, // Optional: Regenerates pages every 60 seconds
    }
  } catch (error) {
    console.error('Error fetching Contentful data:', error)
    return { notFound: true }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const response = await client.getEntries<TypeLandingPageSkeleton>({ content_type: 'landingPage' })
    const paths = response.items.map((item) => ({
      params: { slug: item.fields.slug },
    }))

    return {
      paths,
      fallback: 'blocking', // Ensures pages are pre-built before serving
    }
  } catch (error) {
    console.error('Error fetching Contentful paths:', error)
    return { paths: [], fallback: false } // No paths = No dynamic pages
  }
}

export default LandingPage
