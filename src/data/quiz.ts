export type Scenario = {
  channel: string
  from: string
  note?: string
  body: string
  isScam: boolean
  explain: string
  flags: string[]
}

export type Question = {
  q: string
  options: string[]
  answer: number // index into options
  explain: string
}

export const scenarios: Scenario[] = [
  {
    channel: 'SMS',
    from: 'VM-SBIKYC',
    body: 'Your SBI account will be BLOCKED today. Update your PAN now to avoid suspension: http://sbi-kyc-update.in/verify',
    isScam: true,
    explain:
      'Banks do not block accounts over SMS and never ask you to submit PAN or KYC through a link. The domain is a look-alike, not the bank\u2019s real site.',
    flags: ['Manufactured urgency', 'Look-alike domain', 'Asks for personal details via link'],
  },
  {
    channel: 'SMS',
    from: 'AX-AMAZON',
    note: 'You just tried to log in to Amazon yourself.',
    body: 'Your OTP for Amazon login is 482913. Do not share this code with anyone, including Amazon staff.',
    isScam: false,
    explain:
      'This is a normal OTP: you triggered it, it has no link, and it tells you not to share it. It only becomes dangerous if someone asks you to read it out.',
    flags: ['You started the action', 'No link, no pressure'],
  },
  {
    channel: 'WhatsApp',
    from: '+44 7•• ••• 4821 (unknown)',
    body: 'Hi! Earn \u20B93,000/day just by liking YouTube videos from home. No experience needed. Reply YES and I\u2019ll add you to our Telegram group.',
    isScam: true,
    explain:
      'Easy money for almost no work is bait. These task scams usually start with a small \u201Cpayout\u201D, then ask you to deposit money to unlock bigger earnings.',
    flags: ['Too good to be true', 'Unknown number', 'Moves you to another app'],
  },
  {
    channel: 'UPI app',
    from: 'Rahul Stores (unknown)',
    body: 'Rahul Stores has requested \u20B94,999. Approve and enter your UPI PIN to receive your \u20B94,999 cashback.',
    isScam: true,
    explain:
      'You never enter your UPI PIN to receive money. A collect request takes money out of your account, whatever the message says.',
    flags: ['Collect request disguised as a refund', 'PIN requested to \u201Creceive\u201D money'],
  },
  {
    channel: 'Email',
    from: 'Netflix Support <billing@netflix-secure-support.com>',
    body: 'Your payment failed. Update your card details within 24 hours or your account will be permanently deleted. [Update now]',
    isScam: true,
    explain:
      'Look at the actual sender domain, not the display name. A real Netflix email would not come from a third-party domain, and \u201C24 hours or deleted\u201D is pressure.',
    flags: ['Mismatched sender domain', 'Deadline threat', 'Asks for card details via link'],
  },
  {
    channel: 'Phone call',
    from: 'Unknown number',
    body: '\u201CThis is your bank\u2019s fraud team. A suspicious transaction is in progress. Please install AnyDesk right now so we can reverse it.\u201D',
    isScam: true,
    explain:
      'No genuine bank asks to remote-control your phone. Once they have access they can see your screen, OTPs, and approve payments themselves.',
    flags: ['Unsolicited remote access', 'Urgency', 'You did not start this contact'],
  },
  {
    channel: 'SMS',
    from: 'VK-HDFCBK',
    note: 'You just paid \u20B91,200 at a shop by UPI.',
    body: 'Rs.1,200.00 debited from A/c XX4521 on 11-Oct-26 via UPI to RAJESH SWEETS. If not done by you, call your bank\u2019s official number or 1930.',
    isScam: false,
    explain:
      'A transaction alert that matches something you just did, with no link and no request for action. If it did not match, you would use the official number, not a number from a message.',
    flags: ['Matches your own activity', 'No link, no request for information'],
  },
  {
    channel: 'SMS',
    from: 'BZ-PARCEL',
    body: 'Your parcel is held at customs. Pay a \u20B949 redelivery fee within 2 hours: bit.ly/3xPk-delivery',
    isScam: true,
    explain:
      'The small amount is the trick: the payment page is built to steal your card or UPI details. Shortened links hide where you are really going.',
    flags: ['Tiny fee, big risk', 'Shortened link', 'Artificial deadline'],
  },
  {
    channel: 'Email',
    from: 'Exam Cell <examcell@your-college.edu>',
    note: 'The sender address matches your college\u2019s real domain.',
    body: 'The semester timetable is now available on the student portal. Log in as you normally do to view it.',
    isScam: false,
    explain:
      'It points you to a portal you already use instead of a link, creates no pressure, and asks for nothing. Going to the site yourself is the safest habit.',
    flags: ['Known sender domain', 'No urgency, no data requested'],
  },
  {
    channel: 'SMS',
    from: 'LD-WINNER',
    body: 'CONGRATULATIONS! You won an iPhone in the lucky draw. Pay \u20B9199 shipping to claim your prize today.',
    isScam: true,
    explain:
      'You cannot win a draw you never entered. The \u201Cshipping fee\u201D is the real goal, and the payment page often harvests your card details too.',
    flags: ['Prize you never entered for', 'Pay-to-claim', 'Time pressure'],
  },
]

