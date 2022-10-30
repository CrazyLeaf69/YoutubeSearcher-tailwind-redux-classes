import React from "react";
import VideoCard from "./VideoCard";
import { connect } from "react-redux";

class SearchResults extends React.Component {
  render() {
    const results = this.props.result;
    return (
      <>
        {results != null ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {results?.items?.map((value) => (
              <VideoCard key={value.id.videoId} video={value} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center text-xl dark:text-white">Search for a Youtube video</div>
        )}
      </>
    );
  }
}
function mapStateToProps(state) {
  const result = state.resultReducer.result;
  return {
    result,
  };
}

export default connect(mapStateToProps)(SearchResults);
