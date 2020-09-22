import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import LikeItem from "../LikeItem"
import Loading from "../../../../components/Loading"
import "./style.scss"

class LikeList extends Component {
  myRef = React.createRef();
  isScrollListening = false;
  
  componentDidMount(){
    if(this.props.page === 0){
      this.props.fetchData();
    }
    if(this.props.page < 3){
      document.addEventListener("scroll",this.handleScroll);
      this.isScrollListening = true;
    }
  }
  componentWillUnmount(){
    if(this.isScrollListening){
      document.removeEventListener("scroll",this.handleScroll);
      this.isScrollListening = false;
    }
  }
  handleScroll = () => {
    if((this.props.page >= 3) && this.isScrollListening){
      document.removeEventListener("scroll",this.handleScroll);
      this.isScrollListening = false;
    }
    if(this.props.loading){
      return false;
    }
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const screenHeight = document.documentElement.clientHeight;
    const likeListTop = this.myRef.current.offsetTop;
    const likeListHeight = this.myRef.current.offsetHeight;
    if((scrollTop + screenHeight) >= (likeListTop + likeListHeight)){ 
      this.props.fetchData();
    }
  }
  render() {
    return (
      <div className="likeList" ref={this.myRef}>
        <div className="likeList__header">猜你喜欢</div>
        <div className="likeList__list">
          {
            this.props.data.map((item, index) => {
              return <LikeItem key={index} data={item}/>
            })
          }
          {
            this.props.page < 3 ? 
            <Loading></Loading>
            :
            <Link to="/user" className="likeList__viewAll">
              查看更多
            </Link>
          }
        </div>
      </div>
    );
  }
}

export default LikeList;