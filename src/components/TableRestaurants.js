import React, {Component} from 'react'
import Paginator from './Paginator'

class TableRestaurants extends Component {
  constructor(props) {
super(props)
this.setState = {
  restaurants: props.restaurants,
  totalPages: props.totalPages,
  currentPageNumber: props.currentPageNumber,
  restaurantParPage: props.restaurantParPage
}
  }

  componentWillReceiveProps(newProps){
    this.setState({
      restaurants: newProps.restaurants,
      totalPages: newProps.totalPages,
      currentPageNumber: newProps.currentPageNumber,
      restaurantParPage: newProps.restaurantParPage
    })
  }

  changePage(i){
    this.props.paginate(i)
  }

  render() {
    const headerStyle = {
      backgroundColor: 'black',
      color: 'white',
      fontFamily: 'sans-serif',
      fontSize: '1.3em'

    }
    //console.log(this.state.restaurants)
    let list = Object.keys(this.state.restaurants).map((key, index) => {
      let restaurant = this.state.restaurants[key];

      const liStyle = {
        backgroundColor: index % 2 === 0 ? 'lightgrey' : 'grey'
      };

      return <tr key={key} style={liStyle}>
                <td>{restaurant.name}</td>
                <td>{restaurant.cuisine}</td>
                <td>{restaurant.borough}</td>

            </tr>

    })

    return(
      <div>
        <h3>My hobbies:</h3>
        <table width='1000px'>
          <thead >
            <tr style={headerStyle}>
              <td>
                nom
              </td>
              <td>
                cuisine
              </td>
              <td>
                borough
              </td>
            </tr>
          </thead>
          <tbody>
          {list}
          </tbody>
      </table>
<Paginator
  totalPages= {this.props.totalPages || 1}
  currentPageNumber= {this.props.currentPageNumber || 1}
  changePage = {this.props.changePage.bind(this)}/>
      </div>
    )}
}

export default TableRestaurants
