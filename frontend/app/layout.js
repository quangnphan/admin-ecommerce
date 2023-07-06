import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ContextProvider } from '@/components/ContextProvider'

export const metadata = {
  title: 'E-commerce Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <ContextProvider>
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
    </ContextProvider>
  )
}
