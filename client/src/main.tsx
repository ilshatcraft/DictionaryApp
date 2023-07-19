import React from 'react'
import ReactDOM from 'react-dom/client'

import ThemeProvider from './ThemeProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode >
   <ThemeProvider ></ThemeProvider>
  </React.StrictMode>,
)
