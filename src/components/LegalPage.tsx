import type { ReactNode } from 'react'
import { site } from '@/lib/site'

export function LegalPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <>
      <div className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Legal</span>
          <h1>{title}</h1>
          <p className="lead">{intro}</p>
        </div>
      </div>
      <div className="page-body">
        <div className="wrap">
          <div className="prose">
            <p className="updated">Last updated: {site.legalUpdated}</p>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
