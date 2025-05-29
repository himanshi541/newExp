import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from "react-top-loading-bar";
const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState([true]);
  const [page, setPage] = useState([1]);
  const [totalResults, setTotalresults] = useState([0]);

  //   document.title = `${.capitalizeFirstLetter(
  //     props.category
  //   )} - NewsExpress`;
  // }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    props.setProgress(80);
    console.log(parsedData);
    setArticles(parsedData.articles);
    setTotalresults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    updateNews();
  }, []);
  // async componentDidUpdate(prevProps) {
  //   if (
  //     prevProps.category !== props.category ||
  //     prevProps.searchQuery !== props.searchQuery
  //   )
  // };

  // async componentDidMount() {
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    // setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalresults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center" style={{ margin: "35px 0px" }}>
        NewsExpress - To Get the Latest news on{" "}
        {capitalizeFirstLetter(props.category)}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4 my-3 " key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author ? element.author : "Unknown"}
                    publishdate={
                      element.publishedAt
                        ? new Date(element.publishedAt).toGMTString()
                        : "Unknown"
                    }
                    source={element.source.name}
                    category={props.category}
                    country={props.country}
                    pageSize={props.pageSize}
                    page={page}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default News;
