export default function T({ ko, en }: { ko: React.ReactNode; en: React.ReactNode }) {
  return (
    <>
      <span className="t-ko">{ko}</span>
      <span className="t-en">{en}</span>
    </>
  )
}
