import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import $ from "jquery";

class PageBar extends Component {
    gotoPage(number){
        let path = {pathname:`../users/${number}`,
        size:$('.input-size').val()};
        this.props.history.push(path);
    }
    changeSize(e){
        let path = {pathname:`../users/1`,
            size:e.target.value};
        this.props.history.push(path);
    }
    fillBar(){
        const links=[];
        const current_page=this.props.currentPage;
        const pages=this.props.pages-1;
        links.push(1);
        links.push(pages);
        for (let i=current_page-2;i<current_page+3;i++) {
            if (i > 0 && i < pages) {
                links.push(i)
            }
        }
        let uniq = [...new Set(links)];
        return uniq.sort((a,b)=>a-b);
    }
    render(){
        return (
            <div>
                {this.fillBar().map((number,i)=>{
                    if (number==this.props.currentPage) return <button  key={number}  onClick={(e)=>e.preventDefault()} className="btn btn-dark active">{number}</button>;
                    else return <button  key={number}  onClick={()=>this.gotoPage(number)} className="btn btn-light">{number}</button>
                })}
                <br/><div>Users per page: </div>
                <input
                    type="number" className="input-size"  defaultValue={this.props.size} onBlur={(e)=>this.changeSize(e)}/>
            </div>
        );
    }
}

export default withRouter(PageBar);
