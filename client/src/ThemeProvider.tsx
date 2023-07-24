import React, { Component, useEffect, useState } from 'react'
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import App from './App';

import themeStore from './themestore';



import { ActionIcon, useMantineColorScheme } from '@mantine/core';





type Props = {}

const ThemeProvider = (props: Props) => {

  const colorScheme=themeStore((state)=>(state.theme))
  const setColorScheme=themeStore((state)=>state.setTheme)




  const [style,setStyle]=useState(colorScheme+' Body')


useEffect(()=>{
  setStyle(colorScheme+' Body')
})

 


const Icon =(colorScheme:string)=>{
  
  const icon=(colorScheme==='light'?    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8ZM11 1h2v3h-2V1Zm0 19h2v3h-2v-3ZM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05L3.515 4.93ZM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414l-2.121-2.121Zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414l2.121-2.121ZM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414l2.121-2.121ZM23 11v2h-3v-2h3ZM4 11v2H1v-2h3Z"/></svg>:
  
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2h.1A6.98 6.98 0 0 0 10 7Zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938A7.999 7.999 0 0 0 4 12Z"/></svg>
  )
  return icon
}



const ic=Icon(colorScheme)



  return (<>
  <div className={ style }> 
  <div>
  <ActionIcon variant="transparent" size="xl" radius="xs" className='coloricon' onClick={()=>setColorScheme(colorScheme=='light'?'dark':'light')}>

  {ic}

    </ActionIcon>
     <App   />
     </div>
     </div>
  </>

  
  )
}

export default ThemeProvider 