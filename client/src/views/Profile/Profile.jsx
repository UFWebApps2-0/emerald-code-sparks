import ProfileCard from "../../components/Profile/ProfileCard";
import "./Profile.less";

const Profile = () => {
  return (
    <div>
      <ProfileCard
        imageUrl={"https://media.discordapp.net/attachments/1163871360972501144/1168945792451629216/image.png"}
        name={"John Smith"}
        role={"Student"}
      />
      <div className={"project-section"}>
        {Array(10).fill("1").map(name => (
          <div className="project-section-project">
            Project {name}
          </div>
        ))
        }
      </div>
    </div>
  )
}

export default Profile;
