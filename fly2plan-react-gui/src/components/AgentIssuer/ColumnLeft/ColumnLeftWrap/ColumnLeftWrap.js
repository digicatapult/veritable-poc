/**
 * This function is responsible for rendering the left content column of the screen.
 * It is also responsible for handling the credential creation process
 * @returns The `ColumnLeftWrap` component returns a `div` element with a `div`
 * element inside of it.
 */
import { useState } from 'react'
import SchemasManager from '../SchemasManager'
import DefinitionsManager from '../DefinitionsManager'
import AttributesManager from '../AttributesManager'
import IssueAndResetButtons from '../IssueAndResetButtons/IssueAndResetButtons'
import usePostIssueCredentialSendOffer from '../../../../interface/hooks/use-post-issue-credential-send-offer'

export default function ColumnLeftWrap({ origin, persona }) {
  const [selectedSchemaId, setSelectedSchemaId] = useState('')
  const [selectedCredDefId, setSelectedCredDefId] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [selectedTitle, setSelectedTitle] = useState('')
  const [selectedName, setSelectedName] = useState('')
  const [selectedSubtitle, setSelectedSubtitle] = useState('')
  const [selectedSurname, setSelectedSurname] = useState('')
  const [selectedExpiration, setSelectedExpiration] = useState(
    new Date().toISOString().split('T')[0]
  )
  const [selectedType, setSelectedType] = useState('')
  const [statusIssueCred, setStatusIssueCred] = useState('idle')
  const [dataIssueCred, setDataIssueCred] = useState('')
  const [errorIssueCred, startFetchHandler] = usePostIssueCredentialSendOffer()

  const selectedSchemaHandler = (chosenSchemaId) => {
    setSelectedCredDefId('')
    setSelectedSchemaId(chosenSchemaId)
  }
  const selectedDefinitionHandler = (chosenDefinitionId) => {
    setSelectedCredDefId(chosenDefinitionId)
  }
  const activatedResetHandler = () => {
    setSelectedSchemaId('')
    setSelectedCredDefId('')
    setSelectedId('')
    setSelectedTitle('')
    setSelectedName('')
    setSelectedSubtitle('')
    setSelectedSurname('')
    setSelectedExpiration('')
    setSelectedType('')
  }
  const activatedSubmitHandler = (connectionId) => {
    const setStoreDataFn = setDataIssueCred
    const setStoreStatusFn = setStatusIssueCred
    startFetchHandler(
      origin,
      connectionId,
      selectedCredDefId,
      selectedId,
      selectedName,
      selectedSurname,
      selectedType,
      selectedTitle,
      selectedSubtitle,
      selectedExpiration,
      setStoreStatusFn,
      setStoreDataFn
    )
  }
  const insertedIdHandler = (inserted) => {
    setSelectedId(inserted)
  }
  const insertedTitleHandler = (inserted) => {
    setSelectedTitle(inserted)
  }
  const insertedNameHandler = (inserted) => {
    setSelectedName(inserted)
  }
  const insertedSubtitleHandler = (inserted) => {
    setSelectedSubtitle(inserted)
  }
  const insertedSurnameHandler = (inserted) => {
    setSelectedSurname(inserted)
  }
  const insertedExpirationHandler = (inserted) => {
    setSelectedExpiration(inserted)
  }
  const chosenTypeHandler = (chosen) => {
    setSelectedType(chosen)
  }
  const toggleSuccessShowHandler = () => {
    setStatusIssueCred('idle')
  }

  return (
    <>
      <div className="col-md-6">
        <div className="container py-1">
          <div className="row">
            <div className="col-md-12">
              <h5>Issue a set of credentials for the holder</h5>
              <p className="small">
                Fill in to issue a new set of credentials (add a new Schema
                and/or Definition if needed):
              </p>

              <form>
                <div className="row">
                  <>
                    <>
                      <SchemasManager
                        origin={origin}
                        onSelectedSchema={selectedSchemaHandler}
                        selectedSchemaId={selectedSchemaId}
                      />
                    </>
                  </>

                  <>
                    {selectedSchemaId !== '' && (
                      <>
                        <DefinitionsManager
                          origin={origin}
                          persona={persona}
                          onSelectedDefinition={selectedDefinitionHandler}
                          selectedSchemaId={selectedSchemaId}
                          selectedCredDefId={selectedCredDefId}
                        />
                      </>
                    )}
                  </>
                </div>

                <hr />

                <div className="text-black">
                  <>
                    {selectedSchemaId !== '' && selectedCredDefId !== '' && (
                      <>
                        <AttributesManager
                          selectedId={selectedId}
                          selectedTitle={selectedTitle}
                          selectedName={selectedName}
                          selectedSubtitle={selectedSubtitle}
                          selectedSurname={selectedSurname}
                          selectedExpiration={selectedExpiration}
                          selectedType={selectedType}
                          onInsertedId={insertedIdHandler}
                          onInsertedTitle={insertedTitleHandler}
                          onInsertedName={insertedNameHandler}
                          onInsertedSubtitle={insertedSubtitleHandler}
                          onInsertedSurname={insertedSurnameHandler}
                          onInsertedExpiration={insertedExpirationHandler}
                          onChosenType={chosenTypeHandler}
                        />
                      </>
                    )}
                  </>
                </div>

                <div className="row">
                  <>
                    <IssueAndResetButtons
                      origin={origin}
                      onActivatedReset={activatedResetHandler}
                      onActivatedSubmit={activatedSubmitHandler}
                      selectedSchemaId={selectedSchemaId}
                      selectedCredDefId={selectedCredDefId}
                      selectedId={selectedId}
                      selectedTitle={selectedTitle}
                      selectedName={selectedName}
                      selectedSubtitle={selectedSubtitle}
                      selectedSurname={selectedSurname}
                      selectedExpiration={selectedExpiration}
                      selectedType={selectedType}
                      statusIssueCred={statusIssueCred}
                    />
                  </>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        id="success"
        className={`modal ${statusIssueCred === 'fetched' ? '' : 'd-none'}`}
        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="alert-success rounded">
              <div className="modal-header">
                <h5 className="modal-title">&nbsp;</h5>
                <button
                  type="button"
                  onClick={toggleSuccessShowHandler}
                  className="close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="my-3">
                  <i className="fa fa-check ml-0 mr-2"></i>
                  Success! Credential Exchange ID: &nbsp;
                  <small>{dataIssueCred}</small>
                </div>
              </div>
              <div className="modal-footer" data-dismiss="modal">
                <button
                  type="button"
                  onClick={toggleSuccessShowHandler}
                  className="btn btn-primary"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${errorIssueCred ? 'd-block' : 'd-none'}`}
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
          <small>Failed to fetch: {errorIssueCred}</small>
        </div>
      </div>
    </>
  )
}
