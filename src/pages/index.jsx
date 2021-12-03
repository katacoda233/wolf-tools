import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

function HomePage () {
  return (
    <div className="min-h-screen grid bg-base-200" style={{ gridTemplateRows: 'auto 1fr auto' }}>
      <Header/>
      <main className="container max-w-lg mx-auto mt-12">
        <ul className="flex flex-col items-center">
          <li className="">
            <Link href="/mint">
              <a className="btn btn-wide">
                Mint Detail
              </a>
            </Link>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
