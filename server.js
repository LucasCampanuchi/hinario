const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'public/index.html');
});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);
    socket.on('sendMessage', function(data) {
        messages.push(data);
        console.log('passando aqui')
        console.log(data)
        socket.emit('receivedMessage', data);
    })
});

server.listen(3000)
