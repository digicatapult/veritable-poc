/**
 * This function is used to manage the list of credential definitions created by
 * the issuer agent
 */
import { useEffect, useState } from 'react'

/* SMLyJXu6w2TBmJuVA6jKPL:3:CL:91:consortiq.agent.drone_schema */
import useGetCredDefinitionsCreated from '../../../../interface/hooks/use-get-cred-definitions-created'
import usePostCredentialDefinitions from '../../../../interface/hooks/use-post-credential-definitions'

export default function DefinitionsManager({
  origin,
  persona,
  selectedSchemaId,
  selectedCredDefId,
  onSelectedDefinition,
}) {
  const [dataDefinitionsCreated, setDataDefinitionsCreated] = useState([])
  const [
    statusDefinitionsCreated,
    errorDefinitionsCreated,
    startFetchHandlerDefinitionsCreated,
  ] = useGetCredDefinitionsCreated()
  const [statusCreate, errorCreate, startFetchHandler] =
    usePostCredentialDefinitions()

  useEffect(() => {
    const setDataFn = (retrievedData) =>
      setDataDefinitionsCreated(retrievedData)
    startFetchHandlerDefinitionsCreated(origin, selectedSchemaId, setDataFn)
  }, [
    origin,
    selectedSchemaId,
    selectedCredDefId,
    startFetchHandlerDefinitionsCreated,
  ])

  const createDefinitionHandler = (e) => {
    e.preventDefault()
    const setDataFn = (definitionId) => {
      setDataDefinitionsCreated((prev) =>
        prev.indexOf(definitionId) > -1 ? prev : [...prev, definitionId]
      )
    }
    startFetchHandler(origin, selectedSchemaId, persona, setDataFn)
  }

  const chooseDefinitionHandler = (e) => {
    e.preventDefault()
    const chosenDefinitionId = e.target.value
    onSelectedDefinition(chosenDefinitionId)
  }

  return (
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor="definitions">
          <div className="text-black">Select (Cred) Definition:</div>
          <div className="small">
            List has&nbsp;
            <b>
              {statusDefinitionsCreated !== 'fetching' &&
                dataDefinitionsCreated.length}
            </b>
            &nbsp;definition(s)
          </div>
        </label>
        <div className="row">
          <div className="col-md-8 pr-0">
            <select
              onChange={chooseDefinitionHandler}
              value={
                dataDefinitionsCreated.includes(selectedCredDefId)
                  ? selectedCredDefId
                  : ''
              }
              name="definition"
              className="form-control"
              id="definitions"
            >
              <option value="" disabled>
                - Select -
              </option>
              {dataDefinitionsCreated.map((d, i) => (
                <option value={d} key={i}>
                  Definition
                  {d.split(':')[1]}.{d.split(':')[3]}.
                  {d.split(':')[4].split('.')[0]}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 pl-0">
            <button
              onClick={createDefinitionHandler}
              type="submit"
              className="btn btn-primary w-100 pl-0 pr-0"
            >
              {statusCreate === 'fetching' && (
                <>
                  <i className="fa fa-spinner fa-pulse"></i>
                </>
              )}
              &nbsp;Create
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${errorDefinitionsCreated ? 'd-block' : 'd-none'}`}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          inset: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          <small>Failed to fetch: {errorDefinitionsCreated}</small>
        </div>
      </div>

      <div
        className={`${errorCreate ? 'd-block' : 'd-none'}`}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          inset: '0px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          <small>Failed to fetch: {errorCreate}</small>
        </div>
      </div>
    </div>
  )
}
