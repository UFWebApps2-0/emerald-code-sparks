import "./ProjectSection.less";

const ProjectSection = () => {
  return (
    <div className={"profile-project-display"}>
      <h2>Projects</h2>
      {Array(5).fill("1").map(name => (
        <div className="profile-project-display-project">
          Project {name} (Content of this will depend on what the Gallery team creates)
        </div>
      ))
      }
    </div>
  )
}

export default ProjectSection;