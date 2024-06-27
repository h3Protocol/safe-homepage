import { Grid, Typography } from '@mui/material'
import ExternalLinkCard from '@/components/common/Cards/ExternalLinkCard'
import { type BaseBlock } from '@/components/Home/types'
import layoutCss from '@/components/common/styles.module.css'
import css from './styles.module.css'

const ExternalLinksGrid = ({ title, items }: Pick<BaseBlock, 'title' | 'items'>) => (
  <Grid container className={`${layoutCss.containerShort} ${css.container}`}>
    <Grid item md={4} className={css.title}>
      <Typography variant="h3">{title}</Typography>
    </Grid>

    <Grid container item xs={12} md={8} columnSpacing={4} rowSpacing={3} justifyContent="flex-end">
      {items?.map((item) => {
        const { title = '', image, link } = item

        return (
          <Grid item xs={12} sm={6} key={item.link?.href}>
            <ExternalLinkCard title={title} image={image} link={link} />
          </Grid>
        )
      })}
    </Grid>
  </Grid>
)

export default ExternalLinksGrid
