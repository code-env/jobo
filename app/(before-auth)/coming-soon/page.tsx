import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Logo from "@/components/shared/logo"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12 text-center">
      <div className="mx-auto max-w-md space-y-4">
        <div className="flex items-center justify-center">
         <Logo href="#" />
          <h1 className="text-xl font-bold tracking-tighter ml-3"> Daily Streaks</h1>
        </div>
        <p className="text-muted-foreground">
          We&apos;re working hard to bring you, A daily Streak where you will be able to compete with other developers and win amazing prices something amazing. Sign up to be the first to know when we launch.
        </p>
        <p className="text-muted-foreground">
          <Link href="/">
            <span className="text-blue-500 hover:underline">Go back to home</span>
          </Link>
        </p>
        <form className="flex w-full max-w-sm gap-2">
          <Input type="email" placeholder="Enter your email" className="flex-1" required />
          <Button type="submit">Notify Me</Button>
        </form>
      </div>
    </div>
  )
}

function MountainIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}