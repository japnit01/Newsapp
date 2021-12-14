import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 1,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    articles = []

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalArticles:0
        }
    }

    async Updatenews() {
        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5458ca2e83094c7bb76d9b478586af0a&page=${this.state.page}&pagesize=${this.props.pagesize}`;
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedata = await data.json()
        console.log(parsedata.totalResults)
        this.setState({ articles: this.state.articles.concat(parsedata.articles), totalArticles: parsedata.totalResults})
        this.props.setProgress(100)
    }

    async componentDidMount() {
        this.Updatenews()
        // console.log(parsedata)

    }

    handleprevclick = async () => {
        this.setState({ page: this.state.page - 1 })
        this.Updatenews()
    }

    handlenextclick = async () => {
        this.setState({ page: this.state.page + 1 })
        this.Updatenews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        this.Updatenews();
      };

    render() {
        return (


            <div className="container my-5">
                <h2 className="text-center my-5">News Monkey - Top Headlines</h2>
                {/* {this.state.loading && <Spinner/>} */}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.totalArticles}
                    loader={<Spinner></Spinner>} style={{overflow:'hidden'}}
                >
                
                <div className= "container" >
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author ? element.author : "Unknown"} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
                </InfiniteScroll>
                {/* <div className="container my-3 d-flex justify-content-between">
                    <button className="btn btn-dark" type="button" onClick={this.handleprevclick} disabled={this.state.page <= 1}>&larr; Previous</button>
                    <button className="btn btn-dark" type="button" onClick={this.handlenextclick} disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pagesize)}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}
