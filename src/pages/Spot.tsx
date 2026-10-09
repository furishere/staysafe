const checks = [
  {
    title: 'Manufactured urgency',
    body: '"Act now or lose access" is a pressure tactic, not a real deadline. Genuine institutions rarely demand instant action.',
  },
  {
    title: 'Unusual payment requests',
    body: 'Being asked to pay via gift cards, crypto, or a "collect" UPI request is a near-certain sign of fraud.',
  },
  {
    title: 'Mismatched sender details',
    body: 'Check the actual email address or link domain, not just the display name — spoofing the name is trivial.',
  },
  {
    title: 'Requests to keep it secret',
    body: 'Being told not to tell family, colleagues, or your bank is designed to stop you from getting a second opinion.',
  },
  {
    title: 'Too good to be true',
    body: 'Unusually high returns, easy money, or a job that pays well for almost no work is bait, not opportunity.',
  },
  {
    title: 'Unsolicited remote access',
    body: 'No legitimate support team will ask to remotely control your device out of nowhere.',
  },
]

const asks = [
  { title: 'Did I initiate this?', text: "If you didn't start the interaction, treat any request for money or information with suspicion." },
  { title: 'Can I verify independently?', text: 'Call the organization back using a number you look up yourself, not one given in the message.' },
  { title: 'Would they really ask this way?', text: "Banks and government bodies don't request OTPs, PINs, or passwords over call or chat." },
  { title: 'What happens if I wait?', text: 'If pausing to check would "ruin" the deal, the deal was never real.' },
]

export default function Spot({ active }: { active: boolean }) {
  return (
    <section className={`page${active ? ' active' : ''}`} id="spot">
      <h2>How to spot a scam in the moment</h2>
      <p className="lede">
        Most scams share the same handful of tells, no matter what channel they arrive through. Learn these and you'll
        catch the majority of attempts before they go further.
      </p>

      <div className="check-grid">
        {checks.map((c) => (
          <div className="check" key={c.title}>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-lg">Before you click, tap, or pay &mdash; ask</h2>
      <div className="cols2">
        {asks.map((a) => (
          <div className="who-item" key={a.title}>
            <p>
              <b className="text-strong">{a.title}</b> <br /> {a.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
