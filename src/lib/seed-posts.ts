// Starter articles. They are shown until the CMS store is initialised, and are copied into the
// store the first time an admin opens the dashboard — after that they are edited like any post.

import type { Post } from './posts'
import { readingMinutes } from './text'

const author = 'Footly Guide'

const drafts: Omit<Post, 'readingMinutes'>[] = [
  {
    id: 'seed-sell-feet-pics-safely',
    slug: 'how-to-sell-feet-pics-safely',
    title: "How to Sell Feet Pics Safely: A Beginner's Checklist",
    excerpt:
      'Most problems new sellers run into are avoidable. Use this checklist to protect your money, your photos, and your identity before your first sale.',
    coverImage: '',
    coverAlt: '',
    tags: ['Safety', 'Beginners'],
    author,
    status: 'published',
    publishedAt: '2026-09-08T09:00:00.000Z',
    createdAt: '2026-09-08T09:00:00.000Z',
    updatedAt: '2026-09-08T09:00:00.000Z',
    metaTitle: '',
    metaDescription:
      'A practical safety checklist for selling feet pics online: avoid payment scams, protect your photos with watermarks, and keep your identity private.',
    content: `
<p>Selling feet pics can be a low-cost way to earn extra money, but the same things that make it easy to start also attract scammers. The good news is that almost every common problem is avoidable with a few habits. Work through this checklist before you list your first photo.</p>

<h2>1. Never send photos before you are paid</h2>
<p>The most common scam is also the simplest: a buyer promises to pay "right after" you send the pictures, then disappears. Treat payment-first as a rule with no exceptions, however friendly or generous the buyer sounds.</p>
<p>The easiest way to enforce that rule is to sell through a platform that collects payment at checkout and only then releases the content. You are never in the position of chasing a stranger for money.</p>

<h2>2. Be suspicious of overpayments and "verification fees"</h2>
<p>Two patterns show up again and again:</p>
<ul>
<li><strong>The overpayment.</strong> Someone sends more than the agreed price and asks you to refund the difference. The original payment later bounces or is reversed, and your refund is gone.</li>
<li><strong>The upfront fee.</strong> Someone claims you must pay a fee, buy a gift card, or "verify your account" before they can pay you. A real buyer never needs money from you.</li>
</ul>
<p>If a message involves you sending money to anyone, stop replying.</p>

<h2>3. Keep conversations and payments in one place</h2>
<p>Buyers who push you to move to a private messaging app or a personal payment app are usually trying to get around a platform's protections. Staying inside the platform keeps a record of what was agreed and keeps your personal phone number, email address, and payment details out of the conversation.</p>

<h2>4. Watermark every preview</h2>
<p>Anything you post publicly can be saved. Add a watermark with your seller username across preview images, and keep full-resolution, unmarked files for paying customers only. A watermark placed over the subject is much harder to crop out than one tucked into a corner.</p>

<h2>5. Separate your seller identity from your real one</h2>
<p>Set up a dedicated email address and a username that is not used anywhere else. Avoid usernames that include your real name, birth year, or city. For a deeper walkthrough, read our guide to <a href="/blog/stay-anonymous-selling-feet-pics">staying anonymous when you sell feet pics</a>.</p>

<h2>6. Know the rules that apply to you</h2>
<p>You must be at least 18 to sell, and reputable platforms will ask you to verify your age. Only sell images of your own feet. Income from selling photos is generally taxable, so keep a simple record of what you earn and check the rules where you live.</p>

<h2>7. Trust your instincts</h2>
<p>You are allowed to say no. Decline requests that make you uncomfortable, block buyers who are rude or pushy, and report anything that looks like a scam. Sellers who set clear boundaries early tend to have a much better experience.</p>

<h2>The short version</h2>
<ul>
<li>Payment first, always.</li>
<li>Never send money to a buyer for any reason.</li>
<li>Keep chats and payments on the platform.</li>
<li>Watermark previews.</li>
<li>Use a separate email and an anonymous username.</li>
</ul>
<p>Once those habits are in place, you can focus on the fun part: taking good photos and building a base of repeat buyers. See <a href="/#how-it-works">how it works</a> to get started.</p>
`.trim(),
  },
  {
    id: 'seed-price-feet-pics',
    slug: 'how-to-price-feet-pics',
    title: 'How to Price Feet Pics: Singles, Sets, and Custom Requests',
    excerpt:
      'Price too low and you burn out; price too high and nothing sells. Here is a simple way to set starting prices and raise them with confidence.',
    coverImage: '',
    coverAlt: '',
    tags: ['Pricing', 'Beginners'],
    author,
    status: 'published',
    publishedAt: '2026-09-16T09:00:00.000Z',
    createdAt: '2026-09-16T09:00:00.000Z',
    updatedAt: '2026-09-16T09:00:00.000Z',
    metaTitle: '',
    metaDescription:
      'How to price feet pics as a beginner: starting prices for single photos, sets, and custom requests, plus when and how to raise your rates.',
    content: `
<p>Pricing is the question every new seller asks first, and there is no single right answer. Prices vary widely with photo quality, how established the seller is, and how specific the request is. What you can do is start from a sensible baseline and adjust based on what actually sells.</p>

<h2>Start with three price tiers</h2>
<p>Instead of one price, think in three tiers. It gives buyers an easy entry point and gives you room to earn more from the people who want more.</p>
<ul>
<li><strong>Single photos.</strong> Individual feet pics commonly sell for around $5 to $30 each. As a beginner, the lower half of that range makes it easier to land your first few sales.</li>
<li><strong>Sets.</strong> A themed set of five to ten photos should cost less than buying the same photos one by one, but more than a single. Sets raise your average order without much extra work, because you shoot them in one session.</li>
<li><strong>Custom requests.</strong> A custom request takes your time, follows someone else's brief, and can only be sold once. It should be your most expensive option — many sellers charge at least double their normal rate.</li>
</ul>

<h2>What justifies a higher price</h2>
<p>Buyers pay more when the work is clearly better or clearly made for them. The biggest levers are:</p>
<ul>
<li><strong>Photo quality.</strong> Sharp focus, natural light, and a clean background matter more than an expensive camera.</li>
<li><strong>Presentation.</strong> Groomed nails and moisturised skin photograph noticeably better.</li>
<li><strong>Variety.</strong> Different poses, angles, footwear, and settings make a set feel worth the price.</li>
<li><strong>Exclusivity.</strong> Content sold to one buyer only is worth more than content anyone can purchase.</li>
<li><strong>Reliability.</strong> Sellers who reply quickly and deliver what they promised earn repeat buyers, and repeat buyers are less price-sensitive.</li>
</ul>

<h2>Do not race to the bottom</h2>
<p>It is tempting to undercut everyone when you are new. Very low prices tend to attract hagglers and make it hard to raise your rates later. A fair starting price with an occasional limited discount works better than a permanently cheap listing.</p>

<h2>When to raise your prices</h2>
<p>Treat your first month as a test. Raise prices gradually when you notice any of these:</p>
<ul>
<li>Your listings sell quickly and consistently at the current price.</li>
<li>You are getting more custom requests than you have time for.</li>
<li>Buyers come back without being prompted.</li>
</ul>
<p>Increase one tier at a time by a small amount and watch what happens for a couple of weeks. If sales hold steady, the new price is your new baseline.</p>

<h2>Remember what you actually keep</h2>
<p>Your listed price is not your take-home amount. Platforms charge a fee or commission, payment methods can have their own costs, and income is generally taxable. Check the fee terms of whichever platform you use and price with your net earnings in mind.</p>

<h2>A simple starting plan</h2>
<ol>
<li>List a handful of single photos at an entry-level price.</li>
<li>Add one or two themed sets at a clear bundle discount.</li>
<li>Offer custom requests at a premium and state your turnaround time.</li>
<li>Review your sales after a few weeks and adjust one thing at a time.</li>
</ol>
<p>No price list can promise an income — results depend on your effort, consistency, and audience. But a clear structure makes it far easier to learn what works. New to all this? Start with our <a href="/blog/how-to-sell-feet-pics-safely">safety checklist</a> first.</p>
`.trim(),
  },
  {
    id: 'seed-stay-anonymous',
    slug: 'stay-anonymous-selling-feet-pics',
    title: 'How to Stay Anonymous When You Sell Feet Pics',
    excerpt:
      'You do not need to show your face or share your name to sell feet pics. These practical steps keep your photos from being traced back to you.',
    coverImage: '',
    coverAlt: '',
    tags: ['Privacy', 'Safety'],
    author,
    status: 'published',
    publishedAt: '2026-09-24T09:00:00.000Z',
    createdAt: '2026-09-24T09:00:00.000Z',
    updatedAt: '2026-09-24T09:00:00.000Z',
    metaTitle: '',
    metaDescription:
      'A privacy guide for selling feet pics anonymously: remove photo metadata, hide identifying marks, use a separate identity, and avoid common slip-ups.',
    content: `
<p>For many sellers, privacy is the deciding factor. You do not have to show your face or use your real name to sell feet pics — but staying anonymous takes a little more than choosing a clever username. Here is what actually matters.</p>

<h2>Strip the hidden data from your photos</h2>
<p>Phone cameras save extra information inside every image file, known as EXIF metadata. It can include the date, the device model, and sometimes the GPS coordinates of where the photo was taken.</p>
<ul>
<li>Turn off location tagging for your camera app in your phone's settings.</li>
<li>Before uploading, remove metadata using your phone's share options or a metadata-removal app.</li>
<li>If in doubt, take a screenshot of the photo and upload the screenshot — it will not carry the original location data.</li>
</ul>
<p>Many platforms strip metadata on upload, but it is safer not to rely on it.</p>

<h2>Check the frame before you shoot</h2>
<p>People are identified by backgrounds far more often than by their feet. Look at everything the camera can see:</p>
<ul>
<li>Mail, packages, documents, or screens with your name on them.</li>
<li>Windows showing a recognisable view or street.</li>
<li>Distinctive furniture, flooring, or decor that also appears on your personal social media.</li>
<li>Mirrors and other reflective surfaces.</li>
</ul>
<p>A plain sheet, a blanket, or a neutral backdrop solves most of these in one step.</p>

<h2>Cover identifying marks</h2>
<p>Tattoos, scars, birthmarks, and distinctive jewellery can be recognised by people who know you. Cover them, choose angles that keep them out of frame, or edit them out. Decide on this before you start — once a photo is sold, you cannot take it back.</p>

<h2>Build a separate seller identity</h2>
<ul>
<li><strong>Username.</strong> Pick one you have never used anywhere else, with no part of your real name, birthday, or location.</li>
<li><strong>Email.</strong> Create a new address just for selling.</li>
<li><strong>Social accounts.</strong> If you promote your work, use dedicated accounts and do not follow or interact with your personal ones.</li>
<li><strong>Photos.</strong> Never reuse an image that also appears on a personal account. Reverse image search can connect the two.</li>
</ul>

<h2>Keep payments private</h2>
<p>Personal payment apps often display your full legal name to the other person. Selling through a platform that handles checkout and pays you out separately means buyers see only your seller username.</p>
<p>Note that anonymous to buyers is not the same as anonymous to the platform. Reputable platforms verify that sellers are over 18, which usually involves checking an ID. That verification is a normal legal requirement and is not shown to buyers.</p>

<h2>Watch what you say in messages</h2>
<p>Small details add up. Avoid mentioning your city, workplace, school, daily schedule, or anything else that narrows down who you are. Friendly and professional is enough; you do not owe any buyer personal information.</p>

<h2>Quick privacy checklist</h2>
<ol>
<li>Location tagging off, metadata removed.</li>
<li>Neutral background, no reflections.</li>
<li>Tattoos and other identifying marks hidden.</li>
<li>Unique username and dedicated email.</li>
<li>Payments handled through the platform.</li>
<li>No personal details in chat.</li>
</ol>
<p>Privacy is a habit rather than a one-time setting. Run through this list every time you shoot and it quickly becomes second nature. Next, learn <a href="/blog/how-to-price-feet-pics">how to price your photos</a>.</p>
`.trim(),
  },
  {
    id: 'seed-better-feet-pics-phone',
    slug: 'better-feet-pics-phone',
    title: 'How to Take Better Feet Pics With Just Your Phone',
    excerpt:
      'A recent phone, good light, and a few simple habits are all you need. Here is how to shoot, frame, and edit feet pics that look professional.',
    coverImage: '/images/blog/phone-photo-tips.jpg',
    coverAlt: 'Illustration of a phone on a small tripod in soft window light',
    tags: ['Photography', 'Beginners', 'Tips & Tricks'],
    author,
    status: 'published',
    publishedAt: '2026-10-02T09:00:00.000Z',
    createdAt: '2026-10-02T09:00:00.000Z',
    updatedAt: '2026-10-02T09:00:00.000Z',
    metaTitle: 'How to Take Better Feet Pics With Your Phone',
    metaDescription:
      'Phone photography tips for feet pics: use window light, clean up the frame, pick flattering angles, adjust camera settings, and edit lightly.',
    content: `
<p>You do not need a professional camera to take feet pics that sell. A recent phone, good light, and a few habits will get you most of the way there. This guide covers what actually makes the difference.</p>
<h2>Start with light, not gear</h2>
<p>Lighting matters more than the phone you own. Soft, even light makes skin look smooth and keeps colours accurate, while harsh light creates hard shadows and shiny patches.</p>
<ul><li><p>Shoot near a window during the day, with the light coming from the side or front.</p></li><li><p>Avoid direct midday sun. A thin curtain turns harsh sunlight into soft light.</p></li><li><p>Turn off the ceiling light so you are not mixing warm and cool colours.</p></li></ul>
<h2>Clean up the frame</h2>
<p>Look at everything the camera can see, not just your feet. A plain sheet, a rug, or a clean floor makes the photo look deliberate. Clutter, laundry, and cables make it look rushed.</p>
<h2>Prep before you shoot</h2>
<p>Small details show up clearly in close-ups. Moisturise the day before rather than <strong>right before</strong> the shoot, so skin looks healthy instead of greasy, and tidy your nails.</p>
<h2>Five angles that work</h2>
<ol><li><p><strong>Top-down.</strong> Stand or sit and shoot straight down for a clean, simple view.</p></li><li><p><strong>Side profile.</strong> Shows the arch. Keep the camera level with your foot.</p></li><li><p><strong>Soles.</strong> Kneel or lie down and shoot from behind with your toes relaxed.</p></li><li><p><strong>Pointed toes.</strong> Stretching the foot makes lines look longer.</p></li><li><p><strong>In context.</strong> Sandals, socks, sand, or a blanket add variety to a set.</p></li></ol>
<h2>Phone camera settings worth changing</h2>
<p>A few settings make a visible difference:</p>
<ul><li><p>Wipe the lens. Fingerprints are the most common cause of hazy photos.</p></li><li><p>Turn on the grid to keep horizons straight and framing balanced.</p></li><li><p>Tap to focus, then lower the exposure slightly so highlights are not blown out.</p></li><li><p>Use the main rear camera. It is sharper than the selfie or ultra-wide lens.</p></li></ul>
<h3>Portrait mode: use with care</h3>
<p>Background blur can look great, but it often smudges the edges of toes. Check the result at full size before you use it.</p>
<h2>Edit lightly</h2>
<p>Crop, straighten, and make small brightness and warmth adjustments. Skip heavy filters and skin smoothing. Buyers want photos that look real.</p>
<blockquote><p>If the edit is the first thing you notice, it is too much.</p></blockquote>
<h2>Do a privacy check before you upload</h2>
<p>Before a photo leaves your phone, check the background for anything identifying and remove location data. Our guide to <a href="/blog/stay-anonymous-selling-feet-pics">staying anonymous</a> walks through every step.</p>
<h2>Quick pre-upload checklist</h2>
<ul><li><p>Soft, even light</p></li><li><p>Clean, plain background</p></li><li><p>Lens wiped, focus sharp</p></li><li><p>Light edit only</p></li><li><p>No identifying details or location data</p></li></ul>
<p>Good photos are a habit, not a talent. Once this routine feels natural, the next step is deciding <a href="/blog/how-to-price-feet-pics">what to charge for your photos</a>.</p>
`.trim(),
  },
]

// Reading time is derived from the text, exactly as it is for posts saved through the editor.
export const seedPosts: Post[] = drafts.map((post) => ({
  ...post,
  readingMinutes: readingMinutes(post.content.replace(/<[^>]+>/g, ' ')),
}))
