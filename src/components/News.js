import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export default class News extends Component {

    static defaultProps = {
        country:'in',
        pageSize: 8,
        category: 'general' 
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    articles = []

    constructor(){
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page:1
        }
    }

    async Updatenews(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5458ca2e83094c7bb76d9b478586af0a&page=1&pagesize=${this.props.pagesize}`;
        this.setState({loading:true})
        let data = await fetch(url)
        let parsedata = await data.json()
        this.setState({articles:parsedata.articles,totalArticles:parsedata.totalResults,loading:false})
    }

    async componentDidMount(){
        this.Updatenews()
        // console.log(parsedata)

    }

    handleprevclick = async()=>{
        this.setState({page:this.state.page-1})
        this.Updatenews()
    }

    handlenextclick = async()=>{
            this.setState({page:this.state.page+1})
            this.Updatenews()
    }
     
    render() {
        return (
            

            <div className="container my-5">
                <h2 className="text-center my-5">News Monkey - Top Headlines</h2>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return <div className="col-md-4" key = {element.url}>
                                    <Newsitem title = {element.title ? element.title: ""} description = {element.description ? element.description : ""} imageurl = {element.urlToImage} newsurl = {element.url} author = {element.author?element.author:"Unknown"} date = {element.publishedAt} source = {element.source.name}/>
                                </div>
                    })}
                </div>
                <div className="container my-3 d-flex justify-content-between">
                    <button className="btn btn-dark" type="button" onClick={this.handleprevclick} disabled={this.state.page<=1}>&larr; Previous</button>
                    <button className="btn btn-dark" type="button" onClick={this.handlenextclick} disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pagesize)}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
