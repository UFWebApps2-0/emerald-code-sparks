export default function VideoPlayer({ url, title }) {
    
    return (
        <div>
            <iframe width="560" height="315"
                src={url}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
        </div>
      
    );
}
