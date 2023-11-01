import "./Profile.less";

const Profile = () => {
  return (
    <>
      <div className={"profile-card"}>
        <img
          className={"profile-card-image"}
          src="https://media.discordapp.net/attachments/1163871360972501144/1168945792451629216/image.png"
          alt="User profile"
        />
        <h1 className={"profile-card-name"}>User name</h1>
        <p className={"profile-card-name"}>User role</p>
      </div>
    </>
  )
}

export default Profile;
