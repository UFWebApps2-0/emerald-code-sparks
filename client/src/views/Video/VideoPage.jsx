import VideoPlayer from './VideoPlayer'
import NavBar from "../../components/NavBar/NavBar"
import "./VideoPage.less";
export default function VideoPage({ thisID, thisTitle }) {
    console.log("https://www.youtube.com/embed/" + thisID);
    console.log(thisTitle);
    return (
        <div className='container nav-padding'>
        <NavBar />
            <div id='main-header'>{thisTitle}</div>
            <VideoPlayer url={"https://www.youtube.com/embed/" + thisID} title={thisTitle} ></VideoPlayer>

        </div>
    )
}