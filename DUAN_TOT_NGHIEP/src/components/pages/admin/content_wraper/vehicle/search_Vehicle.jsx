import {  useEffect, useState } from "react"


function Search_Vehicle({onSearch}) {
    const [title, setTitle] = useState('');

    // Call parent search handler on title change
    useEffect(() => {
        onSearch(title);
    }, [title, onSearch]);
    return <>
        <nav className="navbar bg-body-tertiary">
            <div className="container-fluid box-search" style={{ justifyContent: "flex-end" }}>
                <form className="d-flex" role="search">
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control me-2 mt-1" type="search" placeholder="Search" aria-label="Search" />
                    {/* <button className="btn btn-primary" type="submit">Search</button> */}
                    <button className="btn btn-primary" type="submit">Search</button>
                </form>
            </div>
        </nav>
    </>
}

export default Search_Vehicle
