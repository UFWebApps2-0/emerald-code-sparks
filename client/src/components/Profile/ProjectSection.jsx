import "./ProjectSection.less";

const ProjectSection = () => {
  return (
    <div className={"project-section"}>
      {Array(10).fill("1").map(name => (
        <div className="project-section-project">
          Project {name} (Content of this will depend on what the Gallery team creates)
        </div>
      ))
      }
    </div>
  )
}

export default ProjectSection;