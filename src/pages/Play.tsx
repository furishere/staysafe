import { useState } from 'react'
import type { PageId } from '../App'
import { scenarios, questions } from '../data/quiz'

type Mode = 'spot' | 'ask'

type Choice = { label: string; correct: boolean }

type Item = {
  meta?: { channel: string; from: string; note?: string }
  prompt: string
  choices: Choice[]
  explain: string
  flags?: string[]
}

const ROUND_SIZE = 8

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildRound(mode: Mode): Item[] {
  if (mode === 'spot') {
    return shuffle(scenarios)
      .slice(0, ROUND_SIZE)
      .map((s) => ({
        meta: { channel: s.channel, from: s.from, note: s.note },
        prompt: s.body,
        choices: [
          { label: 'Scam', correct: s.isScam },
          { label: 'Legit', correct: !s.isScam },
        ],
        explain: s.explain,
        flags: s.flags,
      }))
  }
  return shuffle(questions)
    .slice(0, ROUND_SIZE)
    .map((q) => ({
      prompt: q.q,
      choices: shuffle(q.options.map((label, i) => ({ label, correct: i === q.answer }))),
      explain: q.explain,
    }))
}

function loadBest(mode: Mode): number {
  try {
    return Number(localStorage.getItem(`staysafe:best:${mode}`)) || 0
  } catch {
    return 0 // storage blocked (private mode etc.), just skip it
  }
}

function saveBest(mode: Mode, score: number) {
  try {
    localStorage.setItem(`staysafe:best:${mode}`, String(score))
  } catch {
    // ignore, best score is a nice-to-have
  }
}

function rank(pct: number): { title: string; text: string } {
  if (pct === 100) return { title: 'Scam-proof', text: 'Flawless. Share this with someone who could use the practice.' }
  if (pct >= 75) return { title: 'Sharp eye', text: 'You catch most of the tricks. Review the ones you missed and you are there.' }
  if (pct >= 50) return { title: 'Getting there', text: 'You know the basics, but a few tells still slip past. Worth another round.' }
  return { title: 'Easy target, for now', text: 'No shame in it, this is exactly why scams work. Read the guide, then try again.' }
}

function Round({
  mode,
  items,
  onRestart,
  onExit,
  onNavigate,
}: {
  mode: Mode
  items: Item[]
  onRestart: () => void
  onExit: () => void
  onNavigate: (id: PageId) => void
}) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [best, setBest] = useState(() => loadBest(mode))
  const [finished, setFinished] = useState(false)

  const item = items[index]
  const answered = picked !== null
  const gotIt = answered && item.choices[picked].correct

  function pick(i: number) {
    if (answered) return
    setPicked(i)
    if (item.choices[i].correct) {
      setScore((s) => s + 1)
      setStreak((s) => {
        const next = s + 1
        setBestStreak((b) => Math.max(b, next))
        return next
      })
    } else {
      setStreak(0)
    }
  }

  function next() {
    if (index + 1 >= items.length) {
      if (score > best) {
        setBest(score)
        saveBest(mode, score)
      }
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
  }

  if (finished) {
    const pct = Math.round((score / items.length) * 100)
    const r = rank(pct)
    return (
      <div className="quiz-result">
        <div className="quiz-score">
          {score}
          <span>/{items.length}</span>
        </div>
        <h3>{r.title}</h3>
        <p>{r.text}</p>
        <p className="quiz-stats">
          best streak: {bestStreak} &nbsp;|&nbsp; personal best: {Math.max(best, score)}/{items.length}
        </p>
        <div className="cta-row">
          <button className="btn primary" onClick={onRestart}>
            Play again
          </button>
          <button className="btn" onClick={onExit}>
            Switch mode
          </button>
          <a
            className="btn"
            onClick={(e) => {
              e.preventDefault()
              onNavigate('spot')
            }}
          >
            Read the red flags
          </a>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="quiz-top">
        <span>
          question {index + 1}/{items.length}
        </span>
        <span>
          score {score} &nbsp;|&nbsp; streak <b className={streak >= 3 ? 'hot' : undefined}>{streak}</b>
        </span>
      </div>
      <div className="quiz-bar" aria-hidden="true">
        <i style={{ width: `${((index + (answered ? 1 : 0)) / items.length) * 100}%` }} />
      </div>

      {item.meta ? (
        <div className="msg">
          <div className="msg-head">
            <span>{item.meta.channel}</span>
            <span>from: {item.meta.from}</span>
          </div>
          <div className="msg-body">{item.prompt}</div>
          {item.meta.note && <div className="msg-note">{item.meta.note}</div>}
        </div>
      ) : (
        <h3 className="quiz-q">{item.prompt}</h3>
      )}

      <div className={`choices${item.meta ? ' two' : ''}`}>
        {item.choices.map((c, i) => {
          let state = ''
          if (answered) {
            if (c.correct) state = ' right'
            else if (i === picked) state = ' wrong'
            else state = ' faded'
          }
          return (
            <button key={c.label} className={`choice${state}`} onClick={() => pick(i)} disabled={answered}>
              {c.label}
            </button>
          )
        })}
      </div>

      <div aria-live="polite">
        {answered && (
          <div className={`feedback ${gotIt ? 'good' : 'bad'}`}>
            <b>{gotIt ? 'Correct.' : 'Not quite.'}</b> {item.explain}
            {item.flags && (
              <div className="tags">
                {item.flags.map((f) => (
                  <span key={f}>{f}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {answered && (
        <div className="mt-md">
          <button className="btn primary" onClick={next}>
            {index + 1 >= items.length ? 'See results' : 'Next'} &rarr;
          </button>
        </div>
      )}
    </div>
  )
}

export default function Play({ active, onNavigate }: { active: boolean; onNavigate: (id: PageId) => void }) {
  const [run, setRun] = useState<{ mode: Mode; id: number; items: Item[] } | null>(null)

  function start(mode: Mode) {
    setRun((r) => ({ mode, id: (r?.id ?? 0) + 1, items: buildRound(mode) }))
  }

  return (
    <section className={`page${active ? ' active' : ''}`} id="play">
      <h2>Test your scam instincts</h2>
      <p className="lede">
        Real-looking messages, calls, and situations. Make the call, then see exactly what gave it away. Eight
        questions a round, different every time.
      </p>

      {!run ? (
        <div className="cols2 mt-md">
          <button className="mode-card" onClick={() => start('spot')}>
            <span className="mode-tag">mode 01</span>
            <h3>Scam or Legit?</h3>
            <p>A message lands on your phone. Is it a scam or the real thing? Not everything is a trap.</p>
            <span className="mode-best">personal best: {loadBest('spot')}/{ROUND_SIZE}</span>
          </button>
          <button className="mode-card" onClick={() => start('ask')}>
            <span className="mode-tag">mode 02</span>
            <h3>What would you do?</h3>
            <p>A tricky situation, four options. Pick the safest move and learn why the others fail.</p>
            <span className="mode-best">personal best: {loadBest('ask')}/{ROUND_SIZE}</span>
          </button>
        </div>
      ) : (
        <Round
          key={run.id}
          mode={run.mode}
          items={run.items}
          onRestart={() => start(run.mode)}
          onExit={() => setRun(null)}
          onNavigate={onNavigate}
        />
      )}
    </section>
  )
}
