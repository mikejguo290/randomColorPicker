import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from './Button'


//Random‘s job is to store a random color, and to use that color to update the screen’s background.

class Random extends React.Component {
  constructor(props) {
    super(props);
    this.state={ color : [100, 200, 100] };
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(){
    this.setState({color: this.chooseColor()});
  }

  componentDidMount() {
    this.applyColor();
  }

  componentDidUpdate(prevProps, prevState) {
    this.applyColor();
  }

  formatColor(ary) {
    return 'rgb(' + ary.join(', ') + ')';
  }

  isLight() {
    /*The button is to be light if the background is dark and dark if the background is light.
    this.isLight() returns a boolean based on whether the sum of RGB is greater smaller roughly256/2*3 or not. 
    // white is (256, 256, 256); higher RGB values mean lighter colors, */
    const rgb = this.state.color;
    return rgb.reduce((a,b) => a+b) < 127 * 3;
  }

  applyColor() {
    const color = this.formatColor(this.state.color);
    document.body.style.background = color;
  }

  chooseColor() {
    // randomly selects a color. returns an array of RGB colors chosen at random
    const random = [];
    for (let i = 0; i < 3; i++) {
      random.push(Math.floor(Math.random()*256));
    }
    return random;
  }

  render() {
    return (
      <div>
        <h1 className={this.isLight() ? 'white' : 'black'}>
        Your color is {this.formatColor(this.state.color)}
        </h1>
        <Button onClick={this.handleClick} light={this.isLight()} />
      </div>
    );
  }
}

ReactDOM.render(
  <Random />, 
  document.getElementById('app')
);