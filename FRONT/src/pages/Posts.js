import React, { Component } from 'react';
import '../css/Posts.css'
import '../css/github-markdown.css'

const request = require('request');
const Markdown = require('markdown-it')
const urlencode = require('urlencode');
const markdown = new Markdown();

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
        list : [],
        temp : '',
        inside : '',
        postCountMax : 0,
        postCountNow : -1,
        postPageNow : 0,
        postPageCount : 6,
        postFile : 'main',
        loading : false
    }

    // Function init
    getPostList(_this) {
        // 리스트를 읽어옴
        request.get({uri:"http://localhost:4000/post/list"}, (err, res, body) => {
            body = JSON.parse(body);
            body.sort((a, b) => {
                return new Date(b.time) - new Date(a.time);
            });
            _this.setState({list : body, postCountMax : body.length })
            // params 로 글 제목을 받아옴
            if (_this.props.match.params.id !== undefined) {
                var getIndex = -1;

                body.forEach((element, index)=>{
                    if (element.file === _this.props.match.params.id) {
                        getIndex = index;
                        _this.setState({postPageNow: Math.floor(getIndex/5)})
                    }
                });

                if (getIndex !== -1) {
                    _this.getPostMD(_this, _this.state.list[getIndex].file, getIndex);
                } else {
                    _this.getPostMD(_this, _this.state.list[0].file, 0);
                }
            } else {
                _this.getPostMD(_this, _this.state.list[0].file, 0);
            }
        });
    }

    getPostMD(_this, file, i) {
        _this.setState({loading : (<div className="loading">Loading&#8230;</div>)})
        request.get({uri:`http://localhost:4000/post/get/${urlencode(file)}`}, (err, res, body) => {
            _this.setState({inside : body, postFile : file, postCountNow: i, loading : null})
        });
    }

    pagination() {
        var data = [];
        for (let i = 0; i < Math.ceil(this.state.postCountMax/this.state.postPageCount); i++) {
            var classType = "non-active"
            if (i === this.state.postPageNow)
                classType = "active"
            
            data.push(<span className={classType} key={`paginationKey${i}`} onClick={_=>{this.paginationClick(i)}}>{i+1}</span>)
        }
        
        return (
            <div className="pagination">
            {data}
            </div>
        );
    }

    paginationClick(index) {
        this.setState({postPageNow: index})
    }

    timeFormatChange(time) {
        time = new Date(time);
        return `${time.getFullYear()}. ${this.stringPadding(time.getMonth()+1, '0', 2)}. ${this.stringPadding(time.getDate(), '0', 2)}-${this.stringPadding(time.getHours(), '0', 2)}:${this.stringPadding(time.getMinutes(), '0', 2)}`
    }

    stringPadding(str, substring, len) {
        str = String(str);
        var tempLen = len - str.length;
        return substring.repeat(tempLen) + str;
    }

    // Render
    render() {
        const { list, inside, postCountMax, postCountNow, postPageNow, postPageCount, loading } = this.state;

        return (
            <div>
                {loading}

                <div className="postListBackground">
                <div className="postListTitle">
                    글 제목 ({postCountMax})
                    <div className="postListRight">작성일</div>
                    <hr/>
                </div>
                <ul className="postList" key='postList'>
                    {
                        list.map((data, i) => {
                            //var positionOfIndex = Math.floor(postCountNow/5)*5;
                            if (i >= postPageNow*postPageCount && i < postPageNow*postPageCount+postPageCount) {
                                if (i === postCountNow) {
                                    return (
                                        <li className="active" key = {`postList${i}`}>
                                        {replaceAll(data.file, '_', ' ')}
                                        <div className="postListRight">
                                        {this.timeFormatChange(data.time)}
                                        </div>
                                        </li>
                                    )
                                }

                                return (
                                    <li key = {`postList${i}`} onClick={_=>{this.getPostMD(this, list[i].file, i)}}>
                                        {replaceAll(data.file, '_', ' ')}
                                        <div className="postListRight">
                                        {this.timeFormatChange(data.time)}
                                        </div>
                                    </li>
                                )
                            }
                            return (null);
                        })
                    }
                </ul>
                {this.pagination()}
                </div>

                {/* MD -> HTML rendering */}
                <article className = "markdown-body">
                <div dangerouslySetInnerHTML = {{__html: replaceAll(markdown.render(inside), 'img src="..', 'img src="http://rhea31.duckdns.org:4000')}}/>
                </article>
            </div>
        );
    }
}

export default App;