import React, { Component } from 'react';
import '../css/Posts.css'
import '../css/Home.css'

const request = require('request');
const Markdown = require('markdown-it')
const urlencode = require('urlencode');
const markdown = new Markdown();

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

let self;

class App extends Component {
    state = {
        inside : '',
        loading : (<div className="loading">Loading&#8230;</div>),
        some: '',
        today: 0,
        total: 0
    }

    constructor(props) {
        super(props);

        self = this;
        this.getPostMD(self, 'prologue')
        this.getToday(self)
    }

    getPostMD(_this, file) {
        request.get({uri:`http://localhost:4000/post/getPage/${urlencode(file)}`}, (err, res, body) => {
            _this.setState({inside : body, loading : null})
        });
    }

    getToday(_this) {
        request.get({uri:`http://localhost:4000/today/get`}, (err, res, body) => {
            body = JSON.parse(body)
            _this.setState({today : body.today, total : body.total})
        });
    }

    render() {
        const { inside, loading, today, total } = this.state;
        return (
            <div>
                {loading}

                <div className="hero-image1">
                    <div className="logo"></div>
                    <img alt = "true" src="http://localhost:4000/img/DA99B9E4-F95E-41D1-8442-8E8150733814.png"/>
                    
                    <div className="hero-today">
                        오늘 {today} · 전체 {total}
                    </div>

                    <div className="hero-text-main">
                        <h1>Fumesoft</h1>
                        <p>반도에 흔한 평범한 게임 개발자</p>
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