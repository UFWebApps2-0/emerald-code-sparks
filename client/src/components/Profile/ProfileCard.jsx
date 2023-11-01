import "./ProfileCard.less";

const ProfileCard = () => {
  return (
    <>
      <div className={"profile-card"}>
        <img
          className={"profile-card-image"}
          src="https://media.discordapp.net/attachments/1163871360972501144/1168945792451629216/image.png"
          alt="User profile"
        />
        <div className={"profile-card-item"}>
          <h1 className={"profile-card-name"}>John Smith</h1>
        </div>
        <div className={"profile-card-item"}>
          <p className={"profile-card-role"}><span className={"bold"}>Role: </span>Student</p>
        </div>
      </div>
    </>
  )
}

export default ProfileCard;
