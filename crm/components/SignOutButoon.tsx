import { signOut } from '@/app/action/auth'

export function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className=""
      >
        Sign out
      </button>
    </form>
  )
}