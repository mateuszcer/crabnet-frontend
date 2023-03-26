import React from 'react'
import "./Dashboard.css"
export default function UserPost() {


  return (
    <div className="card gedf-card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt=""/>
                                </div>
                                <div className="ml-2">
                                    <div className="h5 m-0">@bootdey</div>
                                    <div className="h7 text-muted">Mark Lee Smith</div>
                                </div>
                            </div>
                            <div>
                                <div className="dropdown">
                                    <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-ellipsis-h"></i>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
                                        <div className="h6 dropdown-header">Configuration</div>
                                        <a className="dropdown-item" href="#">Save</a>
                                        <a className="dropdown-item" href="#">Hide</a>
                                        <a className="dropdown-item" href="#">Report</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="card-body">
                        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>10 min ago</div>
                
                        <p className="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo recusandae nulla rem eos ipsa praesentium esse magnam nemo dolor
                            sequi fuga quia quaerat cum, obcaecati hic, molestias minima iste voluptates.
                        </p>
                    </div>
                    <div className="card-footer">
                        <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                        <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                        <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                    </div>
                </div>
  )
}
