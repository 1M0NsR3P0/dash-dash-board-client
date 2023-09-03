import React, { useEffect, useState } from 'react';
import { Sparklines, SparklinesBars, SparklinesLine } from 'react-sparklines';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useDataContext } from './DataContext';

const Chart = ({ newData }) => {
  const { rangeYear } = useDataContext()
  const [range,setRange] = useState();
  useEffect(()=>{
  },[rangeYear])
  const handleYearRang = (event)=>{
    const optionValue = event.target.value;
    if(optionValue==="10"){
      setRange()
    }
  }
  return (
    <div style={{ width: "100%", border:"2px solid gray", backgroundColor:"white" }}>
      <div className='' style={{ display: "flex", justifyContent: "space-around" }}>
      <h1 style={{ width: "100%", }}>The History of last 10 years intensity</h1>
        <span onChange={handleYearRang}>
          <select name="rangeYear" id="rangeYear">
            <option value="10">past 10 years</option>
            <option value="5">past 5 years</option>
            <option value="3">past 3 years</option>
          </select>
          : select Range
        </span>
      </div>
      <div style={{}}>
        <LineChart
          width={1000}
          height={350}
          data={newData.slice(0, 50)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="intensity" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="relevance" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
  );
};

export default Chart;