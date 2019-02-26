import React, { Component } from 'react';
import './App.css';
import {withRouter} from 'react-router-dom';
import { Router, Route, Link } from 'react-router';
import Users from './Users';
import PageBar from './PageBar';
const qs = require('query-string');

class App extends Component {
    constructor(props){
      super(props);
        this.state={loaded:false,current_page:parseInt(props.match.params.number),size:20};
    }

    componentDidMount(){
        this.loadData(this.state.current_page,20);
    }
    componentWillReceiveProps(props){
        let current_page=parseInt(props.match.params.number);
        let size=props.location.size;
        this.setState({loaded:false,current_page:current_page,size:size});
        this.loadData(parseInt(props.match.params.number),size);
    }
    loadData(pageNo,size){
        fetch(`http://localhost:3000/api/users?pageNo=${pageNo}&size=${size}`)
            .then(res=>res.json())
            .then(data=>{
                this.setState({loaded:true,messages:data.message,pages:data.pages});

            })
    }
    render(){
       if (!this.state.loaded) return(<div>Загрузка</div>); else return (
           <div>
            <PageBar  size={this.state.size} pages={this.state.pages} currentPage={this.state.current_page}/>
            <Users messages={this.state.messages}/>
           </div>
        );
    }
}

export default App;
