type Item = { title: string; body: string; flag: string }

const groups: { label: string; dot: string; items: Item[] }[] = [
  {
    label: 'CRITICAL — acts fast, hard to reverse',
    dot: 'critical',
    items: [
      {
        title: 'SIM swap',
        body: 'Your number is ported to a new SIM using forged ID, giving the attacker your OTPs and calls.',
        flag: 'sudden total loss of signal with no explanation.',
      },
      {
        title: 'Ransomware',
        body: 'Files are silently encrypted, often through a malicious attachment or macro, then held for payment.',
        flag: 'an "enable content" prompt on a file you weren\'t expecting.',
      },
      {
        title: 'Deepfake voice scams',
        body: 'A cloned voice of a relative or executive requests urgent funds, timed to prevent verification.',
        flag: 'urgency paired with a request to keep it quiet.',
      },
      {
        title: 'Business email compromise',
        body: 'An invoice thread is quietly hijacked and bank details are swapped mid-conversation.',
        flag: 'a last-minute change to payment details.',
      },
    ],
  },
  {
    label: 'COMMON — high volume, preventable',
    dot: 'caution',
    items: [
      {
        title: 'Phishing messages',
        body: 'A spoofed bank or delivery message pushes you to a fake login page under time pressure.',
        flag: "a link that doesn't match the sender's real domain.",
      },
      {
        title: 'UPI / QR fraud',
        body: 'A "collect" request or altered QR code is disguised as a payment you\'re supposed to receive.',
        flag: 'entering a PIN to receive money — you never need to.',
      },
      {
        title: 'Job & task scams',
        body: 'A too-good offer requests a small "registration" or "activation" fee upfront.',
        flag: 'any legitimate job that asks you to pay first.',
      },
    ],
  },
  {
    label: 'WATCH — quieter, compounds over time',
    dot: 'watch',
    items: [
      {
        title: 'Credential stuffing',
        body: 'A password reused across sites resurfaces in a breach dump and is tried everywhere else you use it.',
        flag: "a login alert from a service you haven't used in months.",
      },
      {
        title: 'Fake tech support',
        body: 'A pop-up or cold call convinces you to install remote-access software "to fix" a problem you don\'t have.',
        flag: 'anyone asking to remote into your device unprompted.',
      },
    ],
  },
]

export default function Learn({ active }: { active: boolean }) {
  return (
    <section className={`page${active ? ' active' : ''}`} id="learn">
      <h2>Common types of cybercrime</h2>
      <p className="lede">
        A working reference for the scams that cause the most damage, grouped by severity, not by how common they are.
      </p>

      {groups.map((g) => (
        <div className="severity-group" key={g.dot}>
          <div className="severity-label">
            <span className={`severity-dot ${g.dot}`}></span>
            {g.label}
          </div>
          <div className="case-grid">
            {g.items.map((c) => (
              <div className="case" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="flag">
                  <b>Red flag:</b> {c.flag}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
