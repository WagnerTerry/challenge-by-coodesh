import PieChart from "./components/PieChart"
import BarChart from "./components/BarChart"


import "./App.scss"

const dataPizza = [
  { name: 'Sucesso 8', value: 150 },
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
    <div id="launch">
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

        <div className="fetch-rocket">
          <h2>Registros de lançamentos</h2>
          <div className="search">
            <input type="search" placeholder="Search here" />
            <button type="submit">Buscar</button>
          </div>
        </div>

        <div className="flights">
          <table>
            <thead>
              <tr>
                <th>No Vôo</th>
                <th>Logo</th>
                <th>Missão</th>
                <th>Data de lançamento</th>
                <th>Foguete</th>
                <th>Resultado</th>
                <th>Vídeo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="No Vôo">a</td>
                <td data-label="Logo">a</td>
                <td data-label="Missão">a</td>
                <td data-label="Data de lançamento">a</td>
                <td data-label="Foguete">a</td>
                <td data-label="Resultado">a</td>
                <td data-label="Vídeo">a</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>

    </div>
  )
}

export default App
