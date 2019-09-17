import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Menu.css'

let prevScrollpos = 0;

class App extends Component {
    state = {
        a:''
    }
    myFunction(event) {
        this.refs.container.classList.toggle("change");
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
    }
    
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    nav = React.createRef();
  
    handleScroll = () => {
        var currentScrollPos = window.scrollY;

        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        this.refs.myBar.style.width = scrolled + "%";

        window.requestAnimationFrame(() => {
            if (prevScrollpos < currentScrollPos) {
                this.refs.navi.style.top = '0';
                this.refs.myBarContainer.style.top = '-50px';
            } else if (prevScrollpos > currentScrollPos) {
                this.refs.navi.style.top = '-50px';
                this.refs.myBarContainer.style.top = '0px';
            }
        
            if (currentScrollPos < 15) {
                this.refs.navi.style.top = '0';
            }
            if (currentScrollPos < 20) {
                this.refs.myBarContainer.style.top = '-50px';
                this.refs.myBtn.style.opacity = "0";
            } else {
                this.refs.myBtn.style.opacity = "1";          
            }
        });
        prevScrollpos = currentScrollPos;
    };

    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }


    render() {
        return (
            <div>
                <div className="MarginOfNavigation"/>

                <div className="progress-container" ref="myBarContainer">
                    <div className="progress-bar" ref="myBar"></div>
                </div>

                <nav>
                    <ul ref="navi">
                        <li className='left'><NavLink exact to="/">Fumesoft</NavLink></li>
                        <li><NavLink exact to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/about" >About</NavLink></li>
                        <li><NavLink to="/post">Posts</NavLink></li>
                        <li ><NavLink exact to="/">Prologue</NavLink></li>
                    </ul>
                </nav>
                
                <button onClick={this.topFunction} id="myBtn" ref="myBtn" title="Go to top">Top</button>
            </div>
        );
    }
};

export default App;