import React, { Component } from 'react'

export default class Newsitem extends Component {
    render() {
        let {title,description,imageurl,newsurl,author,date,source} = this.props;
        return (
            
                <div className='my-3'>
                    <div className="card" style={{width: "20rem"}}>
                        <img src={imageurl?imageurl:"https://static01.nyt.com/images/2021/12/12/fashion/11MARTINELLIS1/11MARTINELLIS1-facebookJumbo.jpg"} className="card-img-top" alt="..."/>
                            <div className="card-body">
                            <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'50%',zIndex:1}}>
                                {source}
                                <span class="visually-hidden">unread messages</span>
                            </span>

                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{description}</p>
                                <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                                <a href={newsurl} rel="noreferrer" target = "_blank" className="btn btn-dark">Go somewhere</a>
                            </div>
                    </div>
                </div>
        
        )
    }
}
