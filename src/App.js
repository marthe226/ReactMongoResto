import React, { Component } from 'react'
import  './styles.css'
import left from './pictures/left.png'
import right from './pictures/right.png'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      restaurants :[],
      total:0,
      pageSize: 25,
      pageNumber: 1,
      sortorder: 'ID',
      footerclass: 'hidefooter',
      pagecount: 0,
      search: ''
    }

this.previouspage = this.previouspage.bind(this)
this.nextpage = this.nextpage.bind(this)
this.ordonner = this.ordonner.bind(this)
  }



    getRestaurants (){
      const main = this
      let counturl = 'http://localhost:8000/api/restaurants/count?search='+this.search
       fetch(counturl).then(rs => {return rs.json()})
       .then(jso => {
         if(Number(jso.code) === 200){
           this.total = Number(jso.data)
           let url = 'http://localhost:8000/api/restaurants?pageNumber='+main.state.pageNumber+'&pageSize='+main.state.pageSize+'&search='+main.state.search+'&sortfield='+main.state.sortfield+'&sortorder='+main.state.sortorder
           fetch(url).then(res => {return res.json()})
           .then(obj => {
             if(Number(obj.code) === 200){
                 console.log(obj.data)
               main.setState ({

               restaurants: obj.data,
               pagecount : main.page(main.state.pageNumber, main.state.pageSize)
               //footerclass : 'showfooter'
               })
             }
           }).catch(err => {console.log(err)})
         }
       }).catch(e => {console.log(e)})

}


page (numpage, taillepage){
  let start = (numpage-1)*taillepage + 1
        let end = numpage*taillepage < this.state.total ?numpage*taillepage:this.state.total
        let value = start+' - '+end+' de '+this.state.total
        return value
}

  componentWillMount() {
    this.getRestaurants()
  }

  ordonner(sort){
        this.state.sortorder = this.state.sortorder===1?-1:1
        this.setState ({
          sortfield : sort
        })
        this.getRestaurants()
      }

  previouspage(){

            this.setState({
              pageNumber: this.state.pageNumber - 1
            })

          this.getRestaurants()
        }
  nextpage(){
    console.log("dans la methode next")
          this.setState({
            pageNumber: this.state.pageNumber + 1
          })


        return this.getRestaurants()
        }

  render() {
    console.log(this.state.restaurants)
      let list = Object.keys(this.state.restaurants).map((key, index) => {
      let restaurant = this.state.restaurants[key];

      const liStyle = {
        backgroundColor: index % 2 === 0 ? 'lightgrey' : 'grey'
      };

      return
     <table width='1000px' id="tableRestaurants" style= {liStyle}>
       <thead id='header' >
         <tr >
           <td onClick ={this.ordonner('restaurant_id')}>ID</td>
           <td onClick = {this.ordonner('name')}>Nom</td>
           <td onClick = {this.ordonner('cuisine')}>Cuisine</td>
           <td>Adresse</td>
         </tr>
         </thead>
         <tbody>
           <tr key={key} >
                 <td>{restaurant.restaurant_id}</td>
                 <td>{restaurant.name}</td>
                 <td>{restaurant.cuisine}</td>
                 <td>{restaurant.address.building+','+restaurant.address.street+','+restaurant.address.zipcode+'...'+restaurant.borough}</td>
             </tr>
         </tbody>
     </table>
    })



    return(
      <div className="App-intro" id="root">
        <div id="title">Liste de restaurants</div>
        <div><input id="search" name="search" type="text" size="40px" placeholder="Chercher par nom ou cuisine"/></div>
        <div id="divRestaurant">
          {list}
        </div>
      <div id="footer">
        <span id="pagecount">{this.state.pagecount}</span>
        <img title="Précédent" id="previous" src={left} width="20px" height="20px" onClick={this.previouspage}/>
        <img title="Suivant" id="next" src={right} width="20px" height="20px" onClick={this.nextpage}/>
      </div>
      </div>
    )}
}
export default App
