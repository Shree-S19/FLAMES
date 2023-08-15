import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import FlamesHome from './FlamesComponents/FlamesHome';

function App() {
  return(
    <Router>
        <Routes>
            <Route path='/' element={<FlamesHome/>} />
        </Routes>
    </Router>
    )
}

export default App;
