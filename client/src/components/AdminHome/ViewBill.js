import React from 'react';
import AdminNav from '../NavBars/AdminNav.js';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { adminActions } from "../../apiActions";

class Bill extends React.Component{
    
    constructor(){
      super();
    }

    componentDidMount(){
        const { dispatch } = this.props;
        let path  = this.props.location.pathname.split('/');
        console.log(path ,"check this")
        if(path[1] == 'admin' && path.length == 4){
            dispatch(adminActions.getBillInfo(path[3]));
        }
    }

    render(){
      let infoEle = null;

      const { admin } = this.props;

        function getDate(date){
            date = new Date(date);
            return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
        }
    
        if(admin.bill){
            infoEle = <div class="container">
                            <div class="row">
                                <div class="col-sm-3">
                                </div>
                                <div class="col-sm-6">
                                    <div class="card card-body bg-light">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <img src={ "http://localhost:3000/movieimages/1002.jpeg"} alt="" class="img-rounded img-responsive" />
                                            </div>
                                            <div class="col-sm-6">
                                                <p><b>BillingID : </b>{admin.bill.billingid}</p>
                                                <p><b>Date : </b>{getDate(admin.bill.date)}</p>
                                                <p>Amount : {admin.bill.amount}</p>
                                                <p>User : <a href={"/admin/user/" + admin.bill.userid}>{admin.bill.username}</a></p>
                                                <p>Movie : <a href={"/admin/movie/" + admin.bill.movieid}>{admin.bill.moviename}</a></p>
                                                <p>Hall : <a href={"/admin/moviehall/" + admin.bill.hallid}>{admin.bill.hallname}</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div><div class="col-sm-3"></div>
                            </div>
                        </div>
        }

      return (
          <div class="container">
          <AdminNav /><br/><br/><br/><br/><br/><br/>

          <div>
            {infoEle}
          </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { admin } = state;
    return {
        admin
    };
}

const ViewBill = connect(mapStateToProps)(Bill);
export default ViewBill;