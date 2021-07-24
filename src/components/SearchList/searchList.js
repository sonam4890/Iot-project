import React, { Component } from "react";
import styles from "./searchList.module.css";
import Image from "../Image/image";
import InfiniteScroll from "react-infinite-scroll-component";
import { saveAs } from "file-saver";

export class SearchList extends Component {
  download = (url) => {
    saveAs(url, "image.jpg");
  };
  render() {
    let imageLink = ``;
    return (
      <div className={styles.SearchList}>
        {this.props.searchList.length > 0 ? (
          <InfiniteScroll
            dataLength={this.props.searchList.length}
            next={this.props.fetchMore}
            hasMore={this.props.hasMore}
          >
            {this.props.searchList?.map((item) => {
              let link = `https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
              return (
                <div className={styles.Item} key={item.id}>
                  <div className={styles.Poster}>
                    <Image pic={link} />
                  </div>
                  <div>
                    <div className={styles.Title}>{item.title}</div>
                    <div
                      className={styles.Download}
                      onClick={() => this.download(link)}
                    >
                      download image:
                      <span className={styles.Link}>{link}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </InfiniteScroll>
        ) : (
          <div className={styles.Welcome}>
            Welcome to <span>Iot83</span>
          </div>
        )}
      </div>
    );
  }
}

export default SearchList;
