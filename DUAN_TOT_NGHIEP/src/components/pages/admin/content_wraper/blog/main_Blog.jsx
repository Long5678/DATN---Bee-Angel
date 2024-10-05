import ListBlog from './list_Blog'
import AddBlog from './add_Blog'
import EditBlog from './edit_Blog'

const MainBlog = () => {
  return <>
  <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Blog</h1>
          </div>
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Blog</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <EditBlog/>
    <AddBlog/>
    <ListBlog/>

  </>
}

export default MainBlog