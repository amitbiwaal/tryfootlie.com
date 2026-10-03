import { ImageResponse } from 'next/og'
import { site } from '@/lib/site'

export const alt = 'Footly — sell feet pics online safely and anonymously'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: 26, height: 26, borderRadius: 13, background: '#e23a76', marginRight: 18 }} />
          <div style={{ fontSize: 44, fontWeight: 700, color: '#15131a', letterSpacing: -1.5 }}>{site.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#e23a76', letterSpacing: 4, marginBottom: 22 }}>
            THE CALM WAY TO SELL FEET PICS
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, color: '#15131a', lineHeight: 1.06, letterSpacing: -3 }}>
            Sell feet pics online — safely, anonymously, profitably.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #eceaef',
            paddingTop: 28,
            fontSize: 26,
            color: '#6b6675',
          }}
        >
          <div style={{ display: 'flex' }}>Free to join · 18+ only · No face required</div>
          <div style={{ display: 'flex', color: '#15131a', fontWeight: 700 }}>{site.domain}</div>
        </div>
      </div>
    ),
    size
  )
}
