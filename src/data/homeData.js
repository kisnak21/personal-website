import avatarImg from '../assets/1.png'

export const terminalLines = [
  { prefix: '$', text: 'npm run info', className: 'text-on-surface' },
  {
    prefix: '>',
    text: 'Education: Computer System Engineering',
    className: 'text-on-surface-variant',
    indent: true,
  },
  {
    prefix: '>',
    text: 'Core Tech: React, Next.js, Tailwind, Node',
    className: 'text-on-surface-variant',
    indent: true,
  },
  {
    prefix: '>',
    text: 'Current Goal: Mastering Distributed Systems',
    className: 'text-on-surface-variant',
    indent: true,
  },
]

export const profile = {
  name: 'Kresna S. Nugroho',
  location: 'Pontianak, ID',
  avatar: avatarImg,
}
