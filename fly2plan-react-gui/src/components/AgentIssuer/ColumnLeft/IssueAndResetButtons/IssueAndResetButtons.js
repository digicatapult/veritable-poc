/**
 * This function is used to display the buttons for issuing and resetting the
 * credential
 */
import { useState } from 'react'
import useGetConn from '../../../../interface/hooks/use-get-conn'

export default function IssueAndResetButtons({
  origin,
  onActivatedReset,
  onActivatedSubmit,
  selectedSchemaId,
  selectedCredDefId,
  selectedId,
  selectedTitle,
  selectedName,
  selectedSubtitle,
  selectedSurname,
  selectedExpiration,
  selectedType,
  statusIssueCred,
}) {
  const [isDisconnected, setIsDisconnected] = useState(false)
  const [statusConnId, errorConnId, startFetchConnIdHandler] = useGetConn()
  const isDisabledForm = () => {
    let isDisabled = false
    isDisabled = isDisabled || selectedId === ''
    isDisabled = isDisabled || selectedTitle === ''
    isDisabled = isDisabled || selectedName === ''
    isDisabled = isDisabled || selectedSubtitle === ''
    isDisabled = isDisabled || selectedSurname === ''
    isDisabled = isDisabled || selectedExpiration === ''
    isDisabled = isDisabled || selectedType === ''
    return isDisabled
  }
  const submitHandler = () => {
    const setStoreDataIssueCb = (connectionId) => {
      if (!connectionId) {
        setIsDisconnected(true)
        return
      }
      onActivatedSubmit(connectionId)
    }
    onActivatedReset()
    setIsDisconnected(false)
    startFetchConnIdHandler(origin, setStoreDataIssueCb)
  }
  const resetHandler = () => {
    onActivatedReset()
  }
  return (
    <>
      <div className="col-md-5">
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={submitHandler}
          disabled={
            selectedSchemaId === '' ||
            selectedCredDefId === '' ||
            isDisabledForm()
          }
        >
          {(statusConnId === 'fetching' || statusIssueCred === 'fetching') && (
            <>
              <i className="fa fa-spinner fa-pulse"></i>
            </>
          )}
          &nbsp; Issue &nbsp;
          {isDisconnected && (
            <>
              <span className="small">
                ( &nbsp;
                <i className="fa fa-exclamation-triangle"></i>
                &nbsp; disconnected )
              </span>
            </>
          )}
        </button>
      </div>
      <div className="col-md-1">&nbsp;</div>
      <div className="col-md-1">&nbsp;</div>
      <div className="col-md-5">
        <button
          type="submit"
          className="btn btn-secondary bg-danger text-white w-100"
          onClick={resetHandler}
        >
          &nbsp;Reset&nbsp;
        </button>
      </div>

      <div
        className={`${errorConnId ? 'd-block' : 'd-none'}`}
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
          <small>Failed to fetch: {errorConnId}</small>
        </div>
      </div>
    </>
  )
}
