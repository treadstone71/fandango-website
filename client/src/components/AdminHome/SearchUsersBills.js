import React from 'react';
import AdminNav from '../NavBars/AdminNav.js';
import { connect } from 'react-redux';
import { adminActions } from "../../apiActions";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import {  Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';



class UsersBills extends React.Component{
    
    constructor(){
        super();

        this.toggle = this.toggle.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            activeTab: '1',
            startDate: moment(),
            endDate: moment()
        };
    }

    onClick(e){
        console.log(this.state.startDate.format("YYYY-MM-DD"));
        const{ dispatch } = this.props;
        dispatch(adminActions.getBills(this.state.startDate.format("YYYY/MM/DD"), this.state.endDate.format("YYYY/MM/DD")));
    }

    handleChangeStart(date) {
        console.log(date);
        this.setState({
          startDate: date
        });
    }

    handleChangeEnd(date) {
        this.setState({
          endDate: date
        });
    }


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render(){
        const { admin } = this.props;

        let billsEle = null;
        if(admin.bills){
            function getDate(date){
                date = new Date(date);
                return (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
            }
            let bills = admin.bills.map(bill => <tr>
                                        <td><a href={"/admin/bill/"+bill.billingid}>{bill.billingid}</a></td>
                                        <td>{getDate(bill.date)}</td>
                                        <td>{bill.amount}</td>
                                        <td><a href={"/admin/user/"+bill.userid}>{bill.userid}</a></td>
                                        <td><a href={"/admin/movie/"+bill.movieid}>{bill.movieid}</a></td>
                                        <td><a href={"/admin/moviehall/"+bill.moviehallid}>{bill.moviehallid}</a></td>
                                        <td>{bill.numtickets}</td>
                                    </tr>)

            billsEle = <div><br/>
                              <label>Projects You Published : </label><br/><br/>
                            <table class="table">
                                <thead>
                                  <tr>
                                    <th>Bill Id</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>User</th>
                                    <th>Movie</th>
                                    <th>Hall</th>
                                    <th>Tickets Sold</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {bills}
                                </tbody>
                              </table>
                        </div>
        }

        return (
            <div class="container">
            <AdminNav /><br/><br/><br/><br/>
            <div class="row"><div class="col-sm-1"></div><div class="col-sm-10">
            <Nav tabs>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}>
                  Bills
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                  Users
                </NavLink>
              </NavItem>
            </Nav><br/>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
              <div class="row">
              <div class="col-sm-4">
                <Label for="startDate">From: </Label>
                <DatePicker name="startDate" selected={this.state.startDate} onChange={this.handleChangeStart} /></div>
            <div class="col-sm-4">
                <Label for="endDate">To:</Label>
                <DatePicker name="endDate" selected={this.state.endDate} onChange={this.handleChangeEnd} /></div>
            <div class="col-sm-4"></div>
            </div><br/><Button color="primary" onClick={this.onClick}>Display Bills</Button><br/>

                    {billsEle}
              </TabPane>
              <TabPane tabId="2">
                {null}
              </TabPane>
            </TabContent>
            </div><div class="col-sm-1"></div></div>
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

const SearchUsersBills = connect(mapStateToProps)(UsersBills);
export default SearchUsersBills;