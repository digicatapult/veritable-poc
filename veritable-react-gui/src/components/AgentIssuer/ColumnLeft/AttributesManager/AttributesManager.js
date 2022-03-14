/**
 * It creates the form for the attributes of the certificate which allows the
 * creation of attributes based on a previously selected schema.
 * @returns A React component.
 */
export default function AttributesManager({
  selectedId,
  selectedTitle,
  selectedName,
  selectedSubtitle,
  selectedSurname,
  selectedExpiration,
  selectedType,
  onInsertedId,
  onInsertedTitle,
  onInsertedName,
  onInsertedSubtitle,
  onInsertedSurname,
  onInsertedExpiration,
  onChosenType,
}) {
  const inputIdHandler = (e) => {
    onInsertedId(e.target.value)
  }
  const inputTitleHandler = (e) => {
    onInsertedTitle(e.target.value)
  }
  const inputNameHandler = (e) => {
    onInsertedName(e.target.value)
  }
  const inputSubtitleHandler = (e) => {
    onInsertedSubtitle(e.target.value)
  }
  const inputSurnameHandler = (e) => {
    onInsertedSurname(e.target.value)
  }
  const inputExpirationHandler = (e) => {
    onInsertedExpiration(e.target.value)
  }
  const changeTypeHandler = (e) => {
    onChosenType(e.target.value)
  }
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="id">Flyer Id:</label>
            <input
              type="text"
              value={selectedId}
              onChange={inputIdHandler}
              required
              className="form-control"
              id="id"
              placeholder="GBR-RP-123456"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="title">Certificate Title:</label>
            <input
              type="text"
              value={selectedTitle}
              onChange={inputTitleHandler}
              required
              className="form-control"
              id="title"
              placeholder="Unmanned Aircraft Systems"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={selectedName}
              onChange={inputNameHandler}
              required
              className="form-control"
              id="name"
              placeholder="Alice"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="subtitle">Certificate Subtitle:</label>
            <input
              type="text"
              value={selectedSubtitle}
              onChange={inputSubtitleHandler}
              required
              className="form-control"
              id="subtitle"
              placeholder="Drone Pilot Certificate of Competence"
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="surname">Surname:</label>
            <input
              type="text"
              value={selectedSurname}
              onChange={inputSurnameHandler}
              required
              className="form-control"
              id="surname"
              placeholder="Smith"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="expiration">Expiration Date (dd/mm/yyyy):</label>
            <input
              type="date"
              value={selectedExpiration}
              onChange={inputExpirationHandler}
              required
              className="form-control"
              id="expiration"
              placeholder=""
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select
              className="form-control"
              value={selectedType}
              onChange={changeTypeHandler}
              required
              id="type"
            >
              <option value="" disabled>
                - Select -
              </option>
              <option value="2">A2 Open Category</option>
            </select>
          </div>
        </div>
        <div className="col-md-6"> &nbsp; </div>
      </div>
    </>
  )
}
