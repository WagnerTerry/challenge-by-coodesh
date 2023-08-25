import PieChart from "./components/PieChart"
import BarChart from "./components/BarChart"


import "./App.scss"

const dataPizza = [
  { name: 'Sucesso', value: 150 },
  { name: 'Falha', value: 40 },
  { name: 'Nulo', value: 10 },
];

const barChartData = [
  { name: 'January', sales: 65 },
  { name: 'February', sales: 59 },
  { name: 'March', sales: 80 },
];

function App() {

  return (
    <div>
      <header>Space X</header>

      <main>
        <div className="charts">
          <div className="piechart">
            <h2>Bar Chart</h2>

            <PieChart data={dataPizza} />

          </div>
          <div className="barchart">
            <h2>Bar Chart</h2>
            <BarChart data={barChartData} />

          </div>
        </div>

      </main>

    </div>
  )
}

export default App
