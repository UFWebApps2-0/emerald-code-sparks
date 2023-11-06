import "./Profile.less";

import React, { useState } from 'react';
import ProfileCard from "../../components/Profile/ProfileCard";
import ProgressBar from "../../components/Profile/ProgressBar";
import NavBar from "../../components/NavBar/NavBar";
import ProjectSection from "../../components/Profile/ProjectSection";

const Profile = () => {
  const [bio, setBio] = useState('Your bio text goes here');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [selectedBadges, setSelectedBadges] = useState([1, 2, 3, 4]);
  const [isEditingBadges, setIsEditingBadges] = useState(null);

  const handleBioEdit = () => {
    setIsEditingBio(true);
  };

  const handleBioSave = () => {
    setIsEditingBio(false);
    // You can save the updated bio to your backend or state management system here
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleBadgeEdit = (badgeIndex) => {
    // Toggle the editing state for the selected badge
    setIsEditingBadges(badgeIndex);
  };

  const handleBadgeSave = (badgeIndex, newBadgeID) => {
    // Save the changes and update the selected badge
    setSelectedBadges((prevBadges) => {
      const updatedBadges = [...prevBadges];
      updatedBadges[badgeIndex] = newBadgeID;
      return updatedBadges;
    });
    setIsEditingBadges(null);
  };

  return (
    <div className='profile-container nav-padding'>
      <NavBar />
      <ProfileCard
        imageUrl={"https://media.discordapp.net/attachments/517010400860962831/1171160597463838840/image.png"}
        name={"John Smith"}
        role={"Student"}
      />
      <div className="profile-biography-section">
        <h2>User Biography</h2>
        {isEditingBio ? (
          <div>
            <textarea
              value={bio}
              onChange={handleBioChange}
              rows="4"
              cols="50"
            />
            <button onClick={handleBioSave}>Done</button>
          </div>
        ) : (
          <div>
            <p>{bio}</p>
            <button onClick={handleBioEdit}>Edit</button>
          </div>
        )}
      </div>
      <div className='profile-badge-display'>
        <h2>Badge Display</h2>
        <div>

        </div>
      </div>
      <ProjectSection/>
      <div className='profile-available-badges'>
        <h2>Available Badges</h2>
        <div>
          <ProgressBar progress={20} />
          <ProgressBar progress={50} />
          <ProgressBar progress={90} />
        </div>
      </div>
    </div>
  )
}

export default Profile;
