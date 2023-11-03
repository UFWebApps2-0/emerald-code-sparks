import React, {useState} from 'react';
import ProfileCard from "../../components/Profile/ProfileCard";
import "./Profile.less";

const Profile = () => {
  const [bio, setBio] = useState('Your bio text goes here');
  const [isEditingBio, setIsEditingBio] = useState(false);

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

  return (
    <div>
      <ProfileCard
        imageUrl={"https://media.discordapp.net/attachments/1163871360972501144/1168945792451629216/image.png"}
        name={"John Smith"}
        role={"Student"}
      />
      <div className="biography-section">
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
      <div className='profile-badge'>

      </div>
      <div className='profile-project'>

      </div>
      <div className='profile-available-badges'>

      </div>
    </div>
  )
}

export default Profile;
