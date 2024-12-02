import MetaTags from '@/components/common/MetaTags'

const Metadata = () => {
  const title = 'INTRODUCING SAFENET - NEW CHAIN ABSTRACTION PROTOCOL BY SAFE'
  const description = 'Instant Cross-chain Transactions. Execution Guarantees. On any network.'

  return <MetaTags pageTitle={title} description={description} image="/images/Safenet/meta-image-safenet.jpg" />
}

export default Metadata
