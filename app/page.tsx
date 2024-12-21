import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const tools = [
  {
    id: "branding",
    title: "Branding",
    description: "Create your brand identity with our branding tool",
    href: "/branding",
  },
];

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='py-6 px-4 sm:px-6 lg:px-8 border-b'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold'>Design Tools</h1>
          <p className='mt-2 text-muted-foreground'>Select a tool to get started with your design journey</p>
        </div>
      </header>

      <main className='flex-1 py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {tools.map((tool) => (
              <Link key={tool.id} href={tool.href}>
                <Card className='h-full hover:shadow-lg transition-shadow'>
                  <CardHeader>
                    <CardTitle>{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className='text-sm text-muted-foreground'>Click to start →</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className='py-6 px-4 sm:px-6 lg:px-8 border-t'>
        <div className='max-w-7xl mx-auto text-center text-sm text-muted-foreground'>© {new Date().getFullYear()} Design Tools. All rights reserved.</div>
      </footer>
    </div>
  );
}
