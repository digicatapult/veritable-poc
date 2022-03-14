/**
 * This function is a React component that renders the appropriate theme based on
 * the agent
 * @returns A Suspense component with a fallback component with the Theme inside.
 */
import { lazy, Suspense } from 'react'

const AppTheme01 = lazy(() => import('./../AppTheme01'))
const AppTheme02 = lazy(() => import('./../AppTheme02'))
const AppTheme03 = lazy(() => import('./../AppTheme03'))

export default function AppThemeSelector({ children, agent }) {
  return (
    <>
      <Suspense fallback={<></>}>
        {agent === '1' && <AppTheme01 />}
        {agent === '2' && <AppTheme02 />}
        {agent === '3' && <AppTheme03 />}
      </Suspense>
      {children}
    </>
  )
}
