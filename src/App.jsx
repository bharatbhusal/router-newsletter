import React from 'react'
import "./App.css"
import MonthlyView from './components/MonthlyView'
import january from "./news/2024/january.json"

const App = () => {
    return (
        <div className='container'>
            <MonthlyView year="2024" month="January" newsData={january} />
        </div>
    )
}

export default App