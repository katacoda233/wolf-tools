import Link from 'next/link'

const Header = () => {
  return (
    <header className="navbar border-b bg-base-100 border-base-300 min-h-0 px-4 h-12">
      <div className="navbar-start">
        <Link href="/">
          <a className="router-link-active router-link-exact-active">
            <h1 className="text-base-content">
              <span className="text-2xl">🐺</span><span className="text-lg">Wolf Tools</span>
            </h1>
          </a>
        </Link>
      </div>
      <div className="navbar-center"/>
      <div className="navbar-end">
      </div>
    </header>
  )
}

export default Header
