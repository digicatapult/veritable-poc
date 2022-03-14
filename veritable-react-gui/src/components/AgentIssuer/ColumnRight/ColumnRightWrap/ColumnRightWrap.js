/**
 * This function is used to display issued credential records log
 */
import { useEffect, useState } from 'react'
import IssuedRecordItem from '../IssuedRecordItem'
import useGetIssueCredentialRecords from '../../../../interface/hooks/use-get-looped-issue-credential-records'

export default function ColumnRightWrap({ origin }) {
  const [dataRecords, setDataRecords] = useState([])
  const [statusRecords, errorRecords, startGetRecordsHandler] =
    useGetIssueCredentialRecords()
  useEffect(() => {
    const setStoreDataFn = (resData) => setDataRecords(resData)
    const intervalIdFetch = startGetRecordsHandler(origin, setStoreDataFn)
    if (statusRecords !== 'started') clearInterval(intervalIdFetch)
    return function clear() {
      return clearInterval(intervalIdFetch)
    }
  }, [origin, statusRecords, startGetRecordsHandler])
  return (
    <>
      <div className="col-md-6">
        <div className="container py-1">
          <div className="row">
            <div className="col-md-12">
              <h5>View history</h5>
              <p className="small">
                View fully issued / partially issued credential sets:
              </p>
              <div className="accordion" id="accordion">
                {dataRecords.length === 0 && <p className="small">N/A</p>}

                {dataRecords.length > 0 && (
                  <>
                    <div className="card m-0 p-0"></div>
                  </>
                )}

                {dataRecords.map((r, i) => (
                  <div key={i} className="card">
                    <IssuedRecordItem record={r} index={i} />
                  </div>
                ))}

                {dataRecords.length > 0 && (
                  <>
                    <div className="card m-0 p-0"></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={errorRecords ? 'd-block' : 'd-none'}
        style={{
          position: 'fixed',
          width: '10%',
          height: '10%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 100,
        }}
      >
        <div className="text-light m-2 p-2">
          {' '}
          <small>{errorRecords}</small>{' '}
        </div>
      </div>
    </>
  )
}
