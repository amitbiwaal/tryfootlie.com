// Copy for the landing page, kept as data so sections stay short and the FAQ can feed JSON-LD.

import type { ReactNode } from 'react'

export function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

type Card = { title: string; text: string; icon: ReactNode }
type Item = { title: string; text: string }

export const trustBadges: { label: string; icon: ReactNode }[] = [
  { label: '100% anonymous', icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /> },
  {
    label: 'Secure payments',
    icon: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
  },
  { label: 'Verified buyers', icon: <path d="M20 6 9 17l-5-5" /> },
  {
    label: 'Fast payouts',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
]

export const features: Card[] = [
  {
    title: 'Total anonymity',
    text: 'Footly lets you sell feet pics under a username — no face, no real name, no location shared. Privacy is the default, not an upsell.',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: 'Secure in-app payments',
    text: 'Buyers pay Footly up front, so you never share bank details or wait on a stranger. The platform tracks every sale and pays you reliably.',
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </>
    ),
  },
  {
    title: 'Set your own prices',
    text: 'You control pricing on Footly — single photos, themed sets, subscriptions, or custom requests. Raise your rates as your following grows.',
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 3 3 5-6" />
      </>
    ),
  },
  {
    title: 'Built-in buyer discovery',
    text: 'Footly brings verified buyers searching for feet pics straight to your profile, so you spend less time marketing and more time selling.',
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
  {
    title: 'Verified, vetted buyers',
    text: 'Every buyer on Footly is verified before they can purchase, cutting down on timewasters, scammers, and chargeback fraud.',
    icon: <path d="M20 6 9 17l-5-5" />,
  },
  {
    title: 'One-tap watermarking',
    text: 'Footly automatically protects previews so no one can steal your work — your feet pics stay yours until someone pays for them.',
    icon: (
      <>
        <path d="M4 17l5-5-5-5" />
        <path d="M12 19h8" />
      </>
    ),
  },
]

export const benefits: Item[] = [
  {
    title: 'Keep more of what you earn',
    text: "Footly's low platform fee means a bigger share of every sale stays in your pocket compared with scattered, fee-heavy alternatives.",
  },
  {
    title: 'Protect your real identity',
    text: 'With Footly you sell feet pics anonymously — no need to reveal who you are, where you live, or what you look like.',
  },
  {
    title: 'Get paid without the chase',
    text: "No more “I'll send it after you send the pic.” Footly collects payment first, so you're never scammed out of your work.",
  },
  {
    title: 'Start with zero experience',
    text: 'Footly is beginner-friendly. If you can take a photo on your phone, you can start selling feet pics on Footly today.',
  },
  {
    title: 'Work on your own schedule',
    text: 'Footly runs 24/7. Upload when you want, set it, and let buyers discover and purchase your feet pics around the clock.',
  },
  {
    title: 'Scale into a real income',
    text: 'Subscriptions, bundles, and custom requests on Footly let you grow from pocket money to a dependable creator income.',
  },
]

export const steps: Item[] = [
  {
    title: 'Create your account',
    text: "Sign up free and verify you're 18 or older. Pick a username — your real name never has to appear on Footly.",
  },
  {
    title: 'Upload & price',
    text: 'Add your best feet pics, let Footly watermark the previews, and set prices for singles, sets, or subscriptions.',
  },
  {
    title: 'Get discovered',
    text: 'Verified buyers browse Footly and find your profile, then pay securely in-app — no DMs, no haggling, no risk to you.',
  },
  {
    title: 'Get paid',
    text: 'Footly tracks your earnings and sends discreet, secure payouts on your schedule. Watch your balance grow and reinvest.',
  },
]

export const categories: { label: string; icon: ReactNode }[] = [
  {
    label: 'Single feet pics',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-5-5L5 21" />
      </>
    ),
  },
  { label: 'Themed photo sets', icon: <path d="M4 7h16M4 12h16M4 17h10" /> },
  { label: 'Custom requests', icon: <path d="M12 5v14M5 12h14" /> },
  {
    label: 'Monthly subscriptions',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    label: 'Pedicure & nail art',
    icon: <path d="m12 3 2.4 7.4H22l-6 4.6 2.3 7.4L12 18l-6.3 4.4L8 15 2 10.4h7.6z" />,
  },
  { label: 'Seasonal & sandals', icon: <path d="M3 12h18M3 6h18M3 18h18" /> },
  { label: 'Bundles & deals', icon: <path d="M20 6 9 17l-5-5" /> },
  {
    label: 'Pay-per-message',
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  },
]

