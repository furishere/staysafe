const steps = [
  {
    num: '01',
    title: 'Stop and disconnect',
    body: "End the call, close the page, or disconnect the device from the internet if malware or remote access is involved. Don't make any further payments while things are unclear.",
  },
  {
    num: '02',
    title: 'Preserve the evidence',
    body: "Screenshot the messages, note the phone number or account involved, and save transaction IDs or reference numbers. Don't delete anything, even if it's unsettling to look at.",
  },
  {
    num: '03',
    title: 'Report it immediately',
    body: "Call the national cybercrime helpline or file a report on the portal below. For financial fraud, also alert your bank's fraud line directly so they can flag the transaction.",
  },
  {
    num: '04',
    title: "Secure what's left",
    body: 'Change passwords on any related accounts, enable two-factor authentication, and keep an eye on statements for follow-up attempts — a first scam is often followed by others.',
  },
]

const contacts = [
  { label: 'National Cybercrime Helpline', value: '1930' },
  { label: 'Online Reporting Portal', value: 'cybercrime.gov.in' },
  { label: 'Local Police', value: 'File an FIR at your nearest station or cyber cell' },
]

export default function Report({ active }: { active: boolean }) {
  return (
    <section className={`page${active ? ' active' : ''}`} id="report">
      <h2>What to do if it happens to you</h2>
      <p className="lede">
        Acting quickly matters, the faster a fraudulent transaction is reported, the better the chance of getting funds
        frozen before they move further.
      </p>

      {steps.map((s) => (
        <div className="module" key={s.num}>
          <div className="module-num">{s.num}</div>
          <div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        </div>
      ))}

      <h2 className="mt-lg">Where to report &mdash; India</h2>
      <div className="report-box">
        {contacts.map((c) => (
          <div className="report-item" key={c.label}>
            <span className="report-label">{c.label}</span>
            <span className="report-value">{c.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
