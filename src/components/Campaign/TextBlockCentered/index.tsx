import React from 'react'
import { Button, Container, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import css from './styles.module.css'
import layoutCss from '@/components/common/styles.module.css'
import type { Entry } from 'contentful'
import type { TypeTextBlockCenteredSkeleton } from '@/contentful/types'
import { isAsset, isEntryTypeButton } from '@/lib/typeGuards'

type TextBlockCenteredEntry = Entry<TypeTextBlockCenteredSkeleton, undefined, string>

const TextBlockCentered = (props: TextBlockCenteredEntry) => {
  const { logo, cta, title, description, button } = props.fields

  return (
    <Container className={layoutCss.containerMedium}>
      <div className={css.container}>
        <div className={css.spot} />
        {isAsset(logo) && logo.fields.file?.url ? (
          <Image src={logo.fields.file.url} alt={`Cover Image for ${title}`} width="84" height="84" />
        ) : undefined}
        <Typography variant="h4" className={css.cta}>
          {cta}
        </Typography>

        <Typography variant="h1" textAlign="center">
          {title}
        </Typography>

        <Typography color="primary.light">{description}</Typography>

        {isEntryTypeButton(button) ? (
          <Link href={button.fields.btnHref} target="_blank" rel="noreferrer" passHref>
            <Button variant="contained" size="large">
              {button.fields.btnCopy}
            </Button>
          </Link>
        ) : undefined}
      </div>
    </Container>
  )
}

export default TextBlockCentered
