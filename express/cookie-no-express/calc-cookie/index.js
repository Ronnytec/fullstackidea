const path = require('path')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 7017
const bodyPareser = require('body-parser')

app.use(cookieParser())
app.use(bodyPareser.urlencoded({extends: true}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/',(req, res) => {
    let contas = []
    if ('contas' in req.cookies){
        contas= req.cookies.contas
    }
  res.render('index',{
      contas
}
  )
})

app.post('/calc', (req,res) => {
    let {num1, num2,op} =req.body
    num1=parseInt(num1)
    num2=parseInt(num2)
    let total ="" 
    if(op==='+'){
        total = num1+num2
    }else if(op==='-'){
        total = num1-num2
    }else if(op==='*'){
        total = num1*num2
    }else if(op==='/'){
        total = num1/num2
    }
    let contas = []
    if('contas' in req.cookies){
        contas = req.cookies.contas
    }
    contas.push({
        num1, num2, op, total
    })

    res.cookie('contas',contas,{maxAge: 10000})
    res.redirect('/')
})

app.listen(port, () => console.log('Server Its Running...on Port:',port))