export const whyFootly: Card[] = [
  {
    title: 'Privacy-first by design',
    text: "Footly never forces you to reveal your identity. Anonymity isn't a feature you pay extra for — it's how the platform works from day one.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Anti-scam protection',
    text: 'Verified buyers and upfront payments mean Footly creators avoid the classic “pay-after” scams that plague social-media DMs.',
    icon: <path d="M12 2 4 5v6c0 5 3.4 7.7 8 11 4.6-3.3 8-6 8-11V5z" />,
  },
  {
    title: 'Fair, transparent fees',
    text: 'Footly keeps its cut low and clearly stated. No surprise charges — you always know exactly what you earn from each sale.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M9 9.5c0-1.4 1.3-2 3-2s3 .8 3 2-1.3 2-3 2-3 .6-3 2 1.3 2 3 2 3-.6 3-2" />
      </>
    ),
  },
  {
    title: 'Niche-focused audience',
    text: 'Because Footly specializes in the feet niche, your photos reach buyers who are actually there to buy — not random scrollers.',
    icon: <path d="M3 12h4l3 8 4-16 3 8h4" />,
  },
  {
    title: 'Works on any device',
    text: 'Footly is lightweight and mobile-friendly, so you can list photos, message buyers, and check earnings right from your phone.',
    icon: (
      <>
        <rect x="5" y="2" width="14" height="20" rx="3" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    title: 'Real creator support',
    text: "Footly's support team understands the niche and helps you with payouts, listings, and safety whenever you need a hand.",
    icon: (
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z" />
    ),
  },
]

export const comparison: { feature: string; footly: string; dms: string; generic: string }[] = [
  { feature: 'Stay anonymous', footly: 'Yes', dms: 'Risky', generic: 'Often no' },
  { feature: 'Guaranteed payment', footly: 'Yes', dms: 'No', generic: 'Sometimes' },
  { feature: 'Verified buyers', footly: 'Yes', dms: 'No', generic: 'No' },
  { feature: 'Buyers searching for feet pics', footly: 'Built-in', dms: 'No', generic: 'Rare' },
  { feature: 'Watermark protection', footly: 'Automatic', dms: 'Manual', generic: 'No' },
  { feature: 'Scam protection', footly: 'Strong', dms: 'None', generic: 'Limited' },
  { feature: 'Set your own prices', footly: 'Full control', dms: 'Yes', generic: 'Limited' },
]

export const audiences: Card[] = [
  {
    title: 'Complete beginners',
    text: "Never sold a photo before? Footly's guided setup makes your first feet-pics listing simple and stress-free.",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  },
  {
    title: 'Side-income seekers',
    text: 'Want extra cash on your own schedule? Footly lets you sell feet pics in your spare time with zero startup cost.',
    icon: (
      <>
        <path d="M12 2v6m0 8v6M2 12h6m8 0h6" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    title: 'Serious creators',
    text: "Ready to scale? Footly's subscriptions, bundles, and analytics help full-time creators turn feet pics into a business.",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <rect x="7" y="11" width="3" height="7" />
        <rect x="12" y="7" width="3" height="11" />
        <rect x="17" y="9" width="3" height="9" />
      </>
    ),
  },
  {
    title: 'Privacy-conscious sellers',
    text: 'If anonymity is non-negotiable, Footly is built for you — sell feet pics without ever exposing your identity.',
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
      </>
    ),
  },
  {
    title: 'Existing online creators',
    text: 'Already build content elsewhere? Add Footly as a focused channel to monetize the feet-pics niche specifically.',
    icon: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a4 4 0 0 0-8 0v2" />
      </>
    ),
  },
  {
    title: 'People chasing a goal',
    text: "Saving for something specific? Footly's clear earnings tracker helps you hit your number, one sale at a time.",
    icon: (
      <>
        <path d="M23 6 13.5 15.5 8.5 10.5 1 18" />
        <path d="M17 6h6v6" />
      </>
    ),
  },
]

export const stats: { num: string; label: string }[] = [
  { num: '4.8', label: 'Average creator rating (out of 5)' },
  { num: '250K+', label: 'Photos sold on Footly' },
  { num: '98%', label: 'Payouts sent on time' },
  { num: '24/7', label: 'Buyers active on Footly' },
]

export const quotes: { text: string; name: string; role: string }[] = [
  {
    text: '“I was nervous about scams, but Footly handles payment first so I never get burned. I made my first sale the same night I joined.”',
    name: 'Jade R.',
    role: 'Footly creator, 6 months',
  },
  {
    text: '“What sold me on Footly is the anonymity. No face, no name — just my photos and steady payouts. It finally feels safe to sell feet pics.”',
    name: 'Mia K.',
    role: 'Footly creator, 1 year',
  },
  {
    text: '“Subscriptions on Footly turned a side hustle into real monthly income. The buyer discovery does the marketing work for me.”',
    name: 'Sloane T.',
    role: 'Footly creator, 8 months',
  },
]

