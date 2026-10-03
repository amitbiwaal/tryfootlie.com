'use client'

import type { ReactNode } from 'react'

// A submit button that asks before it lets the surrounding <form> run its action.
export function ConfirmButton({
  message,
  className,
  children,
}: {
  message: string
  className?: string
  children: ReactNode
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault()
      }}
    >
      {children}
    </button>
  )
}
