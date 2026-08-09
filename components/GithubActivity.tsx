'use client'

import { useEffect, useState } from 'react'

const GITHUB_USERNAME = 'kisnak21'
const CACHE_KEY = `gh-contrib:${GITHUB_USERNAME}`
const CACHE_TTL = 6 * 60 * 60 * 1000 // 6 hours

interface ContributionDay {
  date: string
  count: number
  level: number
}

const levelColors = [
  'bg-surface-container-highest',
  'bg-primary/30',
  'bg-primary/50',
  'bg-primary/70',
  'bg-primary',
]

export default function GithubActivity() {
  const [days, setDays] = useState<ContributionDay[]>([])
  const [total, setTotal] = useState(0)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false

    async function fetchContributions() {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const parsed = JSON.parse(cached)
          if (Date.now() - parsed.fetchedAt < CACHE_TTL) {
            if (!cancelled) {
              setDays(parsed.days)
              setTotal(parsed.total)
              setStatus('ready')
            }
            return
          }
        }

        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        )
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        const contributions = data.contributions || []
        const last84 = contributions.slice(-84)
        const yearlyTotal = data.total?.lastYear || contributions.reduce((acc: number, d: any) => acc + d.count, 0)

        if (!cancelled) {
          setDays(last84)
          setTotal(yearlyTotal)
          setStatus('ready')
          localStorage.setItem(CACHE_KEY, JSON.stringify({ days: last84, total: yearlyTotal, fetchedAt: Date.now() }))
        }
      } catch (err) {
        if (!cancelled) {
          setStatus('error')
        }
      }
    }

    fetchContributions()
    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'error') return null

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between mb-3'>
        <span className='font-code-sm text-code-sm text-on-surface-variant'>
          Last 84 days of activity
        </span>
        <span className='font-code-sm text-code-sm text-primary'>
          {status === 'loading' ? 'fetching...' : `${total} contributions`}
        </span>
      </div>

      <div className='grid grid-rows-7 grid-flow-col gap-1 overflow-x-auto pb-1'>
        {status === 'loading'
          ? Array.from({ length: 84 }).map((_, i) => (
              <div
                key={i}
                className='w-3 h-3 rounded-sm bg-surface-container-highest animate-pulse'
              />
            ))
          : days.map((day, i) => (
              <div
                key={day.date || i}
                title={`${day.date}: ${day.count} contributions`}
                className={`w-3 h-3 rounded-sm ${levelColors[day.level] || levelColors[0]}`}
              />
            ))}
      </div>
    </div>
  )
}
