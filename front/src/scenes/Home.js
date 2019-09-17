import React, { Component } from 'react';
import '../css/Animate.css'
import '../css/Home.css'

const style = { 0 : { animationDelay: "250ms" }, 1 : {animationDelay: "300ms"}, 2 : {animationDelay: "350ms"}, 3 : {animationDelay: "400ms"}, 4 : {animationDelay: "450ms"} }

class App extends Component {

  constructor(props) {
    super(props);

    setTimeout(_=>{ 
      this.refs.btn.style={animationName:"none"}
    }
      , 3000)
  }

  render() {
    return (
        <div>
          <div className="jg titleBody">
            <h2>
                홈
            </h2>
              <div className="button">
                <div className="listDivide">
                  <span ref="btn" className="animated" style={style[0]}>PORTFOLIO</span>
                </div>

                <div className="listDivide">
                  <span className="animated" style={style[1]}>ABOUT</span>
                  <span className="animated" style={style[2]}>IMAGE</span>
                </div>

                <div className="listDivide">
                  <span className="animated" style={style[3]}>CONTACT</span>
                  <span className="animated" style={style[4]}>BLOG</span>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default App;