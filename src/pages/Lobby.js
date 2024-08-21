import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Lobby.css';
import backgroundImage from '../assets/BrassGame_Atmosphere.jpg';
import CreateMatchModal from '../components/CreateMatchModal';
import { useNavigate, useLocation } from 'react-router-dom';

const Lobby = () => {
    const [matches, setMatches] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const gameName = location.state?.gameName || 'All Games';
    const playerId = 1;

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/matches', {
                    params: { game: gameName }
                });
                console.log('Fetched matches for game:', gameName, response.data);
                setMatches(response.data);
            } catch (error) {
                console.error('There was an error fetching the matches!', error);
            }
        };

        const fetchCurrentPlayer = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/players/${playerId}`);
                setCurrentPlayer({
                    name: response.data.name,
                    profilePicture: response.data.profilePicture || '',
                });
            } catch (error) {
                console.error('There was an error fetching the current player data!', error);
            }
        };

        fetchMatches();
        fetchCurrentPlayer();
    }, [gameName]);

    const handleCreateNewMatch = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleMatchClick = (matchId) => {
        navigate(`/match/${matchId}`);
    };

    return (
        <div className="lobby-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="lobby-container">
                <h2>{gameName} Lobby</h2>
                {matches.length > 0 ? (
                    <table className="matches-table">
                        <thead>
                        <tr>
                            <th>Match ID</th>
                            <th>Game</th>
                            <th>Created By</th>
                            <th>Players</th>
                            <th>Turn Duration</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {matches.map((match, index) => (
                            <tr key={index} onClick={() => handleMatchClick(match.id)}>
                                <td>{match.id}</td>
                                <td>{match.gameName || 'Unknown Game'}</td>
                                <td>{match.createdBy}</td>
                                <td>{match.currentPlayers}/{match.maxPlayers || 'N/A'}</td>
                                <td>{match.turnDuration} minutes</td>
                                <td>{match.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No matches available for {gameName}. Create a new one to get started!</p>
                )}
                <button className="create-new-button" onClick={handleCreateNewMatch} disabled={!currentPlayer}>
                    Create New Match
                </button>
            </div>

            {isModalOpen && currentPlayer && (
                <CreateMatchModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    maxPlayers={4}
                    currentPlayer={currentPlayer}
                />
            )}
        </div>
    );
};

export default Lobby;
