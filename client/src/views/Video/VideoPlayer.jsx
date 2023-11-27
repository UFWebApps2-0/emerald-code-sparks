export default function VideoPlayer({ url, title }) {
    
    return (
            <iframe width="616" height="346"
                src={url}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen>
            </iframe>
        
      
    );
}
