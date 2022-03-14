/**
 * This function is responsible for rendering the content of the Agent Issuer,
 * Agent Holder, and Agent Verifier pages based on value of persona
 * @returns The ContentWrap component.
 */
import ContentWrap01 from '../../../AgentIssuer/ContentWrap'
import ContentWrap02 from '../../../AgentHolder/ContentWrap'
import ContentWrap03 from '../../../AgentVerifier/ContentWrap'

export default function ContentSelector({ children, status, origin, persona }) {
  const personaSwitcher = (personaLabelFromBackend) => {
    switch (personaLabelFromBackend.replace('.agent', '')) {
      case 'issuer':
        return 1
      case 'licensee':
        return 2
      case 'verifier':
        return 3
      default:
        return 1
    }
  }
  return (
    <>
      {children && children}
      {!children && status !== 'fetched' && (
        <div className="py-4 my-4">&nbsp;</div>
      )}
      {!children && status === 'fetched' && persona && (
        <>
          {personaSwitcher(persona) === 1 && (
            <ContentWrap01 origin={origin} persona={persona} />
          )}
          {personaSwitcher(persona) === 2 && (
            <ContentWrap02 origin={origin} persona={persona} />
          )}
          {personaSwitcher(persona) === 3 && (
            <ContentWrap03 origin={origin} persona={persona} />
          )}
        </>
      )}
    </>
  )
}
