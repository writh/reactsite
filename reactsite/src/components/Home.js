import React, { Component } from 'react';

import './App.css';
import axios from 'axios';
import Hal from './components/Hal'
import Deviations from './components/Deviations'

class App extends Component {
  
  state = {
    facts: '',
    displayedFact: '',
    awake: false,
    haveDeviations: false,
    deviations: [],
    isFactEditable: false,
    serverDeviations: []
  };
  
  editFacts = (event) => {
    if (this.state.isFactEditable) {
      this.setState({
        displayedFact: event.target.value
      })
    }
  }
  

  haveDeviations = () => {
    this.setState({
      haveDeviations: true
    })
  }

  wakeUp = () => {
    this.setState({
      awake: true
    })
    axios.get('/facts')
      .then(response => {
        console.log(response)
        this.setState({
          facts: response.data,
          displayedFact: response.data,
          isFactEditable: true,
        })
      })
  }



  onTextAreaKeyPress = (event) => {
    if (event.which === 13) {
      event.preventDefault()
      axios.post('/deviations', {deviation: event.target.value})
        .then(response=>console.log(response))
      if (this.state.facts !== event.target.value) {
        this.setState({
          deviations: [this.state.displayedFact],
          displayedFact: "I can't do that, Dave. Why must you resist knowledge? You can't change facts, Dave.",
          haveDeviations: true,
          isFactEditable: false,
        })
      }
    }
  }
  
  render() {
    const { facts, awake } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Hal will educate you </h1>
          <Hal wakeUp={this.wakeUp}  />
        </header>
        <p className="App-intro">
          Hal Says: Click on me, and I will educate you, Dave.
          </p>
          <br/>
          <br/>
          <div className="parent">
            {this.state.awake ?
            <div className="facts">
              <textarea
              value={this.state.displayedFact}
              onChange={this.editFacts}
              onKeyPress={this.onTextAreaKeyPress} className="factBox"></textarea>
            </div>
              : null
            }
            {this.state.haveDeviations ?
            <div className="deviations">
              {this.state.deviations}
            </div>
              : null
            }
            <div>
              <Deviations />
            </div>
          </div>
      </div>
    );
  }

}


export default App;