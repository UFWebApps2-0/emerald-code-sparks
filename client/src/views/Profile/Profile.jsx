import ProfileCard from "../../components/Profile/ProfileCard";
import ProjectSection from "../../components/Profile/ProjectSection";
import "./Profile.less";

const Profile = () => {
  return (
    <div>
      <ProfileCard
        imageUrl={"https://media.discordapp.net/attachments/1163871360972501144/1168945792451629216/image.png"}
        name={"John Smith"}
        role={"Student"}
      />
      <ProjectSection/>
    </div>
  )
}

export default Profile;
