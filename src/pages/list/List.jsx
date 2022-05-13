import "./list.scss";
//components
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DataTable from "../../components/data-table/DataTable";
// import SearchStudent from '../../components/searchbar/userpage-search/SearchStudent'

const List = () => {
  return (
    <div className="list-main">
      <Sidebar />
      <div className="list-wrapper">
        <Navbar />
        <div className="list-header">
          <h2 className="list-title">List of Students</h2>
        </div>
        <DataTable />
      </div>
    </div>
  );
};

export default List;
