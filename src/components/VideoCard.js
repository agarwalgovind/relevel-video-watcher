import React from 'react';
import '../styles/VideoCard.css';
import '../styles/VideoItem.css';
import { TrashOutline } from 'react-ionicons'

const VideoCard = (props) => {
    return (
        <>
            <div className="video-card">
                <div onClick={() => props.onVideoSelect(props.currentVideo)}>
                    <div className="image">
                        <img
                            alt={props.currentVideo.snippet.title}
                            className="ui image"
                            src={props.currentVideo.snippet.thumbnails.medium.url}
                        />
                    </div>
                    <div className="video-content">
                        <span className="text-wrap">{props.currentVideo.snippet.title}</span>
                    </div>
                    {/*<div className="buttons-wrapper">
                        <button className="delete-btn" title="delete" onClick={props.deleteSelectedVideo}>
                            <TrashOutline
                                color={'#00000'}
                                title=""
                                height="25px"
                                width="25px"
                            />
                        </button>
                    </div>*/}
                </div>
            </div>
        </>
    );
}

export default VideoCard;


