import './home.scss'
//components
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widgets from '../../components/widgets/Widgets'
import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'
import ListTable from '../../components/table/ListTable'

const Home = () => {
  return (
    <main className='home-main'>
      <Sidebar />
      <div className="homeContainer">
        <Navbar/>
        <div className="widgets-container">
          <Widgets type="user"/>
          <Widgets type="completed"/>
          <Widgets type="pending"/>
          <Widgets type="total"/>
        </div>
        <div className="charts-container">
          <Featured/>
          <Chart/>
        </div>
        <div className="list-container">
          <div className="list-title">Latest Transaction</div>
          <ListTable />
        </div>
      </div>
    </main>
  )
}

export default Home