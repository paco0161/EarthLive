"use client"

import { deleteClockList } from '@/lib/api'
import { useFormState, useFormStatus } from 'react-dom'

const initialState = {
  message: '',
}

function DeleteButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  )
}

export function DeleteForm({ userUuid, todo }: { userUuid: string; todo: string }) {
  const [state, formAction] = useFormState(deleteClockList, initialState)

  return (
    <form action={formAction}>
      <input type="hidden" name="userUuid" value={userUuid} />
      <input type="hidden" name="todo" value={todo} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}