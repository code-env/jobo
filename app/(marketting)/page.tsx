import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/components/shared/logo";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-white text px-4 lg:px-6 py-4 flex items-center justify-between">
        <Logo href="#" />
        <nav className="hidden lg:flex gap-4">
          <Link
            href="#"
            className="hover:underline underline-offset-4"
            prefetch={false}
          >
            Find Work
          </Link>
          <Link
            href="#"
            className="hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <Link href="/sign-up" className="hidden lg:inline-flex">
          Sign Up
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="grid gap-4 p-4">
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Find Work
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Contact
              </Link>
              <Link href="/sign-up">Sign Up</Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="bg-white py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Find Flexible Work on Your Terms
            </h1>
            <p className="max-w-[600px] mx-auto text-lg md:text-xl">
              Jobo connects you with diverse freelance opportunities that fit
              your schedule and skills.
            </p>
            <div>
              <Button size="lg">Find Work</Button>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-12 lg:grid-cols-3">
            <div className="space-y-4 text-center">
              <ClockIcon className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">Flexible Schedules</h3>
              <p className="text-muted-foreground">
                Work when you want, where you want. Jobo offers a wide range of
                flexible freelance opportunities.
              </p>
            </div>
            <div className="space-y-4 text-center">
              <UsersIcon className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">Diverse Talent</h3>
              <p className="text-muted-foreground">
                Tap into a global pool of skilled freelancers across a variety
                of industries and expertise.
              </p>
            </div>
            <div className="space-y-4 text-center">
              <DollarSignIcon className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-bold">Competitive Rates</h3>
              <p className="text-muted-foreground">
                Set your own rates and get paid on time. Jobo helps you maximize
                your earning potential.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Clients Say
            </h2>
            <p className="max-w-[600px] mx-auto text-lg md:text-xl text-muted-foreground">
              Hear from the businesses and individuals who have found success
              with Jobo.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-background p-6 text-left space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">John Doe</p>
                    <p className="text-sm text-muted-foreground">
                      CEO, Acme Inc.
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  &quot;Jobo has been a game-changer for our business.
                  We&apos;ve been able to find top-notch freelance talent to
                  help us scale quickly and cost-effectively.&quot;
                </p>
              </Card>
              <Card className="bg-background p-6 text-left space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">Sarah Miller</p>
                    <p className="text-sm text-muted-foreground">
                      Freelance Designer
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  &quot;Jobo has been a game-changer for my freelance career.
                  I&apo;ve been able to find consistent, high-paying work that
                  fits my schedule and skills.&quot;
                </p>
              </Card>
              <Card className="bg-background p-6 text-left space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>TW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">Tom Wilson</p>
                    <p className="text-sm text-muted-foreground">
                      Freelance Developer
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  &quot;Jobo has been a game-changer for my freelance career.
                  I&apos;ve been able to find consistent, high-paying work that
                  fits my schedule and skills.&quot;
                </p>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted text-muted-foreground px-4 md:px-6 py-8">
        <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <h4 className="font-bold">Jobo</h4>
            <div className=" flex flex-col gap-2">
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Careers
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Press
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold">For Freelancers</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Find Work
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Success Stories
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold">For Businesses</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Post a Job
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                How It Works
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold">Resources</h4>
            <div className="flex flex-col gap-2">
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Blog
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Help Center
              </Link>
              <Link
                href="#"
                className="hover:underline underline-offset-4"
                prefetch={false}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div className="container mt-8 flex items-center justify-between">
          <p className="text-sm">&copy; 2024 Jobo. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hover:underline underline-offset-4"
              prefetch={false}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:underline underline-offset-4"
              prefetch={false}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BriefcaseIcon(props: any) {
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
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

function ClockIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DollarSignIcon(props: any) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function MenuIcon(props: any) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
