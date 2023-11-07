import "./Badge.less";

const Badge = ({
  imageUrl,
  name,
  progressPercent,
}) => {
  return (
    <>
      <div className="badge-page-section badge-card">
        <img
          className="badge-card-image badge-page-item-border"
          src={imageUrl}
        />
        <div className={"badge-card-item badge-page-item-border badge-page-round-large"}>
          <h1 className={"badge-card-name"}>{name}</h1>
        </div>
        <div className={"badge-card-item badge-page-item-border badge-page-round-large"}>
          <p className={"badge-card-role"}><span className={"bold"}>Progress: </span>{progressPercent}%</p>
        </div>
      </div>
    </>
  )
}

export default Badge;
