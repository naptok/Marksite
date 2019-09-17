# [introduction](http://github.com/liber31/introduction)

## Starting / 시작할때

시간이 늘 부족한 나는 가볍고, 빠르며, 개발하는데에 있어서 무리가 없는 선에서 나를 소개할 수 있는 나만의 사이트를 만들어보고 싶었다.  

그렇게 후보로 뽑은 것들은 다음과 같다.  

* nodeJS
* Go
* Python  

Go 는 내가 처음 접해보는 언어라 짧은 시간내에 홈페이지를 만든다는 것은 굉장한 무리와 불가능이므로 패스.  

Python 은 내 코딩 스타일과 잘 맞지 않아 평소에도 기피하던 언어라 패스.  

답은 **nodeJS** 다..! 

근데 무작정 만드려고 하다보니 너무 막막하다💦  

그럴듯한 웹을 만들어보는 건 이번이 처음이라 그런지 뭘 어떻게 해야할지 전혀 감이 안옴.  



## Searching / 사전 조사

무엇이 되었든 시작하기 전에 미리 조사를 해본다는 것은 정말 좋은 행위이다.

nodeJS 로 만들기로 정했으니 이를 바탕으로, "어떤 모듈과 프레임워크를 이용하여 만들면 될지" 와 "웹 사이트 디자인은 어떻게 할지"를 알아보기 시작했다. 

이번에 만들 웹 개발에 할여한 시간은 대략 4시간 정도여서, 이전에 사용해본 친구을 쓰는게 좋을 것 같다.

* Express
* Markdown
* serve-favicon
* github-markdown-css

Express 로 기본적인 웹 서비스를 구축하고, Markdown 를 이용하여 md 문서들을 html 문서들로 변환,  
css 파일로 디자인을 하면 쉽게 끝날 것 같다는 생각에 위 라인업을 구성하였다.



## Development / 개발

* Project
  * README.md
  * .git
  * /source
    * /img
    * /post
    * 404.html
    * footer.html
    * about.md
    * contact.md
    * prologue.md
    * github-markdown.css
    * main.js

먼저 프로젝트 폴더 구성을 기획해보았다.  

* Prologue
* Posts
* Contact
* About

메뉴에는 총 4개의 카테고리가 들어가도록 설계하였다.  
각각의 카테고리는 각각의 .md 문서를 가지고 있으며 Posts 카테고리만 따로 다수의 .md 문서를 가지고 있는 형식이다.

```html
// HTML preset
var head = `<head><title>Fumesoft</title><meta name="viewport" content="width=device-width, initial-scale=1"><link href="/github-markdown.css" rel="stylesheet"></head>`
```

이 프로젝트에서는 다른 프론트엔드 프레임워크를 전혀 사용하고 있지 않기 때문에, html 과 css 를 직접 구성해서 사용자에게 넘겨주어야한다.

그렇기 때문에, 위처럼 미리 html 문서 프리셋을 만들어두고 모든 router 에서 이를 공유하며 사용한다.



### Navigation / 메뉴바

#### HTML

```javascript
// Get html sources
function LoadHTML (type) {
  switch (type) {
    case 'post':
      // #region inside
      navigation = `
      <ul class="topnav">
      <li><a href="/">Prologue</a></li>
      <li><a class="active" href="/post/main.md">Posts</a></li>
      <li><a href="/contact">Contact</a></li>
      <li class="right"><a href="/about">About</a></li>
      </ul>
      `
      // #endregion
      break

    case 'prologue':
      // #region inside
      navigation = `
      <ul class="topnav">
      <li><a class="active" href="/">Prologue</a></li>
      <li><a href="/post/main.md">Posts</a></li>
      <li><a href="/contact">Contact</a></li>
      <li class="right"><a href="/about">About</a></li>
      </ul>
      `
      // #endregion
      break

    case 'contact':
      // #region inside
      navigation = `
      <ul class="topnav">
      <li><a href="/">Prologue</a></li>
      <li><a href="/post/main.md">Posts</a></li>
      <li><a class="active" href="/contact">Contact</a></li>
      <li class="right"><a href="/about">About</a></li>
      </ul>
      `
      // #endregion
      break

    case 'about':
      // #region inside
      navigation = `
      <ul class="topnav">
      <li><a href="/">Prologue</a></li>
      <li><a href="/post/main.md">Posts</a></li>
      <li><a href="/contact">Contact</a></li>
      <li class="right"><a class="active" href="/about">About</a></li>
      </ul>
      `
      // #endregion
      break
  }
}
```

