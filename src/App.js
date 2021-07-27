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
    loading: false,
    hasMore: true,
    show: false,
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
        if (res.data.photos.photo.length > 0 && res.data.stat === "ok") {
          let search = [
            ...this.state.searchData,
            ...res.data.photos.photo?.filter((photo) => photo.title !== ""),
          ];

          let newSearchData = this.uniqueObject(search, "id");
          let finalSearchData = this.uniqueObject(newSearchData, "title");

          if (res.data.photos.pages <= res.data.photos.page) {
            this.setState({
              hasMore: false,
              loading: false,
            });
          }
          this.setState({
            searchData: finalSearchData,
            loading: false,
          });
        } else {
          this.setState({ searchData: null, loading: false });
        }
      })
      .catch((err) => {
        this.setState({
          error: "Error in fetching data",
          loading: false,
        });
      });
  };

  searchDataHandler = (event) => {
    if (event !== "") {
      this.setState({
        searchData: [],
        title: event,
        page: 1,
        show: true,
        hasMore: true,
        loading: true,
        error: null,
      });
      this.dataHandler(event, this.state.page);
    } else {
      this.setState({
        searchData: [],
        show: false,
      });
    }
  };

  fetchMoreData = () => {
    this.dataHandler(this.state.title, this.state.page + 1);
    this.setState((prevState) => ({
      page: prevState.page + 1,
      loading: true,
      error: null,
    }));
  };

  render() {
    return (
      <div className={styles.App}>
        <Navbar search={this.searchDataHandler} />
        {this.state.show ? (
          <SearchList
            searchList={this.state.searchData}
            fetchMore={this.fetchMoreData}
            hasMore={this.state.hasMore}
            loading={this.state.loading}
            error={this.state.error}
          />
        ) : (
          <div className={styles.Welcome}>
            Welcome to <span>Iot83</span>
          </div>
        )}
      </div>
    );
  }
}

export default App;
