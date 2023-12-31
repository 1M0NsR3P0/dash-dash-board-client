import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DataProvider } from './DataContext.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import FirstLoading from './FirstLoading.jsx'
const queryClient = new QueryClient();

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <App />
      </DataProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
