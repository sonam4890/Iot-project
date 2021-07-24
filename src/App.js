import React, { Component } from "react";
import styles from "./App.module.css";
import Navbar from "./components/Navbar/navbar";
import axios from "axios";
import SearchList from "./components/SearchList/searchList";

class App extends Component {
  state = {
    title: "",
    searchData: [],
    page: 1,
    error: null,
    hasMore: true,
  };

  uniqueObject = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };

  dataHandler = (title, page) => {
    axios
      .get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=6c1cf4c4d5fe283be9162eb56bae31a9&text=${title}&per_page=10&page=${page}&format=json&nojsoncallback=1`
      )
      .then((res) => {
        // console.log(res);
        let search = [
          ...this.state.searchData,
          ...res.data.photos.photo?.filter((photo) => photo.title !== ""),
        ];

        let finalSearchData = this.uniqueObject(search, "id");

        if (res.data.photos.pages <= res.data.photos.page) {
          this.setState({
            hasMore: false,
          });
        }
        this.setState({
          searchData: finalSearchData,
        });
      })
      .catch((err) => {
        this.setState({
          error: err,
        });
      });
  };

  searchDataHandler = (event) => {
    this.setState({
      searchData: [],
      title: event,
      page: 1,
    });
    this.dataHandler(event, this.state.page);
  };

  fetchMoreData = () => {
    // console.log(this.state.title, this.state.page);
    this.dataHandler(this.state.title, this.state.page + 1);
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div className={styles.App}>
        <Navbar search={this.searchDataHandler} />
        <SearchList
          searchList={this.state.searchData}
          fetchMore={this.fetchMoreData}
          hasMore={this.state.hasMore}
        />
      </div>
    );
  }
}

export default App;
