'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useId, useMemo } from 'react'
import { cn } from '~/lib/utils'

type TextMorphProps = {
  children: string
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
}

export function TextMorph({ children, as: Component = 'p', className, style }: TextMorphProps) {
  const uniqueId = useId()

  const words = useMemo(() => {
    // Разбиваем текст на слова
    return children.split(' ').map((word, wordIndex) => {
      const charCounts: Record<string, number> = {}

      // Обрабатываем каждый символ в слове
      const characters = [...word].map((char, charIndex) => {
        const lowerChar = char.toLowerCase()
        charCounts[lowerChar] = (charCounts[lowerChar] || 0) + 1
        return {
          id: `${uniqueId}-${wordIndex}-${lowerChar}${charCounts[lowerChar]}`,
          label: charIndex === 0 && wordIndex === 0 ? char.toUpperCase() : lowerChar,
        }
      })

      return {
        characters,
        hasSpace: wordIndex !== children.split(' ').length - 1, // Добавляем пробел после всех слов, кроме последнего
      }
    })
  }, [children, uniqueId])

  return (
    <Component className={cn(className)} aria-label={children} style={style}>
      <AnimatePresence mode="popLayout" initial={false}>
        {words.map((word, wordIndex) => (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
            {word.characters.map((character) => (
              <motion.span
                key={character.id}
                layoutId={character.id}
                // @ts-ignore */
                className="inline-block"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 18,
                  mass: 0.3,
                }}
              >
                {character.label}
              </motion.span>
            ))}
            {/* Добавляем пробел после слова */}
            {word.hasSpace && <span className="inline-block w-[0.3em]">&nbsp;</span>}
          </span>
        ))}
      </AnimatePresence>
    </Component>
  )
}
