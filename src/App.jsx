import { useEffect, useState } from 'react'
import './App.css'
import { useDataContext } from './DataContext'
import Loading from './Loading'
import Chart from './Chart';
import FirstLoading from './FirstLoading';

const uniqueArray = [];
const datas = []
const newData = []
function App() {
  const { queryData, sectorData } = useDataContext()
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
        impact: every.impact,
        amt: 2,
        sector:every.sector,
      },
      
      ))
      if(!datas && !newData){
        setLoading(true)
      }
      else{
        datas.filter(every => {
          setLoading(true)
          if (every.name !== "NaN") {
            newData.push(every)
          }
          setLoading(false)
        }
        )
      }
    }
    // console.log(typeof(newData[100].impact))
if(queryData){
  // console.log(queryData)
  queryData.map((item) => {
    if(!uniqueArray.includes(item.sector)){
      if(item.sector!==""){
        uniqueArray.push(item.sector)
      }
    }
  });
}
// console.log(newData)
  }, [queryData])

  return (
    loading ? <Loading /> :
      <div style={{ width: "100%",height:"100%",minHeight:"100vh", gap: "50px", display: "flex",backgroundColor:"#e4e4e4" }}>
        <div style={{}}>
          {!sectorData?<Loading/>:<Chart newData={newData} sector={uniqueArray} />}
        </div>
      </div>
  )
}

export default App

