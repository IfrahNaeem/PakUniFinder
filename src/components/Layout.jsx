import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  GraduationCap, Search, Bookmark, Home, Info,
  X, ChevronRight,
} from 'lucide-react'
import { savedCount } from '../utils/savedPrograms.js'
import { useLanguage } from '../context/LanguageContext.jsx'

// ─── Inline styles ────────────────────────────────────────
const STYLE = `
  @keyframes bannerIn {
    from { transform:translateY(-100%); opacity:0; }
    to   { transform:translateY(0);     opacity:1; }
  }
  @keyframes waBounce {
    0%,100% { transform:scale(1); }
    50%      { transform:scale(1.1) translateY(-3px); }
  }
  .banner-in { animation: bannerIn 0.3s ease both; }
  .wa-bounce  { animation: waBounce 3s ease-in-out infinite; }

  .touch-target {
    min-width:  44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

// ─── Config ───────────────────────────────────────────────
const BOTTOM_TABS = [
  { to:'/',      iconEl: Home,     labelKey:'nav.home',  end:true },
  { to:'/quiz',  iconEl: Search,   labelKey:'nav.find',  end:false },
  { to:'/saved', iconEl: Bookmark, labelKey:'nav.saved', end:false, badge:true },
  { to:'/about', iconEl: Info,     labelKey:'nav.about', end:false },
]

const DESKTOP_LINKS = [
  { to:'/',      labelKey:'nav.home',  end:true },
  { to:'/saved', labelKey:'nav.saved', end:false },
  { to:'/about', labelKey:'nav.about', end:false },
]

const BANNER_KEY  = 'bannerDismissed_v1'
const APP_ORIGIN  = typeof window !== 'undefined' ? window.location.origin : 'https://pakistan-uni-finder.app'

const HIDE_NAV_PATHS = ['/quiz']

// ─── Desktop Header ───────────────────────────────────────
function DesktopHeader({ savedBadge }) {
  const navigate  = useNavigate()
  const { t }     = useLanguage()

  return (
    <header
      className="hidden md:flex items-center justify-between px-8 py-0 border-b shadow-sm"
      style={{ background:'#1E293B', borderColor:'#0F172A', minHeight: 60 }}
      role="banner"
    >
      <NavLink
        to="/"
        className="flex items-center gap-2.5 text-white font-extrabold text-lg flex-shrink-0"
        aria-label="Pakistan University Finder — go to home"
      >
        <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:'rgba(255,255,255,0.15)' }}>
          <GraduationCap size={20} strokeWidth={1.6} aria-hidden="true" />
        </span>
        Pakistan Uni Finder
      </NavLink>

      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-6 list-none m-0 p-0">
          {DESKTOP_LINKS.map(({ to, labelKey, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all touch-target rounded-lg px-2 ${
                    isActive ? 'text-white underline underline-offset-4' : 'text-blue-200 hover:text-white'
                  }`
                }
              >
                {labelKey === 'nav.saved' ? (
                  <span className="flex items-center gap-1.5">
                    {t(labelKey)}
                    {savedBadge > 0 && (
                      <span
                        className="text-[10px] font-extrabold min-w-[18px] h-[18px] rounded-full flex items-center justify-center"
                        style={{ background:'#2563EB', color:'#FFFFFF' }}
                        aria-label={`${savedBadge} saved programs`}
                      >
                        {savedBadge > 9 ? '9+' : savedBadge}
                      </span>
                    )}
                  </span>
                ) : t(labelKey)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={() => navigate('/quiz')}
        className="touch-target flex items-center gap-2 px-4 rounded-xl text-sm font-bold transition-transform hover:scale-105 active:scale-95"
        style={{ background:'#2563EB', color:'#FFFFFF' }}
        aria-label="Start quiz to find your university"
      >
        {t('nav.findCta')} <ChevronRight size={15} aria-hidden="true" />
      </button>
    </header>
  )
}

