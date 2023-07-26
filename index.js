const express = require("express");
const app = express();
// const basicAuth = require('express-basic-auth')


app.get("/", (req, res) => {
    let songsList = ["That's Life", "Fly Me to the Moon", "My Way", "New York", "New York", "Strangers in The Night",
    "The Way You Look Tonight", "I've Got You Under My Skin", "Come Fly with Me", "You Make Me Feel so Young",
    "Somethin' Stupid", "Have Yourself a Merry Little Christmas", "Fly Me to the Moon", "The Best Is Yet to Come",
    "I'm a Fool to Want You", "Luck Be a Lady", "Love and Marriage", "Summer Wind", "Let Me Try Again",
    "It Had to Be You", "It Was a Very Good Year", "The Girl from Ipanema", "Blue Moon", "The Christmas Waltz", "I'll Be Home for Christmas", "The Coffee Song", "One for My Baby",
    "All or Nothing at All", "My Kind of Town", "The Lady Is A Tramp", "I Get a Kick Out of You"];
    let index = Math.floor(Math.random() * songsList.length);
    let song = songsList[index];
    res.send(song)
})

app.get("/birth_date", (req, res) => {
    res.send("<h1>Iyul 11, 2001</h1>");
})

app.get("/birth_city", (req, res) => {
    res.send("<h1>O'zbekiston, Qashqadaryo</h1>");
})

app.get("/about", (req, res) => {
    res.send("<h1>Men javascript python dasturchiman</h1>");
})

app.get("/picture", (req, res) =>{
    res.redirect('https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2,_Pal_Joey.jpg')
})

app.get("/public", (req, res) => {
    res.send("<h1>Bu sahifani hamma ko'rishi mumkin</h1>");
})

// app.get("/protected", (req, res) => {
//     res.send("Everybody can see this page");
// })
app.use("/protected", (req, res, next) => {
    const auth = {
      login: 'devlog',
      password: 'admin'
    }
    const [, b64auth = ''] = (req.headers.authorization || '').split(' ')
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (login && password && login === auth.login && password === auth.password) {
        res.send("<h1>Sizni saytda kurganimizdan! Xo'rsandmiz</h1>");
        return next()
    }
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('401 Not authorized')
  })

app.listen(8080, () =>{
    console.log("server started on 8080")
},'0.0.0.0')

// Program Explanation

/*  Birinchi qator server yaratish uchun zarur bo'lgan Express.js modulini import qiladi.

Keyingi satr "ilova" o'zgaruvchisida saqlanadigan Express.js ilovasining namunasini yaratadi.

Quyidagi satr asosiy autentifikatsiya uchun ishlatiladigan ekspress-basic-auth paketini import qiladi

Keyinchalik, har biri boshqa yo'lga va mos keladigan qayta qo'ng'iroq funksiyasiga ega bo'lgan bir nechta "app.get()" marshrutlari aniqlangan.

Mijoz "/" marshruti uchun GET so'rovini qilganda, qo'shiqlar qatoridan tasodifiy qo'shiq tanlanadi va javob sifatida yuboriladi.
"/birth_date" marshruti javob sifatida 1915 yil 12 dekabrni yuboradi
"/birth_city" javob sifatida Nyu-Jersi shtatining Hoboken shahrini yuboradi
"/xotinlar" javob sifatida Nensi Barbato, Ava Gardner, Mia Farrou va Barbara Marksni yuboradi.
"/rasm" Frank Sinatra tasviriga yo'naltiradi
"/public" javob sifatida "Bu sahifani hamma ko'rishi mumkin" ni yuboradi
Keyinchalik, sharhlangan "/protected" marshruti mavjud, ammo asosiy autentifikatsiya mantig'i mavjud. Bu erda u login va parol hisob ma'lumotlarining sarlavhada mavjudligini tekshiradi va uni oldindan belgilangan hisobga olish ma'lumotlari bilan moslashtiradi. Muvaffaqiyatli bo'lsa, javob sifatida "Xush kelibsiz, autentifikatsiya qilingan mijoz" xabarini yuboradi va mijozga keyingi yo'nalishga o'tish imkonini beradi. Agar yo'q bo'lsa, javob sifatida "401 ruxsat berilmagan" xabarini yuboradi

Nihoyat, server 8080 portni tinglash uchun o'rnatiladi va serverni ishga tushiradi. */