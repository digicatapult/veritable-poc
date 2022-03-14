/**
 * This function is used to render the breadcrumb for the Agent Issuer, Agent
 * Holder, and Agent Verifier pages
 * @returns A breadcrumb.
 */
import Breadcrumb01 from '../../../AgentIssuer/Breadcrumb'
import Breadcrumb02 from '../../../AgentHolder/Breadcrumb'
import Breadcrumb03 from '../../../AgentVerifier/Breadcrumb'

export default function BreadcrumbWrap({ children, status, persona }) {
  const personaSwitcher = (personaLabelFromBackend) => {
    switch (personaLabelFromBackend.toLowerCase().replace('.agent', '')) {
      case 'consortiq':
        return 1
      case 'alice':
        return 2
      case 'airops':
        return 3
      default:
        return 1
    }
  }
  return (
    <div className="col-md-8">
      <ul className="breadcrumb bg-light m-1 p-2">
        {children && children}
        {!children && status !== 'fetched' && (
          <li className="breadcrumb-item"> &nbsp; </li>
        )}
        {!children && status === 'fetched' && persona && (
          <>
            {personaSwitcher(persona) === 1 && <Breadcrumb01 />}
            {personaSwitcher(persona) === 2 && <Breadcrumb02 />}
            {personaSwitcher(persona) === 3 && <Breadcrumb03 />}
          </>
        )}
      </ul>
    </div>
  )
}
