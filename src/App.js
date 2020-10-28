import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import List from './components/contactList'
import Details from './components/contactDetails'

class App extends Component {
  constructor() {
    super()
    this.state = {
      detail: null
    }

    this.detailHandler = this.detailHandler.bind(this)
  }

  detailHandler(id) {
    this.setState({detail: id})
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact><List detailHandler={this.detailHandler} /></Route>
          {this.state.detail ? <Route path='/'><Details id={this.state.detail} /></Route> : null}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
