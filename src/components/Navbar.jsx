import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { GraduationCap, Search, Bookmark } from 'lucide-react'
import { savedCount } from '../utils/savedPrograms.js'

const LINKS = [
  { to: '/',      label: 'Home',  end: true },
  { to: '/about', label: 'About', end: false },
]

export default function Navbar() {
  const navigate = useNavigate()
  const [count, setCount] = useState(savedCount)

  // Re-read badge count whenever a program is saved/removed
  useEffect(() => {
    function sync() { setCount(savedCount()) }
    window.addEventListener('savedProgramsChanged', sync)
    return () => window.removeEventListener('savedProgramsChanged', sync)
  }, [])

  return (
    <nav
      className="w-full flex items-center justify-between px-5 py-3 shadow-sm"
      style={{ background: '#1E293B' }}
    >
      <NavLink to="/" className="flex items-center gap-2 text-white font-bold text-base">
        <GraduationCap size={22} strokeWidth={1.6} />
        Uni Finder
      </NavLink>

      <div className="flex items-center gap-4">
        {LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `text-sm font-medium transition-opacity ${
                isActive
                  ? 'text-white underline underline-offset-4'
                  : 'text-blue-200 hover:text-white'
              }`
            }
          >
            {label}
          </NavLink>
        ))}

        {/* Bookmark icon with live badge */}
        <NavLink
          to="/saved"
          className={({ isActive }) =>
            `relative flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
              isActive ? 'bg-white/20' : 'hover:bg-white/10'
            }`
          }
          title="Saved programs"
        >
          <Bookmark size={18} color="#ffffff" strokeWidth={1.8} />
          {count > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-extrabold"
              style={{ background: '#2563EB', color: '#FFFFFF' }}
            >
              {count > 9 ? '9+' : count}
            </span>
          )}
        </NavLink>

        <button
          onClick={() => navigate('/quiz')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-transform hover:scale-105 active:scale-95"
          style={{ background: '#2563EB', color: '#FFFFFF' }}
        >
          <Search size={13} /> Find Uni
        </button>
      </div>
    </nav>
  )
}
