import React, { useState, useEffect } from 'react'

import PieChart from "./components/PieChart"
import BarChart from "./components/BarChart"
import LaunchService from "./services/LaunchService";

import "./App.scss"

function App() {
  const [launch, setLaunch] = useState([] as any)

  useEffect(() => {
    const showMessage = async () => {
      const message = await LaunchService.showMessage()
      window.localStorage.setItem('message', JSON.stringify(message))
    }

    const getStats = async () => {
      const stats = await LaunchService.getStats()
      console.log("ss", stats)
      setLaunch(stats)

    }

    showMessage()
    getStats()
  }, [])

  const dataPizza = [
    { name: `Sucesso ${launch && launch.launchResult && launch.launchResult.true}`, value: Number(launch && launch.launchResult && launch.launchResult.true) },
    { name: `Falha ${launch && launch.launchResult && launch.launchResult.false}`, value: Number(launch && launch.launchResult && launch.launchResult.false) },
    { name: `Nulo ${launch && launch.launchResult && launch.launchResult.null}`, value: Number(launch && launch.launchResult && launch.launchResult.null) },
  ];

  const barChartData = [
    { name: 'January', sales: 65 },
    { name: 'February', sales: 59 },
    { name: 'March', sales: 80 },
  ];

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
