import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import PopupVideoPlayer from "./PopupVideoPlayer";

class App extends React.Component {
  state = { videos: [], selectedVideo: null, popup: false };

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
    return (
      <div className="ui container">
        <SearchBar onFormSubmit={this.onTermSubmit} />
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
          <div>
              <br />
              <br />
          </div>
        <div className="ui grid">
          <div className="ui row">
            <div className="column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
          {this.state.popup && <PopupVideoPlayer selectedVideo={this.state.selectedVideo} handleCancel={this.handleCancel} /> }
      </div>
    );
  }
}

export default App;
