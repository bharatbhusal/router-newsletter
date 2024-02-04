import React from 'react'
import MonthlyView from './components/MonthlyView'
import january from "./news/2024/january.json"

const App = () => {
    return (
        <div>
            <MonthlyView year="2024" month="January" newsData={january} />
        </div>
    )
}

export default App