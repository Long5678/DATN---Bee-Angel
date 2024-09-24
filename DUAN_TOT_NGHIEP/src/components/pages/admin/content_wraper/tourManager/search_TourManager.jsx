
function Search_TourManager() {
  return <>
      <nav className="navbar bg-body-tertiary">
          <div className="container-fluid box-search" style={{ justifyContent: "flex-end" }}>
              <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-danger" type="submit">Search</button>
              </form>
          </div>
      </nav>
  </>
}

export default Search_TourManager