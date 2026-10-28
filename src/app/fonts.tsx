import { Bodoni_Moda, Jost } from 'next/font/google'

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