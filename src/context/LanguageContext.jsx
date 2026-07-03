import { createContext, useContext, useCallback } from 'react'
import en from '../i18n/en.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const t = useCallback((key) => {
    const keys = key.split('.')
    let value = en
    for (const k of keys) {
      value = value?.[k]
    }
    return value ?? key
  }, [])

  return (
    <LanguageContext.Provider value={{ t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
