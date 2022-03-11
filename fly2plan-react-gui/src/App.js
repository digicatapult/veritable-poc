/**
 * It renders the AppCore component with the correct theme.
 * @returns The App component is being returned.
 */
import AppThemeSelector from './components/Themes/AppThemeSelector'
import AppCore from './components/Core/AppCore'

function App() {
  const hash = document.location.hash.replace('#', '')
  const agentIndex = hash === '' ? '1' : hash

  return (
    <AppThemeSelector agent={agentIndex}>
      <AppCore agent={agentIndex} />
    </AppThemeSelector>
  )
}

export default App
