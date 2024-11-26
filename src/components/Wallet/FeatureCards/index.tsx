import { Button, Container, Grid, Typography } from '@mui/material'
import LinkButton from '@/components/common/LinkButton'
import { WALLET_LINK } from '@/config/constants'
import type { BaseBlock } from '@/components/Home/types'
import layoutCss from '@/components/common/styles.module.css'
import css from './styles.module.css'

const CardContent = ({ caption, title, text, link }: Partial<BaseBlock>) => (
  <div className={css.cardContent}>
    <Typography variant="caption" className={css.caption}>
      {caption}
    </Typography>

    <Typography variant="h4" className={css.title}>
      {title}
    </Typography>

    <Typography color="primary.light">{text}</Typography>

    {link ? (
      <LinkButton underline={false} href={link.href}>
        {link.title}
      </LinkButton>
    ) : undefined}
  </div>
)

type FeatureCardsProps = Omit<BaseBlock, 'items'> & {
  items: Array<Partial<BaseBlock> & { isNew: boolean; fullWidth: boolean }>
}

const FeatureCards = ({ title, text, items = [] }: FeatureCardsProps) => {
  // extract the last item from the array
  const lastItem = items[items.length - 1]
  const restItems = items.slice(0, -1)

  return (
    <Container className={layoutCss.container}>
      <Grid container justifyContent="space-between" columnSpacing="30px" rowGap="30px">
        <Grid item xs={12} md={7}>
          <Typography variant="h2">{title}</Typography>
        </Grid>

        <Grid item xs={12} md={5} alignContent="flex-end">
          <Typography variant="h5">{text}</Typography>
        </Grid>
      </Grid>

      <Grid container mt={{ xs: '50px', md: '100px' }} columnSpacing="30px" rowGap="30px">
        {restItems.map((item, index) => {
          if (item.fullWidth) {
            return (
              <Grid container item key={index} xs={12} width="100%">
                <div className={`${css.card} ${css.fullWidth}`}>
                  {item.isNew && <div className={css.newBadge}>New</div>}

                  <Grid item md={1} />
                  <Grid item xs={12} md={4} display="contents">
                    <img className={css.image} src={item.image?.src} alt={item.image?.alt} />
                  </Grid>
                  <Grid item md={1} />

                  <Grid item xs={12} md={6} className={css.centerContent}>
                    <CardContent {...item} />
                  </Grid>
                </div>
              </Grid>
            )
          }

          return (
            <Grid item key={index} xs={12} md={6}>
              <div className={`${css.card} ${css.stacked}`}>
                {item.isNew && <div className={css.newBadge}>New</div>}

                <img className={css.image} src={item.image?.src} alt={item.image?.alt} />

                <CardContent {...item} />
              </div>
            </Grid>
          )
        })}

        {/* last item is part of the component */}
        {lastItem && (
          <Grid item xs={12}>
            <div className={`${css.card} ${css.lastCard}`}>
              <img className={css.image} src={lastItem.image?.src} alt={lastItem.image?.alt} />

              <div className={css.centerContent}>
                <CardContent {...lastItem} />
              </div>
            </div>
          </Grid>
        )}
      </Grid>

      <div className={css.cta}>
        <Typography variant="h5">
          Ready to have a <b>{`Safe{Wallet}`}</b>?
        </Typography>
        <Button variant="contained" size="large" href={WALLET_LINK}>
          Get started
        </Button>
      </div>
    </Container>
  )
}

export default FeatureCards
