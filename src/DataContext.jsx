import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

const dataContext = createContext();

export const useDataContext = () => {
  return useContext(dataContext);
};


export const DataProvider = ({ children }) => {
  const thisYear = parseInt(Date().slice(11, 15))
  const [yearRange,setYearRange] = useState(false)
  const { data: queryData, isLoading, isError } = useQuery("myData", async () => {
    try {
      // Use fetch to make the GET request to your API endpoint
      const response = await fetch("https://dashboard-1m0nsr3p0.vercel.app/datas/");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json(); // Parse the response JSON
      return data;
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error to let React Query handle it
    }
  });

  const rangeYear = (optionValue)=>{
      setYearRange(!yearRange)
  }

  const value = {
    queryData,
    isLoading,
    isError,
    rangeYear,
  };

  return (
    <dataContext.Provider value={value}>
      {children}
    </dataContext.Provider>
  );
};
