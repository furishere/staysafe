import { useEffect, useState } from 'react'

type Level = 'critical' | 'caution' | 'contained'

const feed: { time: string; vector: string; level: Level; detail: string }[] = [
  { time: '04:12:09', vector: 'PHISHING', level: 'critical', detail: 'Spoofed bank SMS requesting KYC re-verification' },
  { time: '04:12:41', vector: 'SIM SWAP', level: 'critical', detail: 'Duplicate SIM issued via forged ID at retail outlet' },
  { time: '04:13:15', vector: 'UPI FRAUD', level: 'caution', detail: 'QR code manipulated to trigger a collect request' },
  { time: '04:13:52', vector: 'RANSOMWARE', level: 'critical', detail: 'Encrypted file share traced to a malicious macro' },
  { time: '04:14:20', vector: 'JOB SCAM', level: 'caution', detail: 'Advance fee requested for a fabricated work-from-home offer' },
  { time: '04:14:58', vector: 'DEEPFAKE', level: 'critical', detail: 'Voice clone used in a fake emergency call for funds' },
  { time: '04:15:33', vector: 'BEC', level: 'critical', detail: 'Invoice altered mid-thread, bank details swapped' },
  { time: '04:16:02', vector: 'CREDENTIAL LEAK', level: 'contained', detail: 'Reused password surfaced in a third-party breach dump' },
]

export default function Terminal() {
  // count 0 -> first row appears immediately; each step adds a row every 550ms;
  // once count passes the last row, the blinking cursor is appended (same as the original).
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count > feed.length) return
    const t = setTimeout(() => setCount((c) => c + 1), count === 0 ? 0 : 550)
    return () => clearTimeout(t)
  }, [count])

  const rows = feed.slice(0, Math.min(count, feed.length))

  return (
    <div className="terminal" id="terminal">
      <div className="terminal-head">
        <span>incident-feed.log &mdash; anonymized, illustrative</span>
        <span className="live-dot">
          <i></i>live
        </span>
      </div>
      <div className="terminal-body" id="terminal-body">
        {rows.map((e) => (
          <div className="log-row" key={e.time}>
            <span className="log-time">{e.time}</span>
            <span className={`log-vector ${e.level}`}>{e.vector}</span>
            <span className="log-detail">{e.detail}</span>
          </div>
        ))}
        {count > feed.length && <span className="cursor">_</span>}
      </div>
    </div>
  )
}
