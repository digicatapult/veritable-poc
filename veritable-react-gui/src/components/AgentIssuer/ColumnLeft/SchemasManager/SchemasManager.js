/**
 * This function is responsible for managing the schemas created by the issuer agent
 */
import { useEffect, useState } from 'react'

import useGetSchemasCreated from '../../../../interface/hooks/use-get-schemas-created'
import usePostSchemas from '../../../../interface/hooks/use-post-schemas'

export default function SchemasManager({
  origin,
  onSelectedSchema,
  selectedSchemaId,
}) {
  const maxNumOfSchemas = 2
  const [dataSchemasCreated, setDataSchemasCreated] = useState([])
  const [
    statusSchemasCreated,
    errorSchemasCreated,
    startFetchSchemasCreatedHandler,
  ] = useGetSchemasCreated()
  const [statusCreate, errorCreate, startFetchHandler] = usePostSchemas()

  useEffect(() => {
    const setDataFn = setDataSchemasCreated
    startFetchSchemasCreatedHandler(origin, setDataFn)
  }, [origin, selectedSchemaId, startFetchSchemasCreatedHandler])

  const createSchemaHandler = (e) => {
    e.preventDefault()
    const schemaName = ['drone', 'schema'].join(' ')
    const setDataFn = (schemaId) => {
      setDataSchemasCreated((prev) =>
        prev.indexOf(schemaId) > -1 ? prev : [...prev, schemaId]
      )
    }
    if (statusCreate !== 'error')
      startFetchHandler(origin, schemaName, setDataFn)
  }

  const chooseSchemaHandler = (e) => {
    e.preventDefault()
    const chosenSchemaId = e.target.value
    onSelectedSchema(chosenSchemaId)
  }

  return (
    <div className="col-md-6">
      <div className="form-group">
        <label htmlFor="schemas">
          <div className="text-black">Select Schema:</div>
          <div className="small">
            A number of&nbsp;
            <b>
              {statusSchemasCreated !== 'fetching' && dataSchemasCreated.length}
            </b>
            &nbsp;schema(s) are available
          </div>
        </label>
        <div className="row">
          <div className="col-md-8 pr-0">
            <select
              onChange={chooseSchemaHandler}
              value={
                dataSchemasCreated.includes(selectedSchemaId)
                  ? selectedSchemaId
                  : ''
              }
              name="schema"
              className="form-control"
              id="schemas"
            >
              <option value="" disabled>
                - Select -
              </option>
              {dataSchemasCreated.map((s, i) => (
                <option value={s} key={i}>
                  FlySchemaV{s.split(':')[3]}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4 pl-0">
            <button
              onClick={createSchemaHandler}
              type="submit"
              className="btn btn-primary w-100 pl-0 pr-0"
              disabled={dataSchemasCreated.length > maxNumOfSchemas}
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
        className={`${errorSchemasCreated ? 'd-block' : 'd-none'}`}
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
          <small>Failed to fetch: {errorSchemasCreated}</small>
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
