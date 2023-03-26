import React from "react";
import './Dashboard.css'
import UserPost from "./UserPost";
export default function Dashboard() {
    return (
    <div>

    
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
        /> 
<nav className="navbar navbar-light bg-white">
        <a href="#" className="navbar-brand">CrabNet</a>
        <form className="form-inline">
            <div className="input-group">
                <input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <div className="input-group-append">
                    <button className="btn btn-outline-primary" type="button" id="button-addon2">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </form>
    </nav>


    <div className="container gedf-wrapper">
        <div className="row">
            <div className="col-md-3">
                <div className="card">
                    <div className="card-body">
                        <div className="h5">@LeeCross</div>
                        <div className="h7 text-muted">Fullname : Miracles Lee Cross</div>
                        <div className="h7">Developer of web applications, JavaScript, PHP, Java, Python, Ruby, Java, Node.js,
                            etc.
                        </div>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <div className="h6 text-muted">Followers</div>
                            <div className="h5">5.2342</div>
                        </li>
                        <li className="list-group-item">
                            <div className="h6 text-muted">Following</div>
                            <div className="h5">6758</div>
                        </li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                </div>
            </div>
            <div className="col-md-6 gedf-main">

            
                <div className="card gedf-card">
                    <div className="card-header">
                        <ul className="nav nav-tabs card-header-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true"> Create post</a>
                            </li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div className="form-group">
                                    <label className="sr-only" htmlFor="message">post</label>
                                    <textarea className="form-control" id="message" rows={3} placeholder="What are you thinking?"></textarea>
                                </div>

                            </div>
                        </div>
                        <div className="btn-toolbar justify-content-between">
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary">share</button>
                            </div>  
                        </div>
                    </div>
                </div>
                <UserPost/>
            </div>
            <div className="col-md-3">
                <div className="card gedf-card">
                    <div className="card-body">
                        <h5 className="card-title">Leave a star on github</h5>
                        <a href="#" className="card-link">Project</a>
                    </div>
                </div>
                <div className="card gedf-card">
                       
                    </div>
            </div>
        </div>
    </div>
    </div>
    )
}

