import VideoPlayer from './VideoPlayer';
import NavBar from "../../components/NavBar/NavBar";
import "./VideoPage.less";
export default function VideoPage({ thisID, thisTitle }) {
    function HandleClick(){
        navigate(-1);
    }
    return (
        <div className='container nav-padding'>
            <NavBar /><br/>
            <h1 id="VideoPage-h1" style={{margin: "auto", color: "white"} }>{"Crab Rave"}</h1>
            <VideoPlayer url={"https://www.youtube.com/embed/-50NdPawLVY?si=8p9J11fE5zXSIFm2"} title={"Crab Rave"} ></VideoPlayer>
            <br />
            <button
                className="VideoPage-button"
                onClick={HandleClick}
                style={{margin: "auto"} }
            >Return to Gallery</button>
        </div>
    )
}