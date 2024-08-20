import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; // Assuming this is the path for your Login component
import PlayerProfile from './pages/PlayerProfile'; // Path for your Player Profile page
import Lobby from './pages/Lobby'; // The Lobby component we just created
import CreateMatch from './pages/CreateMatch'; // The CreateMatch component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/profile" element={<PlayerProfile />} />
                <Route path="/lobby" element={<Lobby />} />
                <Route path="/create-match" element={<CreateMatch />} />
            </Routes>
        </Router>
    );
}

export default App;