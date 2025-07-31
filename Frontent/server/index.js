// import helmet from "helmet";
// const helmet = require('helmet');
const express = require('express')

const PORT = 50001
const HOST = '0.0.0.0'

const app = express()
app.use('/', express.static(__dirname + '/dist'))

// app.get('/api/my/ip', (req, res) => {
//   res.send(req.ip);
// });

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

app.disable('x-powered-by') // Express 사용 정보 숨기기
// app.use(
//   helmet({
//     // xContentTypeOptions: false, // 클릭재킹으로 부터 보호, 기본적으로 셋팅
//     xFrameOptions: { action: "deny" }, // 선언된 콘텐츠 유형으로부터 벗어난 응답에 대한 브라우저의 MIME 가로채기를 방지
//   }),
// );
// app.use(helmet.frameguard("deny")); // 클릭재킹으로 부터 보호
// app.use(helmet.noSniff()); // 선언된 콘텐츠 유형으로부터 벗어난 응답에 대한 브라우저의 MIME 가로채기를 방지

app.listen(PORT, HOST)
// app.listen(PORT, function() {
//   console.log(`application is listening on port ${PORT}...`)
// });
