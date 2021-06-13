import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoCard from "./VideoCard";
import "../styles/app.css"
import PopupVideoPlayer from "./PopupVideoPlayer";
import VideoDetail from "./VideoDetail";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = { videos: [], selectedVideo: null, searchValue: '' };
    }

  componentDidMount() {
    this.onTermSubmit('buildings');
  }

  onTermSubmit = async term => {
    const response = await youtube.get('/search', {
      params: {
        q: term
      }
    });

    console.log(response);
      let newArr = response.data.items.map((item, index) => {
          return {
              item: item,
              index: index
          }
      });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
      popup: false
    });
  };

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({popup: false});
  }

  onVideoSelect = video => {
      console.log(111);
    this.setState({
      selectedVideo: video,
      popup: true
    });
  };

    sortByTitle = () =>  {
        let videos = this.state.videos;
        videos.sort((a, b) => {
            if (a.snippet.channelTitle.toLowerCase() < b.snippet.channelTitle.toLowerCase()) return -1;
            if (a.snippet.channelTitle.toLowerCase() > b.snippet.channelTitle.toLowerCase()) return 1;
            return 0;
        })
        this.setState({
           videos: videos
        })
    }

    sortByTimestamp = () => {
        let videos = this.state.videos;
        videos.sort((a, b) => {
            return new Date(a.snippet.publishTime).getTime() - new Date(b.snippet.publishTime).getTime()
        })
        this.setState({
            videos: videos
        })
    }

    deleteSelectedVideo = (e, index) => {
        e.stopPropagation();
        let videos = this.state.videos;
        videos.splice(index, 1);
        this.setState({videos: videos})
    }

  render() {
    let videos = this.state.videos;
    if (videos.length === 0) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    return (
        <div className="ui center aligned basic segment">
          <div className="ui container">
            <SearchBar onFormSubmit={this.onTermSubmit} />
          </div>
            <div className="button-container">
                <input
                    type="button"
                    value="Sort By Title"
                    onClick={this.sortByTitle}
                /> {' '}
                <input
                    type="button"
                    value="Sort By UploadTime"
                    onClick={this.sortByTimestamp}
                />
            </div>
            <div className="ui grid">
                <div className="ui column">
                  <div className="ui five column grid">
                      {videos && videos.map((video, index) => {
                        return (
                            <div className="column" key={index}>
                              <VideoCard
                                  cardId={index}
                                  onVideoSelect={this.onVideoSelect}
                                  currentVideo={video}
                                  deleteSelectedVideo={(e) => this.deleteSelectedVideo(e, index)}
                              />
                            </div>
                        );
                      })}
                  </div>


                <div className="nine wide column">
                    <VideoDetail video={this.state.selectedVideo} />
                </div>
                </div>
            </div>
          {/*{this.state.popup && <PopupVideoPlayer selectedVideo={this.state.selectedVideo} handleCancel={this.handleCancel} /> }*/}
        </div>
    );
  }
}

export default App;
