import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PlayerProfile.css';
import maleImage1 from '../assets/steampunk_character_1.jpg';
import maleImage2 from '../assets/steampunk_character_2.jpg';
import femaleImage1 from '../assets/steampunk_character_3.jpg';
import femaleImage2 from '../assets/steampunk_character_4.jpg';
import backgroundImage from '../assets/BrassGame_Atmosphere.jpg';

const PlayerProfile = () => {
    const [username, setUsername] = useState('');
    const [selectedImage, setSelectedImage] = useState(maleImage1);
    const [showDropdown, setShowDropdown] = useState(false);
    const playerId = 1;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/players/${playerId}`)
            .then(response => {
                setUsername(response.data.name);
                setSelectedImage(response.data.profilePicture || maleImage1);
            })
            .catch(error => {
                console.error("There was an error fetching the player data!", error);
            });
    }, []);

    const handleImageChange = (image) => {
        setSelectedImage(image);
        setShowDropdown(false);

        axios.put(`http://localhost:8080/api/players/${playerId}`, { profilePicture: image })
            .then(response => {
                console.log("Profile picture updated successfully");
            })
            .catch(error => {
                console.error("There was an error updating the profile picture!", error);
            });
    };

    const getImageBorderClass = () => {
        switch (selectedImage) {
            case maleImage1:
                return 'purple-border';
            case maleImage2:
                return 'red-border';
            case femaleImage1:
                return 'silver-border';
            case femaleImage2:
                return 'golden-border';
            default:
                return '';
        }
    };

    const handleGameClick = (gameName) => {
        navigate('/lobby', { state: { gameName } });
    };

    const images = [
        { label: "Male Young", value: maleImage1 },
        { label: "Male Old", value: maleImage2 },
        { label: "Female Young", value: femaleImage1 },
        { label: "Female Old", value: femaleImage2 },
    ];

    return (
        <div className="player-profile-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="profile-details">
                <div className="player-name-display">
                    <label className="profile-label">Player:</label>
                    <span className="player-name-text">{username}</span>
                </div>
                <div className={`profile-image ${getImageBorderClass()}`}>
                    <img src={selectedImage} alt="Player" />
                </div>
                <button className="btn btn-primary" onClick={() => setShowDropdown(!showDropdown)}>
                    Change Profile Picture
                </button>
                {showDropdown && (
                    <div className="image-dropdown">
                        {images.map((image) => (
                            <div
                                key={image.label}
                                className="image-option"
                                onClick={() => handleImageChange(image.value)}
                            >
                                <img src={image.value} alt={image.label} className="image-preview" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="available-games">
                <h2>Available Games</h2>
                <div className="game-list">
                    <div
                        className="game-item"
                        onClick={() => handleGameClick('Brass')}
                        style={{ cursor: 'pointer', color: '#3498db', textDecoration: 'underline' }}
                    >
                        Brass
                    </div>
                    {/* Add more games here as they become available */}
                </div>
            </div>
        </div>
    );
};

export default PlayerProfile;