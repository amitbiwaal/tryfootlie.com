import type { Metadata } from 'next'
import Link from 'next/link'
import { CtaLink } from '@/components/CtaLink'
import { JsonLd } from '@/components/JsonLd'
import { PostCard } from '@/components/PostCard'
import {
  audiences,
  benefits,
  categories,
  checklist,
  comparison,
  faqs,
  features,
  Icon,
  quotes,
  stats,
  steps,
  tips,
  trustBadges,
  whyFootly,
} from '@/lib/home-content'
import { getPublishedPosts } from '@/lib/posts'
import { absoluteUrl, site } from '@/lib/site'

export const revalidate = 300

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  keywords: [...site.keywords],
  alternates: { canonical: '/' },
}

const pad = (n: number) => String(n).padStart(2, '0')

export default async function HomePage() {
  const latestPosts = (await getPublishedPosts()).slice(0, 3)

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: site.name,
          url: absoluteUrl('/'),
          logo: absoluteUrl('/icon-512.png'),
          description:
            'Footly is an independent guide that helps creators sell feet pics online safely, anonymously, and profitably.',
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: `${site.name} Guide`,
          url: absoluteUrl('/'),
          potentialAction: {
            '@type': 'SearchAction',
            target: `${absoluteUrl('/blog')}?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />

      {/* 1. HERO — centered + art band */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <span className="eyebrow">Footly · The calm way to sell feet pics</span>
          <h1 id="hero-title">Sell feet pics online with Footly — safely, anonymously, profitably.</h1>
          <p className="lead">
            Footly turns your photos into income. Set your own prices, stay completely anonymous, and get paid fast —
            without the scams, spam, or guesswork of selling feet pics anywhere else.
          </p>
          <div className="hero-cta">
            <CtaLink className="btn btn--lg">Start selling on Footly</CtaLink>
            <Link className="link-arrow" href="#how-it-works">
              See how it works <span aria-hidden="true">↓</span>
            </Link>
          </div>
          <p className="hero-note">Free to join · 18+ only · No face required · Secure, discreet payouts</p>

          <div className="hero-art">
            <svg
              viewBox="0 0 440 280"
              width="100%"
              fill="none"
              role="img"
              aria-label="Minimal line illustration of the Footly app used to sell feet pics online safely and get paid securely"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="34" y="20" width="196" height="240" rx="20" stroke="#15131a" strokeWidth="1.6" />
              <circle cx="56" cy="42" r="5" stroke="#15131a" strokeWidth="1.4" />
              <text x="70" y="46" fill="#15131a" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold">Footly</text>
              <line x1="34" y1="60" x2="230" y2="60" stroke="#eceaef" strokeWidth="1.4" />
              <rect x="54" y="80" width="72" height="72" rx="10" stroke="#15131a" strokeWidth="1.4" />
              <rect x="138" y="80" width="72" height="72" rx="10" stroke="#15131a" strokeWidth="1.4" />
              <circle cx="90" cy="116" r="3.4" fill="#e23a76" />
              <circle cx="174" cy="116" r="3.4" fill="#e23a76" />
              <line x1="54" y1="176" x2="150" y2="176" stroke="#15131a" strokeWidth="1.4" />
              <line x1="54" y1="194" x2="196" y2="194" stroke="#eceaef" strokeWidth="1.4" />
              <rect x="54" y="216" width="120" height="30" rx="15" fill="#e23a76" />
              <text x="74" y="235" fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold">List for sale</text>
              <rect x="262" y="72" width="150" height="74" rx="14" stroke="#15131a" strokeWidth="1.6" />
              <text x="282" y="100" fill="#6b6675" fontFamily="Arial, sans-serif" fontSize="11">New sale</text>
              <text x="282" y="124" fill="#e23a76" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold">+ $24.00</text>
              <circle cx="300" cy="190" r="16" stroke="#15131a" strokeWidth="1.5" />
              <path d="M293 190l5 5 9-10" stroke="#e23a76" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <text x="326" y="188" fill="#15131a" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="bold">Payout sent</text>
              <text x="326" y="204" fill="#6b6675" fontFamily="Arial, sans-serif" fontSize="10">Discreet &amp; secure</text>
            </svg>
          </div>

          <div className="trust">
            {trustBadges.map((badge) => (
              <span key={badge.label}>
                <Icon>{badge.icon}</Icon> {badge.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. WHAT IS FOOTLY — split aside */}
      <section id="what-is-footly" aria-labelledby="what-title">
        <div className="wrap split">
          <div className="split-head">
            <span className="eyebrow">
              <span className="idx">01</span>What is Footly
            </span>
            <h2 id="what-title">What is Footly, and why sell feet pics there?</h2>
          </div>
          <div className="split-body measure">
            <p className="lead lead--gap">
              Footly is a dedicated creator platform that makes it simple, safe, and genuinely profitable to{' '}
              <strong>sell feet pics</strong> online. Instead of trading photos through risky social-media DMs or chasing
              strangers for payment, Footly gives you one secure home where buyers come to you, payments are handled
              automatically, and your identity stays protected.
            </p>
            <p className="muted">
              Thousands of people search for how to sell feet pics every month — but most never start, because they
              worry about scams, privacy, and getting paid. Footly removes those barriers. Every transaction runs
              through Footly&apos;s secure checkout, every buyer is verified, and you decide exactly what you list and
              what it costs. Whether you want a little extra income or a serious creator business, Footly gives you the
              tools, audience, and protection to do it on your own terms.
            </p>
          </div>
        </div>
      </section>

      {/* 3. KEY FEATURES — centered head + grid */}
      <section id="features" aria-labelledby="feat-title">
        <div className="wrap">
          <div className="center-head">
            <span className="eyebrow">
              <span className="idx">02</span>Key features
            </span>
            <h2 id="feat-title">Everything Footly gives you to sell feet pics</h2>
            <p className="lead">
              Footly packs the whole workflow — listing, selling, getting paid, and staying private — into one
              lightweight platform.
            </p>
          </div>
          <div className="grid cols-3">
            {features.map((f) => (
              <article className="cell" key={f.title}>
                <div className="ic" aria-hidden="true">
                  <Icon>{f.icon}</Icon>
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BENEFITS — reversed split + numbered list */}
      <section id="benefits" aria-labelledby="ben-title">
        <div className="wrap split split--rev">
          <div className="split-head">
            <span className="eyebrow">
              <span className="idx">03</span>Benefits
            </span>
            <h2 id="ben-title">Why creators choose Footly to sell feet pics</h2>
            <p className="lead">
              It&apos;s not just about uploading photos — it&apos;s about doing it safely and actually getting paid.
            </p>
          </div>
          <div className="split-body">
            <div className="stack">
              {benefits.map((b, i) => (
                <div className="item" key={b.title}>
                  <span className="n" aria-hidden="true">{pad(i + 1)}</span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS — band + timeline */}
      <section id="how-it-works" className="band" aria-labelledby="how-title">
        <div className="wrap">
          <div className="center-head">
            <span className="eyebrow">
              <span className="idx">04</span>How it works
            </span>
            <h2 id="how-title">How to sell feet pics on Footly in 4 steps</h2>
            <p className="lead">
              Footly takes you from sign-up to first sale faster than you&apos;d expect — most creators list their first
              photos in under ten minutes.
            </p>
          </div>
          <div className="timeline">
            {steps.map((s) => (
              <div className="tl" key={s.title}>
                <span className="k" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CATEGORIES — centered chip cloud */}
      <section id="categories" aria-labelledby="cat-title">
        <div className="wrap">
          <div className="center-head">
            <span className="eyebrow">
              <span className="idx">05</span>What you can sell
            </span>
            <h2 id="cat-title">Categories you can offer on Footly</h2>
            <p className="lead">
              Footly supports a wide range of tasteful, in-demand feet content, so you can build listings around what
              buyers actually search for.
            </p>
          </div>
          <div className="chips chips--center">
            {categories.map((c) => (
              <span className="chip" key={c.label}>
                <Icon>{c.icon}</Icon> {c.label}
              </span>
            ))}
          </div>
          <p className="muted note-center">
            Every category on Footly is yours to price and package however you like — mix and match to find what sells
            best for your audience.
          </p>
        </div>
      </section>

      {/* 7. WHY CHOOSE FOOTLY — split aside + grid */}
      <section id="why-footly" aria-labelledby="why-title">
        <div className="wrap split">
          <div className="split-head">
            <span className="eyebrow">
              <span className="idx">06</span>Why choose Footly
            </span>
            <h2 id="why-title">Why Footly is built for people who want to sell feet pics</h2>
            <p className="lead">
              Footly is designed around the three things creators care about most: safety, privacy, and getting paid.
            </p>
          </div>
          <div className="split-body">
            <div className="grid cols-2">
              {whyFootly.map((w) => (
                <article className="cell" key={w.title}>
                  <div className="ic" aria-hidden="true">
                    <Icon>{w.icon}</Icon>
                  </div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. COMPARISON — centered head + table */}
      <section id="comparison" aria-labelledby="cmp-title">
        <div className="wrap">
          <div className="center-head">
            <span className="eyebrow">
              <span className="idx">07</span>What sets it apart
            </span>
            <h2 id="cmp-title">Footly vs. selling feet pics the old way</h2>
            <p className="lead">
              See why a purpose-built platform like Footly beats trying to sell feet pics through social media or random
              marketplaces.
            </p>
          </div>
          <div className="table-wrap" tabIndex={0} role="region" aria-label="Comparison table">
            <table className="compare">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col" className="hl">Footly</th>
                  <th scope="col">Social-media DMs</th>
                  <th scope="col">Generic marketplaces</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    <td className="col-hl">{row.footly}</td>
                    <td>{row.dms}</td>
                    <td>{row.generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted note-center">
            The bottom line: Footly gives you the protection and audience that ad-hoc methods simply can&apos;t, which is
            why it&apos;s one of the smartest places to sell feet pics online.
          </p>
        </div>
      </section>

      {/* 9. USE CASES — reversed split + card grid */}
      <section id="who-its-for" aria-labelledby="who-title">
        <div className="wrap split split--rev">
          <div className="split-head">
            <span className="eyebrow">
              <span className="idx">08</span>Who it&apos;s for
            </span>
            <h2 id="who-title">Who Footly is perfect for</h2>
            <p className="lead">Whatever your goal, Footly adapts to the way you want to sell feet pics.</p>
          </div>
          <div className="split-body">
            <div className="grid cols-2">
              {audiences.map((a) => (
                <article className="cell" key={a.title}>
                  <div className="ic" aria-hidden="true">
                    <Icon>{a.icon}</Icon>
                  </div>
                  <h3>{a.title}</h3>
                  <p>{a.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. SOCIAL PROOF — band + stat row + quotes */}
      <section id="social-proof" className="band" aria-labelledby="sp-title">
        <div className="wrap">
          <div className="center-head">
            <span className="eyebrow">
              <span className="idx">09</span>Trust &amp; results
            </span>
            <h2 id="sp-title">Creators trust Footly to sell feet pics</h2>
            <p className="lead">
              Numbers and stories from the Footly community show why it&apos;s become a go-to platform in the niche.
            </p>
          </div>
          <div className="stat-band">
            {stats.map((s) => (
              <div className="s" key={s.label}>
                <div className="num">{s.num}</div>
                <span className="lbl">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="quotes">
            {quotes.map((q) => (
              <figure className="quote" key={q.name}>
                <div className="stars" role="img" aria-label="Rated 5 out of 5">★★★★★</div>
                <blockquote>
                  <p>{q.text}</p>
                </blockquote>
                <figcaption className="who">
                  <b>{q.name}</b> — {q.role}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="muted note-small">
            Ratings and creator quotes are illustrative of the Footly experience and the kind of results the platform is
            built to support.
          </p>
        </div>
      </section>

      {/* 11. FAQ — split aside + accordion */}
      <section id="faq" aria-labelledby="faq-title">
        <div className="wrap split">
          <div className="split-head">
            <span className="eyebrow">
              <span className="idx">10</span>FAQ
            </span>
            <h2 id="faq-title">Frequently asked questions about selling feet pics on Footly</h2>
            <p className="lead">
              The answers creators search for most before they start to sell feet pics with Footly.
            </p>
          </div>
          <div className="split-body">
            <div className="faq">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. GETTING STARTED — reversed split + checklist + CTA */}
      <section id="getting-started" aria-labelledby="gs-title">
        <div className="wrap split split--rev">
          <div className="split-head">
            <span className="eyebrow">
              <span className="idx">11</span>Getting started
            </span>
            <h2 id="gs-title">Your Footly getting-started guide</h2>
            <p className="lead lead--gap-lg">
              Follow this quick checklist and you&apos;ll be ready to sell feet pics on Footly today.
            </p>
            <CtaLink className="btn btn--lg">Create your Footly account</CtaLink>
          </div>
          <div className="split-body">
            <div className="list2">
              {checklist.map((c, i) => (
                <div className="item" key={c.title}>
                  <span className="n" aria-hidden="true">{pad(i + 1)}</span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 13. TIPS — centered head + grid */}
      <section id="tips" aria-labelledby="tips-title">
        <div className="wrap">
          <div className="center-head">
            <span className="eyebrow">
              <span className="idx">12</span>Tips &amp; best practices
            </span>
            <h2 id="tips-title">Pro tips to sell more feet pics on Footly</h2>
            <p className="lead">
              Small improvements make a big difference. Use these best practices to boost your Footly sales safely.
            </p>
          </div>
          <div className="tips">
            {tips.map((t, i) => (
              <div className="tip" key={t.title}>
                <span className="n" aria-hidden="true">{pad(i + 1)}</span>
                <div>
                  <b>{t.title}</b>
                  <p>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FROM THE BLOG — latest guides */}
      {latestPosts.length > 0 && (
        <section id="guides" aria-labelledby="guides-title">
          <div className="wrap">
            <div className="center-head">
              <span className="eyebrow">
                <span className="idx">13</span>From the blog
              </span>
              <h2 id="guides-title">Guides to help you sell feet pics</h2>
              <p className="lead">Practical, step-by-step articles on safety, pricing, and privacy.</p>
            </div>
            <div className="post-grid">
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} headingLevel="h3" />
              ))}
            </div>
            <div className="more-row">
              <Link className="link-arrow" href="/blog">
                Read all guides <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 15. FINAL CTA — centered band */}
      <section id="start" className="band" aria-labelledby="final-title">
        <div className="wrap">
          <div className="cta-band">
            <span className="eyebrow eyebrow--center">
              <span className="idx">{latestPosts.length > 0 ? '14' : '13'}</span>Get started
            </span>
            <h2 id="final-title">Ready to sell feet pics with Footly?</h2>
            <p>
              Join the creators who chose the safe, anonymous, and profitable way to turn photos into income. Set your
              prices, protect your privacy, and start earning with Footly today.
            </p>
            <CtaLink className="btn btn--lg">Start selling on Footly</CtaLink>
            <p className="mini">Free to join · 18+ only · No face required · Secure, discreet payouts</p>
          </div>
        </div>
      </section>
    </>
  )
}
