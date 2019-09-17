import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Card.css'
import '../css/Posts.css'
import '../css/github-markdown.css'

const request = require('request');
const urlencode = require('urlencode');

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

class App extends Component {
    // counstructor init
    constructor(props) {
        super(props);
        this.getPostList(this);
    }

    // State init
    state = {
        list: [],
        temp: '',
        inside: '',
        postCountMax: 0,
        postCountNow: -1,
        postPageNow: 0,
        postPageCount: 12,
        postFile: 'main',
        cardRendered: '',
        loading: (<div className="loading">Loading&#8230;</div>)
    }

    // Function init
    getPostList(_this) {
        // 리스트를 읽어옴
        request.get({ uri: "http://localhost:4000/post/list" }, (err, res, body) => {
            body = JSON.parse(body);
            body.sort((a, b) => {
                return new Date(b.time) - new Date(a.time);
            });
            _this.setState({ list: body, postCountMax: body.length, loading: null})
            _this.cardRender(_this, 0)
        });
    }

    getPostMD(_this, file) {
        return new Promise((resolve, reject) => {
            request.get({ uri: `http://localhost:4000/post/get/${urlencode(file)}` }, (err, res, body) => {
                resolve(body.split('\n')[2]);
            });
        });
    }
    
    getPostMDImage(_this, file) {
        return new Promise((resolve, reject) => {
            request.get({ uri: `http://localhost:4000/post/get/${urlencode(file)}` }, (err, res, body) => {
                var get;
                try {
                    get = body.split('../img/')[1].split(')')[0];
                } catch(e) {
                    get = 'BB04A8E1-8E2A-49D1-B68A-2E73D675FC7B.jpeg'
                }
                resolve(`http://localhost:4000/img/${get}`);
            });
        });
    }

    pagination() {
        var data = [];
        for (let i = 0; i < Math.ceil(this.state.postCountMax / this.state.postPageCount); i++) {
            var classType = "non-active"
            if (i === this.state.postPageNow)
                classType = "active"

            data.push(<span className={classType} key={`paginationKey${i}`} onClick={_ => { this.paginationClick(i) }}>{i + 1}</span>)
        }

        return (
            <div className="pagination">
                {data}
            </div>
        );
    }

    paginationClick(index) {
        this.setState({ postPageNow: index, loading:(<div className="loading">Loading&#8230;</div>)})
        this.cardRender(this, index)
    }

    timeFormatChange(time) {
        time = new Date(time);
        return `${time.getFullYear()}. ${this.stringPadding(time.getMonth() + 1, '0', 2)}. ${this.stringPadding(time.getDate(), '0', 2)}`
    }

    stringPadding(str, substring, len) {
        str = String(str);
        var tempLen = len - str.length;
        return substring.repeat(tempLen) + str;
    }

    async cardRender(_this, index) {
        var data = [];
        for (var i = index*_this.state.postPageCount; i < Math.min(_this.state.postCountMax, index*_this.state.postPageCount+_this.state.postPageCount); i++) {
            data.push(
                <NavLink key={`navlink_random2${i}`} className="PostPageListButton" to={`/posts/${_this.state.list[i].file}`}>
                <div className="postCard">
                    <span className="postCardTime">
                    {_this.timeFormatChange(_this.state.list[i].time)}
                    </span>
                        <img className="postCardImg" alt="true" src={`${await _this.getPostMDImage(_this, _this.state.list[i].file)}`} />
                        <span className="postCardTitle">
                        <span className="postCardBold">
                            {replaceAll(_this.state.list[i].file, '_', ' ')}
                        </span><br></br>
                        <span className="postCardIndex">
                            {await _this.getPostMD(_this, _this.state.list[i].file)}
                        </span>
                    </span>
                </div>
                </NavLink>
            )
        }
    
        _this.setState ({cardRendered : (<div className="postCards">{data}</div>), loading: null});
    }

    // Render
    render() {
        const { list, cardRendered, postCountMax, postCountNow, postPageNow, postPageCount, loading } = this.state;

        return (
            <div>
                {loading}

                <div className="postListBackground">
                    <div className="postListTitle">
                        글 제목 ({postCountMax})
                    <div className="postListRight">작성일</div>
                        <hr />
                    </div>
                    <ul className="postList" key='postList'>
                        {
                            list.map((data, i) => {
                                //var positionOfIndex = Math.floor(postCountNow/5)*5;
                                if (i >= postPageNow * postPageCount && i < postPageNow * postPageCount + postPageCount) {
                                    if (i === postCountNow) {
                                        return (
                                            <li className="active" key={`postList${i}`}>
                                                {replaceAll(data.file, '_', ' ')}
                                                <div className="postListRight">
                                                    {this.timeFormatChange(data.time)}
                                                </div>
                                            </li>
                                        )
                                    }

                                    return (
                                        <NavLink key={`navlink_random${i}`} className="PostPageListButton" to={`/posts/${list[i].file}`}>
                                            <li key={`postList${i}`}>
                                                {replaceAll(data.file, '_', ' ')}
                                                <div className="postListRight">
                                                    {this.timeFormatChange(data.time)}
                                                </div>
                                            </li>
                                        </NavLink>
                                    )
                                }
                                return (null);
                            })
                        }
                    </ul>
                    {this.pagination()}
                </div>

                <div className="upMarginCard"></div>
                {cardRendered}
                <div className="downMarginCard"></div>
            </div>
        );
    }
}

export default App;