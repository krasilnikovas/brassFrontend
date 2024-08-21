import React, { useState } from 'react';
import axios from 'axios';
import './CreateMatchModal.css';

const CreateMatchModal = ({ isOpen, onClose, maxPlayers, currentPlayer }) => {
    const [turnDuration, setTurnDuration] = useState(10); // Default to 10 minutes

    if (!isOpen) return null;

    const renderPlayerSlots = () => {
        const slots = [];
        for (let i = 0; i < maxPlayers; i++) {
            if (i === 0) {
                // Display current player in the first slot
                slots.push(
                    <div key={i} className="player-slot filled">
                        <img src={currentPlayer.profilePicture} alt={currentPlayer.name} />
                        <p>{currentPlayer.name}</p>
                    </div>
                );
            } else {
                slots.push(
                    <div key={i} className="player-slot empty">
                        <div className="placeholder">
                            <p>Empty Slot</p>
                        </div>
                    </div>
                );
            }
        }
        return slots;
    };

    const handleTurnDurationChange = (event) => {
        setTurnDuration(Number(event.target.value));
    };

    const handleCreateMatch = () => {
        const newMatch = {
            createdBy: currentPlayer.name,
            currentPlayers: 1, // Assuming the creator is the first player
            maxPlayers: maxPlayers,
            turnDuration: turnDuration,
            status: "waiting",
            gameName: "Brass" // Assuming the game is Brass; adjust if dynamic
        };

        axios.post('http://localhost:8080/api/matches/create', newMatch)
            .then(response => {
                console.log('Match created:', response.data);
                onClose(); // Close the modal after creation
            })
            .catch(error => {
                console.error('There was an error creating the match!', error);
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Create New Match</h2>
                <div className="player-slots">
                    {renderPlayerSlots()}
                </div>
                <div className="turn-duration">
                    <h3>Select Turn Duration:</h3>
                    <select value={turnDuration} onChange={handleTurnDurationChange}>
                        <option value={5}>5 minutes</option>
                        <option value={10}>10 minutes</option>
                        <option value={20}>20 minutes</option>
                        <option value={30}>30 minutes</option>
                    </select>
                </div>
                <button className="create-button btn-primary" onClick={handleCreateMatch}>Create Match</button>
                <button className="close-button btn-primary" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CreateMatchModal;