export const questions: Question[] = [
  {
    q: 'Someone claiming to be from your bank asks for the OTP \u201Cto cancel a suspicious transaction.\u201D What do you do?',
    options: [
      'Share it quickly, since it is urgent',
      'Hang up and call the number on the back of your card',
      'Ask for their employee ID, then share it',
      'Share only the first three digits',
    ],
    answer: 1,
    explain:
      'No bank ever needs your OTP. Hang up and call the number printed on your card, never one the caller gives you.',
  },
  {
    q: 'You get a UPI collect request from a stranger. What do you need to do to receive money from it?',
    options: [
      'Enter your UPI PIN',
      'Scan their QR code and confirm',
      'Nothing. Receiving money never needs a PIN, so decline it',
      'Share the OTP they send',
    ],
    answer: 2,
    explain:
      'A PIN is only ever for sending money. If something asks for it to \u201Creceive\u201D, it is a scam. Decline and report it.',
  },
  {
    q: 'Your phone suddenly shows \u201CNo service\u201D for hours, then you get login alerts you did not trigger. What is the likely cause?',
    options: [
      'A local network outage',
      'A faulty battery',
      'SIM swap fraud: contact your carrier and bank immediately',
      'Nothing, wait until tomorrow',
    ],
    answer: 2,
    explain:
      'Sudden total loss of signal plus unexpected alerts is the classic SIM swap pattern. Every minute counts, so call your carrier and bank straight away.',
  },
  {
    q: 'You have lost money to online fraud. What should you do first?',
    options: [
      'Wait a few days to see if it gets refunded',
      'Delete the messages so you stop worrying',
      'Call 1930 and report at cybercrime.gov.in, and alert your bank',
      'Confront the scammer and demand it back',
    ],
    answer: 2,
    explain:
      'The faster you report, the better the chance of the funds being frozen. Keep the messages and transaction IDs as evidence.',
  },
  {
    q: 'Which single step protects your account best if your password leaks?',
    options: [
      'Making the password longer',
      'Turning on two-factor authentication',
      'Changing the password every week',
      'Using incognito mode',
    ],
    answer: 1,
    explain:
      'With two-factor authentication on, a leaked password alone is not enough to get in. Authenticator apps are stronger than SMS codes.',
  },
  {
    q: 'A text from \u201Cyour bank\u201D includes a link to verify your account. What is the safest move?',
    options: [
      'Tap it, but only look, do not type anything',
      'Forward it to friends to check',
      'Ignore the link and open the bank\u2019s app or type its website yourself',
      'Reply STOP to unsubscribe',
    ],
    answer: 2,
    explain:
      'Never use the link in the message. Go to the app or site yourself. Replying can also confirm to the sender that your number is active.',
  },
  {
    q: '\u201CTech support\u201D asks you to install a screen-sharing app so they can \u201Cfix a problem.\u201D What now?',
    options: [
      'Install it, but watch what they do',
      'Refuse and end the contact',
      'Install it only on your old phone',
      'Let them in if they know your name',
    ],
    answer: 1,
    explain:
      'Unsolicited remote access is a red flag. Scammers often know your name, and once connected they can see everything on your screen.',
  },
  {
    q: 'You are at a caf\u00E9 and need to check your bank balance. What is the safest option?',
    options: [
      'Use the caf\u00E9 Wi-Fi in incognito mode',
      'Use your mobile data instead',
      'Use the Wi-Fi if it has a password',
      'Ask a stranger to lend their phone',
    ],
    answer: 1,
    explain:
      'Public Wi-Fi can be watched or spoofed. A password does not make it private, and incognito mode only hides history on your own device.',
  },
  {
    q: 'A \u201Crecruiter\u201D offers you a job but asks for a \u20B92,000 registration fee first. What do you do?',
    options: [
      'Pay it, since the pay is good',
      'Negotiate the fee down',
      'Walk away: genuine employers do not charge you to hire you',
      'Pay half now, half later',
    ],
    answer: 2,
    explain:
      'Real employers never charge candidates. The fee is the scam, and it often leads to \u201Cadditional\u201D charges after.',
  },
  {
    q: 'Your files are suddenly locked and a note demands payment in crypto. What is the best first step?',
    options: [
      'Pay quickly to get the files back',
      'Disconnect the device from the internet and do not pay',
      'Restart repeatedly until it works',
      'Email the attacker to negotiate',
    ],
    answer: 1,
    explain:
      'Disconnecting stops it from spreading. Paying does not guarantee your files back and marks you as a target. Report it, and restore from a backup if you have one.',
  },
]
