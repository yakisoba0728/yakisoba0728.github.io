import KineticText from '@/components/KineticText'
import T from '@/components/T'
import { profile } from '@/content/profile'

export default function Creed() {
  return (
    <section className="creed">
      <p className="section-label"><T ko="신념" en="Belief" /></p>
      <KineticText
        as="p"
        className="creed-text mt-6"
        lines={profile.creedLines}
        linesEn={profile.creedLinesEn}
        highlight={profile.creedHighlight}
        highlightEn={profile.creedHighlightEn}
      />
      <p className="creed-sign">— <b><T ko={profile.name} en={profile.nameEn} /></b></p>
    </section>
  )
}
