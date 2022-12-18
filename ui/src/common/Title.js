import React from 'react'
import { useMediaQuery } from '@material-ui/core'
import { useTranslate } from 'react-admin'
import Logodata from '../icons/logos.png'
export const Title = ({ subTitle, args }) => {
  const translate = useTranslate()
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'))
  const text = translate(subTitle, { ...args, _: subTitle })

  if (isDesktop) {
    return (
      <span
        style={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
        }}
      >
        <img style={{ marginRight: 10 }} width={100} src={Logodata}></img>{' '}
        <span>{text ? ` - ${text}` : ''}</span>
      </span>
    )
  }
  return <span>{text ? text : '源音云'}</span>
}
