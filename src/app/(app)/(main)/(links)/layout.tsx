export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative mx-auto min-h-screen bg-gradient-to-b from-background to-accent">
      {children}
    </div>
  )
}
