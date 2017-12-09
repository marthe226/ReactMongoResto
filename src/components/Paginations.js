import React, { Component } from 'react';
import tableRestaurants from './tableRestaurants'

class Paginations extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants :{},
      currentPageNumber:1,
      totalRestaurant: 1,
      restaurantParPage : 25
    }

  }
  getRestaurants (page){
    let url = 'http://localhost:8080/api/restaurants'
    const main = this
    fetch(url).then(
      function(obj)
      {
      obj.json()
      .then(
        function(res)
        {
       let restaurants = {...main.state.restaurants}
        main.setState ({
        restaurants: res.data,
        currentPageNumber: res.currentPageNumber,
        totalRestaurant: res.totalRestaurant,
        restaurantParPage : res.restaurantParPage

        })
      })
    })
  }

  componentWillMount() {
    this.getRestaurants()
  }

  paginate(i){
    this.setState({currentPageNumber: 1})
  }

  render() {
        let totalPages = Math.ceil(this.state.totalRestaurant / this.state.restaurantParPage);
        return (
            <div>
                <tableRestaurants
                       restaurants={this.state.restaurants}
                       Paginate={this.Paginate.bind(this)}
                       currentPageNumber={this.state.currentPageNumber}
                       totalPages={totalPages}/>
            </div>
        );
    }
}

export default Paginations
