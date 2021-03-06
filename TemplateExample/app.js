const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const router = require('./app_server/routes/index')
const hbs = require('handlebars')

app.use('/', router)

//Set the view engine
app.engine('hbs', exphbs.engine({
    defaultLayout:'main',
    extname:'.hbs',
    helpers:{
        getShortComment(comment){
            if(comment.length < 60){
                return comment
            }
            return comment.substring(0,60)+'...'
        },

        formatPhoneNumber(phonenumber){
            if(phonenumber){
                let phone = phonenumber.toString()
                return "(" + phone.substring(0,3) + ") " + phone.substring(3,6) + "-" + phone.substring(6,10)
            }
        },

        makeBold(address){
            return new hbs.SafeString("<strong>" + address + "</strong>")
        },

        formatEmail(email){
            return new hbs.SafeString(`<a href="mailto:${email}">${email}</a>`)
        },

        upperCaseWord(word){
            if(word){
                return word.toUpperCase()
            }
        },
        getNumber(num){
            //let getNum = num
            //if(getNum == 3){
           //     console.log("Numbers: " + getNum)
                
           // }
            //return getNum

            //return new new hbs.registerHelper('getNumber', function(num, options) {
             //   if(num === 3) {
             //       console.log("number = 3")
              //      return options.fn(this);
               // }
              //  return options.inverse(this);
              //  }); 

            if(num == 3) {
                console.log("number = 3")
                return num
            }
        }

    }
}))



app.set('view engine', 'hbs')

//route to render the page
app.get('/',(req,res)=>{
    res.render('home', {
        post:[
            {
                author:"Schooly D",
                image:"https://picsum.photos/500/500",
                comments:['comment 1', 'comment 2', 'Eiusmod occaecat nostrud excepteur anim velit reprehenderit officia sunt nostrud incididunt. Ea commodo qui deserunt ea pariatur mollit non quis Lorem sint est qui labore aliquip. Eiusmod excepteur elit veniam quis quis officia.']
            },
            {
                author:"Jordan D",
                image:"https://picsum.photos/500/500?2",
                comments:[]
            },
            {
                author:"Terry B",
                image:"https://picsum.photos/500/500?3",
                comments:['yo this is awesome', 'Proident qui tempor aute Lorem culpa Lorem do labore cillum veniam veniam veniam commodo cupidatat. Et nisi anim veniam eiusmod fugiat labore ad minim. Quis anim esse fugiat ullamco non.', 'this is the best']
            },
        ]
    })
})



//set up port for connection
app.listen(3000, ()=>{
    console.log("Connected on port 3000")
})