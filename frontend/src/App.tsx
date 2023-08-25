import React, { useState, useEffect } from 'react'

import PieChart from "./components/PieChart"
import BarChart from "./components/BarChart"
import LaunchService from "./services/LaunchService";

import "./App.scss"

function App() {
  const [launches, setLaunches] = useState([] as any)
  const [launchStats, setLaunchStats] = useState([] as any)

  useEffect(() => {
    const showMessage = async () => {
      const message = await LaunchService.showMessage()
      window.localStorage.setItem('message', JSON.stringify(message))
    }

    const getLaunches = async () => {
      const launch = await LaunchService.getLaunches()
      const launches = launch.results
      console.log("launc", launches)
      setLaunches(launches)
    }

    const getStats = async () => {
      const stats = await LaunchService.getStats()
      setLaunchStats(stats)
    }

    showMessage()
    getLaunches()
    getStats()
  }, [])

  const dataPizza = [
    { name: `Sucesso ${launchStats && launchStats.launchResult && launchStats.launchResult.true}`, value: Number(launchStats && launchStats.launchResult && launchStats.launchResult.true) },
    { name: `Falha ${launchStats && launchStats.launchResult && launchStats.launchResult.false}`, value: Number(launchStats && launchStats.launchResult && launchStats.launchResult.false) },
    { name: `Nulo ${launchStats && launchStats.launchResult && launchStats.launchResult.null}`, value: Number(launchStats && launchStats.launchResult && launchStats.launchResult.null) },
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

        {/* {launches && launches.map((test: any) => console.log('asw', test.details))} */}

        <div className='launch-results'>
          <h3>Resultado de Lançamento</h3>
          <br />
          <span className='success'>Sucesso: {launchStats && launchStats.launchResult && launchStats.launchResult.true}</span>
          <br />
          <br />
          <span className='fail'>Falha: {launchStats && launchStats.launchResult && launchStats.launchResult.false}</span>

        </div>

        <div className="charts">
          <div className="piechart">
            <h2>Lançamentos de foguetes</h2>

            <PieChart data={dataPizza} />

          </div>
          <div className="barchart">
            <h2>Lançamentos por ano</h2>
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
            {/* <thead>
              <tr>
                <th>No Vôo</th>
                <th>Logo</th>
                <th>Missão</th>
                <th>Data de lançamento</th>
                <th>Foguete</th>
                <th>Resultado</th>
                <th>Vídeo</th>
              </tr>
            </thead> */}
            <tbody>
              {launches && launches.map((launch: any, idx: any) => (
                <tr key={idx}>
                  <td data-label="No Vôo">{launch && launch.flight_number}</td>
                  <td data-label="Logo">
                    <img src={launch && launch.links.patch.small}
                      alt="Logo"
                    />
                  </td>
                  <td data-label="Missão">{launch && launch.details}</td>
                  <td data-label="Data de lançamento">{launch && launch.date_utc}</td>
                  <td data-label="Foguete">{launch && launch.name}</td>
                  {/* <td data-label="Resultado">{launch && launch.success}</td>
                  <td data-label="Vídeo">{launch && launch.webcast}</td> */}
                </tr>
              ))}

            </tbody>
          </table>
        </div>

      </main>

    </div>
  )
}

export default App
