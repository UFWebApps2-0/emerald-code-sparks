import VideoPlayer from './VideoPlayer';
import NavBar from "../../components/NavBar/NavBar";
import "./VideoPage.less";
export default function VideoPage({ thisID, thisTitle }) {
    function HandleClick() {
        navigate(-1);
    }
    return (
        <div className='container nav-padding'>
            <NavBar /><br />
            <h1 id="VideoPage-h1" style={{ margin: "auto", color: "white" }}>{thisTitle}</h1>
            <VideoPlayer url={"https://www.youtube.com/embed/" + thisID} title={thisTitle} ></VideoPlayer>
            <br />
            <button
                className="VideoPage-button"
                onClick={HandleClick}
                style={{ margin: "auto" }}
            >Return to Gallery</button>
        </div>
    )
}