import './list.scss'
//components
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/data-table/DataTable'

const List = () => {
  return (
    <div className="list-main">
      <Sidebar/>
      <div className="list-wrapper">
        <Navbar/>
        <DataTable/>
      </div>
    </div>
  )
}

export default List