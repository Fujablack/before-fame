import { Bodoni_Moda, Jost, Ms_Madi  } from 'next/font/google'

export const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bodoni',
  style: ['normal', 'italic'],
  axes: ['opsz'], // optional: thinner hairlines at large sizes, like your screenshot
})

export const jost = Jost({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jost',
})

export const msMadi = Ms_Madi({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-ms-madi',
});