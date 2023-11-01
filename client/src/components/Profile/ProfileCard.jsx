import "./ProfileCard.less";

const ProfileCard = ({
  imageUrl,
  name,
  role,
}) => {
  return (
    <>
      <div className={"profile-card"}>
        <img
          className={"profile-card-image"}
          src={imageUrl}
          alt={`${name}'s profile`}
        />
        <div className={"profile-card-item"}>
          <h1 className={"profile-card-name"}>{name}</h1>
        </div>
        <div className={"profile-card-item"}>
          <p className={"profile-card-role"}><span className={"bold"}>Role: </span>{role}</p>
        </div>
      </div>
    </>
  )
}

export default ProfileCard;
