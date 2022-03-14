/**
 * This function is used to create the logo for the application
 * @returns A link with the logo component inside.
 */
import Logo01 from '../../../AgentIssuer/Logo'
import Logo02 from '../../../AgentHolder/Logo'
import Logo03 from '../../../AgentVerifier/Logo'

export default function LogoWrap({ children, agent, brand }) {
  const agentIndexNumber = agent || '1'
  const brandText01 = (
    <b className="small">
      Drone Training <span className="small">Ltd.</span>
    </b>
  )
  const brandText02 = <span>Drone Pilot</span>
  const brandText03 = <b className="font-weight-bold">Heathrow</b>
  const brandName =
    agent === '3' ? brandText03 : agent === '2' ? brandText02 : brandText01
  return (
    <a
      className="navbar-brand d-none d-md-block"
      href="#/"
      onClick={(e) => e.preventDefault()}
    >
      {agentIndexNumber === '1' && <Logo01 />}
      {agentIndexNumber === '2' && <Logo02 />}
      {agentIndexNumber === '3' && <Logo03 />}
      <span>&nbsp; {brand || brandName}</span>
      {children && children}
    </a>
  )
}
