import { useEffect, useState } from 'react'
import './App.css'
import { useDataContext } from './DataContext'
import Loading from './Loading'
import Chart from './Chart';



const thisYear = parseInt(Date().slice(11, 15))
const datas = []
const newData = []
const yearlyIntensity = []
function App() {
  const [selectYear, setSelectedYear] = useState('nothing')
  const { queryData, rangeYear } = useDataContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (queryData === undefined) {
      setLoading(true)
    }
    else {
      setLoading(false)
      queryData.map(every => datas.push({
        name: `${new Date(every.published).getFullYear()}`,
        intensity: every.intensity,
        relevance: every.relevance,
        amt: 2,
      },
      ))
    }
    datas.filter(every => {
      if (every.name !== "NaN") {
        newData.push(every)
        if (parseInt(every.name) >= 2012 && parseInt(every.name) <= Date().slice(11, 15)) {
          // console.log("hi")
        }
      }
    }
    )
  }, [queryData])

  // console.log(newData)
  return (
    loading ? <Loading /> :
      <div style={{ width: "100%",height:"100vh", gap: "50px", display: "flex",backgroundColor:"gray" }}>
        <div style={{}}>
          <Chart newData={newData} />
        </div>
      </div>
  )
}

export default App

