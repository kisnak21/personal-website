import { useEffect, useState } from 'react'

const GITHUB_USERNAME = 'kisnak21'
const CACHE_KEY = `gh-contrib:${GITHUB_USERNAME}`
const CACHE_TTL = 1000 * 60 * 60 * 6 // 6 hours

const levelClassMap = {
  0: 'bg-surface-variant',
  1: 'bg-primary/20',
  2: 'bg-primary/40',
  3: 'bg-primary/60',
  4: 'bg-primary',
}

const readCache = () => {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (Date.now() - parsed.ts > CACHE_TTL) return null
    return parsed
  } catch {
    return null
  }
}

const writeCache = (payload) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), ...payload }))
  } catch {
    /* ignore quota / private mode errors */
  }
}

const GithubActivity = () => {
  const [contributions, setContributions] = useState([])
  const [totalThisYear, setTotalThisYear] = useState(null)
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let cancelled = false

    const apply = (data, statusOverride) => {
      if (cancelled) return
      const currentYear = new Date().getFullYear()
      const yearTotal = data.total?.[currentYear] ?? data.total?.last ?? null
      setContributions(data.contributions ?? [])
      setTotalThisYear(yearTotal)
      setStatus(statusOverride ?? 'ready')
    }

    const cached = readCache()
    if (cached) {
      apply(cached, cached.status === 'error' ? 'error' : 'ready')
      if (cached.status === 'error') return
    }

    const fetchContributions = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
        )
        if (!res.ok)
          throw new Error(`GitHub contributions fetch failed: ${res.status}`)
        const data = await res.json()
        if (cancelled) return
        writeCache({ contributions: data.contributions, total: data.total, status: 'ready' })
        apply(data, 'ready')
      } catch {
        if (cancelled) return
        if (cached) return // keep showing cached data on failure
        writeCache({ status: 'error' })
        setStatus('error')
      }
    }

    if (!cached) fetchContributions()
    else fetchContributions()

    return () => {
      cancelled = true
    }
  }, [])

  const recentDays = contributions.slice(-84) // ~12 weeks

  return (
    <div className='col-span-12 mt-8 bg-surface-container-lowest rounded-lg border border-outline-variant p-4 smooth-transition hover:border-tertiary/30'>
      <div className='flex items-center justify-between mb-4 flex-wrap gap-2'>
        <div className='flex items-center gap-4'>
          <span className='font-label-caps text-label-caps text-on-surface-variant'>
            GITHUB CONTRIBUTIONS
          </span>
          <div className='flex gap-1'>
            {[0, 1, 2, 4].map((lvl) => (
              <div
                key={lvl}
                className={`w-3 h-3 rounded-sm ${levelClassMap[lvl]}`}
              ></div>
            ))}
          </div>
        </div>
        <span className='font-code-sm text-code-sm text-tertiary'>
          {status === 'loading' && 'Loading...'}
          {status === 'error' && `@${GITHUB_USERNAME} on GitHub`}
          {status === 'ready' &&
            (totalThisYear !== null
              ? `${totalThisYear.toLocaleString()} commits this year`
              : `@${GITHUB_USERNAME} on GitHub`)}
        </span>
      </div>

      {status === 'error' ? (
        <p className='text-on-surface-variant/60 font-code-sm text-code-sm py-2'>
          Couldn't load live contribution data right now — check{' '}
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:underline'
          >
            github.com/{GITHUB_USERNAME}
          </a>{' '}
          directly.
        </p>
      ) : (
        <div className='flex gap-1 overflow-x-auto pb-2'>
          {status === 'loading'
            ? Array.from({ length: 84 }, (_, i) => (
                <div
                  key={i}
                  className='w-4 h-4 rounded-sm flex-shrink-0 bg-surface-variant animate-pulse'
                ></div>
              ))
            : recentDays.map((day) => (
                <div
                  key={day.date}
                  title={`${day.count} contributions on ${day.date}`}
                  className={`w-4 h-4 rounded-sm flex-shrink-0 smooth-transition hover:scale-125 hover:z-10 cursor-crosshair ${levelClassMap[day.level] ?? levelClassMap[0]}`}
                ></div>
              ))}
        </div>
      )}
    </div>
  )
}

export default GithubActivity
