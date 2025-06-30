import { useState } from 'react'
import './App.css'
import Mycalendar from '/src/components/Calendar/Mycalendar';
import { CalendarProvider } from './context/CalendarContext';

function App() {

  return (
    <CalendarProvider>
      <Mycalendar />
    </CalendarProvider>
  )
}

export default App
