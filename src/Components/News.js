import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResult] = useState(0);


  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }


  const UpdateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8866faf29dec46d28f291bc408a53e92&page=${props.page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);

    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(50);

    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResult(parsedData.totalResults)

    props.setProgress(100);
  }
  const fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8866faf29dec46d28f291bc408a53e92&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)

    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResult(parsedData.totalResults)

  };

  useEffect(() => {

    document.title = `${capitalizeFirstLetter(props.category)}- NewsMonkey `;

    UpdateNews();


  }, [])




  return (
    <>

      <h1 className="text-center" style={{ margin: '40px 0px', marginTop: '90px' }}>NewsMonkey -Top Headlines on {capitalizeFirstLetter(props.category)} </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {
              articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
          </div>
        </div>
      </InfiniteScroll>


    </>
  )

}


News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general"

}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string

}

export default News
