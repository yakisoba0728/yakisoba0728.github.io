import T from '@/components/T'

/** Playful, bilingual empty-state message used across the site. */
export default function EmptyState({ className = '' }: { className?: string }) {
  return (
    <p className={`text-muted ${className}`}>
      <T ko="어… 비어있네요? 👀" en="Oh… nothing here yet? 👀" />
    </p>
  )
}
