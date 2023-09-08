import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { useDataContext } from './DataContext';
import Loading from './Loading';

const Chart = ({ newData, sector }) => {
  const newSectorData = []
  const { sectorData, gettingSectorName } = useDataContext();
  const [range, setRange] = useState(7);
  const [sectors, setSector] = useState("Energy")
  const currentYear = new Date().getFullYear();
  const [totalIntensity, setIntensityData] = useState({});
  const [TOtalRelevance, setTotalRelevanceData] = useState({});
  
  useEffect(() => {
    const newIntensityData = {};
    for (let i = 1; i <= range; i++) {
      const year = currentYear - i;
      newIntensityData[`intensity${year}`] = 0;
    }
    setIntensityData(newIntensityData);
    // Filter and accumulate data for each year
    const sectorFiltering = newData.filter(every => every.sector === sectors)
    const filteredData = sectorFiltering.filter(every => parseInt(every.name) >= currentYear - range);
    console.log("new filter dtaa",filteredData)
    filteredData.forEach((every) => {
      const yearName = parseInt(every.name);
      for (let i = 1; i <= range; i++) {
        const year = currentYear - i;
        if (yearName == year) {
          const intensityKey = `intensity${year}`;
          setIntensityData((prevData) => ({
            ...prevData,
            [intensityKey]: prevData[intensityKey] + parseInt(every.intensity) || 0,
          }));
          setTotalRelevanceData((prevData) => ({
            ...prevData,
            [intensityKey]: prevData[intensityKey] + parseInt(every.relevance) || 0,
          }));
        }
      }
    });
  }, [range, newData, currentYear,sectors,]);
  const handleYearRang = (event) => {
    const optionValue = event.target.value;
    setRange(parseInt(optionValue));
  }
  const handleSector = (event) => {
    const optionValue = event.target.value;
    setSector(optionValue);
    gettingSectorName(optionValue)
  }
  const intensityDataArray = Object.keys(totalIntensity).map((key) => ({
    year: key.replace('intensity', ''), // Extract the year from the key
    intensity: totalIntensity[key],
    relevance: TOtalRelevance[key],
  }));
  // console.log(intensityDataArray)

  return (
    <div style={{ width: "100%", border: "2px solid gray", backgroundColor: "white" }}>
      <div className='flex items-center' style={{ justifyContent: "space-between" }}>
        <h1 style={{ fontSize: "16px" }}>histroy of last {range} years on {sectors} sector</h1>
        <div className='flex'>
          <span onChange={handleYearRang} className='flex' style={{ display: "flex" }}>
            <select name="rangeYear" id="rangeYear" style={{ width: "100%", }}>
              <option value={7}>past 7 years</option>
              <option value={5}>past 5 years</option>
              <option value={8}>past 8 years</option>
              <option value={10}>past 10 years</option>
            </select><div style={{ width: "100%" }}> : Select Range</div>
          </span>
        </div>
        <div className='flex'>
          <span onChange={handleSector} className='flex' style={{ display: "flex" }}>
            <select name="sector" id="sector" style={{ width: "100%", }}>
              {
                sector?.map((every, id) => (
                  <option key={id} value={every}>
                    {every}
                  </option>
                ))
              }

            </select><div style={{ width: "100%" }}> : On Sector</div>
          </span>
        </div>
      </div>
      <div style={{}}>
        <LineChart
          width={1000}
          height={350}
          data={intensityDataArray}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
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