현재 router 에서 어떤 페이지를 보고 있는지를 argument 값으로 받아와 switch 문으로 알맞는 데이터를 돌려준다.

#### CSS

```css
ul.topnav {
  font-family: octicons-link;
  font-size: 14px;
  list-style-type: none;
  margin: 0px auto;
  border: 0px;
  padding: 0;
  padding-left: 10px;
  overflow: hidden;
  background-color: #333;
  left:0px;
  top:0px;
  position: fixed;
  width:100%;
}

ul.topnav li {float: left;}

ul.topnav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 10px 12px;
  text-decoration: none;
}

ul.topnav li a:hover:not(.active) {background-color: #111;}

ul.topnav li a.active {background-color: #4CAF50;}

ul.topnav li.right {float: right; padding-right: 10px;}

.MarginOfNavigation {
  height: 38px;
}

@media screen and (max-width: 767px) {
  ul.topnav li.right, 
  ul.topnav li {float: none; padding-right: 0px; }
  ul.topnav { padding-left: 0px; position: relative; }
  .MarginOfNavigation { height: 0px; }
}
```

곧 이어 css 디자인을 한다.

짙은 회색 검은 바에 초록색 버튼을 가로로 배열하는 형식으로 만들었는데, 모바일에도 대응을 해야하기에 일정 수준 이하로 윈도우 가로 길이가 줄어들때 세로로 재배열하는 기능도 추가하였다.

```css
position:fixed;
```

navigation 바의 위치를 고정시키기 위해서 위 코드를 사용해보니, 다른 객체들이 navigation 바가 처음부터 따로 떨어져 행동하는 것처럼 위로 공간을 당겨버려서 이를 해결하기 위해 야매로

```css
.MarginOfNavigation {
  height: 38px;
}
```

navigation 바 밑에 마진을 주는 용도의 개체를 두고 다른 개체들을 밀어버리도록 하여 해결하였다.



### Prologue / 머릿말

```javascript
// Prologue router
app.get('/', (req, res) => {
})
```

