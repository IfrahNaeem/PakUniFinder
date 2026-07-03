import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Layout          from './components/Layout.jsx'
import HomePage        from './pages/HomePage.jsx'
import QuizPage        from './pages/QuizPage.jsx'
import ResultsPage     from './pages/ResultsPage.jsx'
import UniversityPage  from './pages/UniversityDetailPage.jsx'
import AboutPage       from './pages/AboutPage.jsx'
import SavedPage       from './pages/SavedPage.jsx'

// ─── Page transition styles ───────────────────────────────
const TRANSITION_STYLE = `
  @keyframes slideInRight {
    from { opacity:0; transform:translateX(28px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-28px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes fadeInPage {
    from { opacity:0; }
    to   { opacity:1; }
  }
  .page-enter-forward { animation: slideInRight 0.25s cubic-bezier(.4,0,.2,1) both; }
  .page-enter-back    { animation: slideInLeft  0.25s cubic-bezier(.4,0,.2,1) both; }
  .page-enter-fade    { animation: fadeInPage   0.2s ease both; }
`

/** Wraps route content with a directional slide animation on every navigation */
function PageTransition({ children }) {
  const location = useLocation()
  const navType  = useNavigationType()

  const cls =
    navType === 'POP'     ? 'page-enter-back'
  : navType === 'PUSH'    ? 'page-enter-forward'
  :                         'page-enter-fade'   // REPLACE (e.g. redirect)

  return (
    <div key={location.key} className={cls} style={{ minHeight: '100%' }}>
      {children}
    </div>
  )
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5, retry: 1 } },
})

function AppRoutes() {
  return (
    <Layout>
      <PageTransition>
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/quiz"           element={<QuizPage />} />
          <Route path="/results"        element={<ResultsPage />} />
          <Route path="/university/:id" element={<UniversityPage />} />
          <Route path="/about"          element={<AboutPage />} />
          <Route path="/saved"          element={<SavedPage />} />
        </Routes>
      </PageTransition>
    </Layout>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <style>{TRANSITION_STYLE}</style>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </>
    </QueryClientProvider>
  )
}
