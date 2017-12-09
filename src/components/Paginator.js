import React, { Component } from 'react'
import { Pagination } from 'react-bootstrap'

class Paginator extends Component {

getInitialiseState (){
 return {
   currentPageNumber: 1,
   totalRestaurant: 1
 }

}

componentWillReceiveProps(newProps){
  this.setState({
    currentPageNumber: newProps.currentPageNumber,
    totalRestaurant: newProps.totalRestaurant
  })
}

handleSelect(eventKey){
  this.props.changePage(eventKey)
}

render(){
  return
  <Pagination
    bsSize = "medium"
    items = {this.state.totalRestaurant}
    activatePage= {this.state.currentPageNumber}
    onSelect={this.handleSelect}/>
}
 }
 export default Paginator