사이트에 접속하면 가장 먼저 보이게 할 페이지는 **prologue.md** 이기에, **/** 위치에 prologue.md 를 연결한다.

다음으로 해야할 것은 .md 문서를 html 문서로 변환한 위에서 미리 만들어둔 프리셋과 섞어서 클라이언트에 보내주는 것이다.

* markdown
* markdown-it

이 때문에 .md 문서를 html 문서로 변환해주는 모듈을 2개 사용해보았는데, markdown 과 markdown-it 둘다 문제 없이 대체로 잘 작동하였지만 특수한 경우에서 몇몇 부분 변환이 이상하게 되는 markdown 모듈은 거르고 markdown-it 모듈을 사용하기로 결정했다.

```javascript
const Markdownit = require('markdown-it')
var markdown = new Markdownit()
markdown.render('.md file string data')
```

.md 를 html로 변환하는건 예상외로 정말 간단했다.

모듈을 들고 온 다음 render 함수를 이용하여 변환 끝. 이제 변환된 데이터를 어떻게 잘 조합하여 웹 클라이언트로 뿌려줄지가 문제가 된다.

```javascript
// GET Navigation data
LoadHTML('prologue')

// Send "prologue.md"
fs.readFile(path.join(__dirname, '/prologue.md'), 'utf8', (error, data) => {
  if (error) {
    // 에러가 났을 경우를 대비
  	res.writeHead(400, { 'content-Type': 'text/html; charset=utf-8' })
    res.end(notfound)
  } else {
    // HTML START --
    html = '<html>'
    html += head
    
    // Body Start --
    html += '<body>'
    html += navigation
    html += '<div class="MarginOfNavigation"></div>'
    html += `<article class="markdown-body">${markdown.render(data)}</article>`
    html += '</body>'

    // Footer Start --
    html += `<footer>${footer}</footer>`

    // HTML END --    
    html += '</html>'

    res.writeHead(200, { 'content-Type': 'text/html; charset=utf-8' })
    res.end(html)
  }
})
```

fs 모듈을 이용하여 프롤로그 문서를 불러 온 다음 html 로 변환. 이후 미리 만들어 둔 프리셋과 조합한다.

### Posts / 글들

#### Post list

```javascript
function LoadPost () {
  var ev = fs.readdirSync(path.join(__dirname, '/post'))
  var text = ''
  for (var i = 0; i < ev.length; i++) {
    var file = ev[i]
    if (file.replace(/.*\./gi, '') === 'md') {
      text += `<li><a href="${path.join('/post/', file)}">└ ${file.split('.md')[0]}</a></li>`
    }
  }
  return text
}
```

post 폴더 속 다수의 .md 문서들이 있는 구조이고, 이를 리스트로 정리한 다음 보여주어야 하기 때문에 fs 모듈의 readdirSync 함수를 이용하여 문서 데이터를 전부 들고온 후 html 태그로 변환한다.

```html
// Body Start --
html += '<body>'
html += navigation
html += '<div class="MarginOfNavigation"></div>'
html += `<a class="post" onclick="this.nextSibling.style.display=(this.nextSibling.style.display=='none')?'block':'none';" href="javascript:void(0)"> 글 목록<br/></a><div style="DISPLAY: none"><ul class="post">`
html += `${LoadPost()}</ul></div><hr class="post"/><article class="markdown-body">${markdown.render(data)}</article>`
html += '</body>'
```

변환된 데이터를 body 태그에 추가한다.

#### Post routing

```javascript
// -- img
localhost:8080/img/a.png
localhost:8080/img/favicon.ico

// -- post
localhost:8080/post/main.md
localhost:8080/post/development.md

// ------------------------------------

// Post router
app.get('/post/*', (req, res) => {
  // 코드
})

// Image router
app.get('/img/*', (req, res) => {
  // 코드
})
```

img와 post 폴더 내에 있는 모든 파일들은 위 주소를 통해 접근할 수 있도록 라우팅 처리를 한다.

위에서도 나온 코드이기 때문에 설명은 생략한다.



### Contact, About

Prologue 와 동일하게 각각 해당되는 .md 문서를 로드하도록 만들었다.



## After / 만든 이후

매우 가볍고, 간단하며, 심플한 웹 홈페이지를 가질 수 있게 되어 정말 기분이 좋았다.

근데, 매번 서버에 있는 .md 문서를 수정하고 커밋을 올린 다음, 서버에서 풀링하고 실행하기에는 너무 귀찮음이 강렬했다.

그래서, 커밋을 날리면 자동으로 풀링을 하여 서버에 실시간으로 반영하는 기능을 만들었다. - [HotReload](https://github.com/liber31/HotReload)

### Structure of HotReload

```javascript
const http = require('http')
const url = require('url')
const exec = require('child_process').exec

http.createServer((req, res) => {
  var pathname = url.parse(req.url).pathname
	if (pathname !== '/favicon.ico') {
		fs.stat(`./Git/${repo}`, err => {
      if (!err) {
        // 존재하는 레퍼지토리
        exec(`git pull`, { cwd: `./Git/${repo}` }, (err, stdout, stderr) => {
          if (err) {
            console.log(err)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ 'success': true }))
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ 'success': true }))
          }
        })
      } else if (err.code === 'ENOENT') {
        // 존재하지 않는 레퍼지토리
        exec(`git clone https://github.com${pathname.split(':')[0]}`, { cwd: `./Git` }, (err, stdout, stderr) => {
          if (err) {
            console.log(err)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ 'success': true }))
          } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ 'success': true }))
          }
        })
      }
    })
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ 'success': true }))
  }
}).listen(port);
```

http, exec, url 모듈들을 이용하여 간단한 API server 를 구성하였음. http://localhost:post/repository 로 리퀘스트를 날리게 되면, 자동으로 풀링되어 데이터를 최신으로 유지하는 형식.

GitHub의 WebHook에서 위 링크를 등록시킨 후, 테스트하니 전부 매끄럽게 동작하였다..!

forever start main.js 로 웹 서버를 실행시키고 커밋될때마다 자동 풀링되도록 하니, 기존의 번거로움이 사라져 매우 행복했음.

