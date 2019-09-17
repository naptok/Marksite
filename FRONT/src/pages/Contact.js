import React, { Component } from 'react';
import '../css/Posts.css'

const request = require('request');
const Markdown = require('markdown-it')
const urlencode = require('urlencode');
const markdown = new Markdown();

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

class App extends Component {
    state = {
        inside : '',
        loading : (<div className="loading">Loading&#8230;</div>)
    }

    constructor(props) {
        super(props);

        this.getPostMD(this, 'contact')
    }

    getPostMD(_this, file) {
        request.get({uri:`http://localhost:4000/post/getPage/${urlencode(file)}`}, (err, res, body) => {
            _this.setState({inside : body, loading : null})
        });
    }

    render() {
        const { inside, loading } = this.state;
        return (
            <div>
                {loading}

                <div className="hero-image3">
                    <div className="hero-text">
                        <h1>Contact</h1>
                        <p>How to contact my accounts</p>
                    </div>
                </div>

                {/* MD -> HTML rendering */}
                <article className = "markdown-body">
                <div dangerouslySetInnerHTML = {{__html: replaceAll(markdown.render(inside), 'img src="..', 'img src="http://localhost:4000')}}/>
                </article>
            </div>
        );
    }
}

export default App;