// ─── Mobile Bottom Nav ────────────────────────────────────
function MobileNav({ savedBadge }) {
  const location = useLocation()
  const { t }    = useLanguage()

  if (HIDE_NAV_PATHS.some((p) => location.pathname.startsWith(p))) return null

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex border-t"
      style={{ background:'#ffffff', borderColor:'#E2E8F0', boxShadow:'0 -2px 16px rgba(0,0,0,0.08)' }}
      aria-label="Mobile navigation"
      role="navigation"
    >
      {BOTTOM_TABS.map(({ to, iconEl: Icon, labelKey, end, badge }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          aria-label={t(labelKey)}
          className="flex-1 flex flex-col items-center justify-center py-2 relative touch-target"
          style={{ minHeight: 56 }}
        >
          {({ isActive }) => (
            <>
              <span
                className="relative flex items-center justify-center w-10 h-7 rounded-full transition-all"
                style={{ background: isActive ? '#EFF6FF' : 'transparent' }}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.2 : 1.7}
                  style={{ color: isActive ? '#1E293B' : '#9CA3AF' }}
                  aria-hidden="true"
                />
                {badge && savedBadge > 0 && (
                  <span
                    className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold"
                    style={{ background:'#2563EB', color:'#FFFFFF' }}
                    aria-hidden="true"
                  >
                    {savedBadge > 9 ? '9+' : savedBadge}
                  </span>
                )}
              </span>
              <span
                className="text-[11px] font-semibold mt-0.5"
                style={{ color: isActive ? '#1E293B' : '#9CA3AF' }}
                aria-hidden="true"
              >
                {t(labelKey)}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

// ─── Dismissible banner ───────────────────────────────────
function WarningBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(() => !localStorage.getItem(BANNER_KEY))

  function dismiss() {
    localStorage.setItem(BANNER_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="banner-in flex items-center gap-3 px-4 py-2.5"
      style={{ background:'#FEF9E7', borderBottom:'1px solid #FAD7A0' }}
      role="alert"
      aria-live="polite"
    >
      <span className="text-sm flex-shrink-0" aria-hidden="true">⚠️</span>
      <p className="text-xs flex-1 leading-snug" style={{ color:'#7D6608' }}>
        {t('banner.text')}
      </p>
      <button
        onClick={dismiss}
        className="touch-target rounded-full flex items-center justify-center transition-colors hover:bg-amber-200 flex-shrink-0"
        style={{ minWidth:36, minHeight:36 }}
        aria-label="Dismiss notice"
      >
        <X size={14} style={{ color:'#B7770D' }} aria-hidden="true" />
      </button>
    </div>
  )
}

// ─── WhatsApp float button ────────────────────────────────
function WhatsAppButton() {
  const { t }    = useLanguage()
  const location = useLocation()
  if (HIDE_NAV_PATHS.some((p) => location.pathname.startsWith(p))) return null

  const waText = encodeURIComponent(t('wa.message') + APP_ORIGIN)

  return (
    <a
      href={`https://wa.me/?text=${waText}`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-bounce fixed right-4 z-30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 md:bottom-6"
      style={{
        background: '#25D366',
        bottom: 'calc(56px + 16px)',
        boxShadow: '0 4px 20px rgba(37,211,102,0.5)',
      }}
      aria-label="Share this app on WhatsApp"
      title="Share on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  )
}

// ─── Mobile header bar for non-tab pages ─────────────────
function MobileTopBar() {
  const location = useLocation()
  if (!location.pathname.startsWith('/results') && !location.pathname.startsWith('/university')) return null

  return (
    <div
      className="md:hidden flex items-center px-4 py-2 border-b"
      style={{ background:'#1E293B', borderColor:'#0F172A' }}
    >
      <span className="text-white font-bold text-sm flex items-center gap-2">
        <GraduationCap size={18} aria-hidden="true" /> Uni Finder
      </span>
    </div>
  )
}

// ─── Main Layout ──────────────────────────────────────────
export default function Layout({ children }) {
  const [badge, setBadge] = useState(savedCount)

  useEffect(() => {
    function sync() { setBadge(savedCount()) }
    window.addEventListener('savedProgramsChanged', sync)
    return () => window.removeEventListener('savedProgramsChanged', sync)
  }, [])

  return (
    <>
      <style>{STYLE}</style>

      <div className="flex flex-col min-h-screen">
        <WarningBanner />
        <DesktopHeader savedBadge={badge} />
        <MobileTopBar />

        <main
          id="main-content"
          className="flex-1 pb-14 md:pb-0"
          tabIndex={-1}
        >
          {children}
        </main>

        <WhatsAppButton />
        <MobileNav savedBadge={badge} />
      </div>
    </>
  )
}