export const faqs: { q: string; a: string }[] = [
  {
    q: 'How much do feet pics sell for on Footly?',
    a: 'On Footly, individual feet pics commonly sell for around $5 to $30 each, while custom sets and subscriptions can earn far more. Active Footly creators who post consistently and engage with buyers often report several hundred dollars a month or more — your pricing and effort drive your results.',
  },
  {
    q: 'How do I sell feet pics safely without getting scammed?',
    a: "The safest way to sell feet pics is to use a platform like Footly that processes every payment in-app, verifies buyers, and never asks you to share personal contact or banking details with strangers. Because Footly collects payment up front, you're never left chasing a buyer for money.",
  },
  {
    q: 'Do I have to show my face to sell feet pics on Footly?',
    a: 'No. Footly is built for anonymity. You can sell feet pics on Footly without ever showing your face — use a username instead of your real name and keep your location private. Your identity stays protected.',
  },
  {
    q: 'Where can I sell feet pics online?',
    a: "You can sell feet pics online through dedicated creator platforms rather than risky social-media DMs. Footly is purpose-built for the feet niche, combining buyer discovery, secure payments, and privacy tools in one place so you don't have to juggle multiple apps.",
  },
  {
    q: 'Is it legal to sell feet pics?',
    a: "Yes. Selling feet pics is legal in most countries as long as you're over 18 and the images are your own. Footly requires every creator to verify they are 18 or older before they can sell feet pics on the platform.",
  },
  {
    q: 'How do I get paid when I sell feet pics on Footly?',
    a: "Footly collects payment from buyers up front, then pays you through secure, discreet payout methods. There's no waiting on a stranger to send money — your earnings are tracked in your Footly dashboard and withdrawn on your own schedule.",
  },
  {
    q: 'How do I start selling feet pics on Footly for free?',
    a: "Creating a Footly account is free. Sign up, verify you're 18+, upload a few watermarked feet pics, set your prices, and you can start selling the same day. Footly only takes a small cut when you actually make a sale.",
  },
  {
    q: 'What kind of feet pics sell best?',
    a: 'Clear, well-lit photos with clean nails, varied poses, and themed sets (seasonal looks, sandals, painted toes, soles) tend to sell best. Footly creators who offer custom requests and bundles typically earn the most per buyer.',
  },
]

export const checklist: Item[] = [
  {
    title: 'Sign up & verify your age',
    text: "Create your free Footly account and confirm you're 18+. Choose an anonymous username you're comfortable with.",
  },
  {
    title: 'Build a strong profile',
    text: 'Add a short bio describing your style. A clear, friendly Footly profile helps verified buyers decide to follow and purchase.',
  },
  {
    title: 'Upload your first set',
    text: 'Start with 5–10 well-lit feet pics. Let Footly watermark previews and group them into a tidy, tempting set.',
  },
  {
    title: 'Price smart & publish',
    text: "Set beginner-friendly prices to attract first buyers, then raise them as demand grows. Publish and you're live on Footly.",
  },
  {
    title: 'Engage & offer extras',
    text: 'Reply to messages, take custom requests, and bundle sets. Engagement is what turns Footly browsers into repeat buyers.',
  },
  {
    title: 'Withdraw your earnings',
    text: 'Watch your Footly balance grow and cash out securely on your schedule. Reinvest your time into what sells best.',
  },
]

export const tips: Item[] = [
  {
    title: 'Master your lighting',
    text: 'Natural daylight near a window makes feet pics look crisp and professional — the single biggest quality upgrade on Footly.',
  },
  {
    title: 'Keep nails and skin tidy',
    text: 'Clean, groomed feet photograph far better. Buyers on Footly pay more for polished, well-presented sets.',
  },
  {
    title: 'Always watermark previews',
    text: "Use Footly's watermarking on every preview so no one can lift your work before they pay for it.",
  },
  {
    title: 'Post consistently',
    text: 'Regular uploads keep your Footly profile active and visible, which the buyer-discovery system rewards with more views.',
  },
  {
    title: 'Bundle to raise order value',
    text: 'Offer themed sets and bundles on Footly so each buyer spends more than they would on a single photo.',
  },
  {
    title: 'Protect your privacy',
    text: 'Remove identifying tattoos, backgrounds, or metadata. Footly keeps you anonymous — these habits keep it airtight.',
  },
  {
    title: 'Respond quickly',
    text: 'Fast replies to custom requests on Footly turn curious browsers into paying, repeat customers.',
  },
  {
    title: 'Test your pricing',
    text: 'Experiment with price points and watch your Footly analytics to find the sweet spot that maximizes earnings.',
  },
]
