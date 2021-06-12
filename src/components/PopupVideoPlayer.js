import React from "react";
import "../styles/app.css";


function PopupVideoPlayer({ selectedVideo, handleCancel }) {
    const videoSrc = `https://www.youtube.com/embed/${selectedVideo.id.videoId}`;
    return (
        <div className="player-box">
            <div className="playerBox">
                <span className="close-icon" onClick={handleCancel}>x</span>
            <div className="ui embed">
                <iframe title="video player" src={videoSrc} />
            </div>
            <div className="ui segment">
                <h4 className="ui header">{selectedVideo.snippet.title}</h4>
                <p>{selectedVideo.snippet.description}</p>
            </div>
            </div>
        </div>
    );
}

export default PopupVideoPlayer;