const express = require("express");
const app = express();
const request = require("request");
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
});

// key 
// key id   
app.post("/",(req,res)=>{
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.inputEmail;
    
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName       
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);
    var options = {
        url: `https://us1.api.mailchimp.com/3.0/lists/1387f9d576/${process.env.MAILCHIMP_KEY_ID}`,
        method: "POST",
        headers: {
            "Authorization": `mdfaiz ${process.env.MAILCHIMP_KEY}`
        },
        body: jsonData
    }
    request(options,(error,response,body)=>{
        if(error){
            console.log(error);
        }else{
            if(response.statusCode === 200)
            res.sendFile(__dirname + "/success.html");
            else{
                res.sendFile(__dirname + "/failure.html")
            }
        }
    });
});
app.post("/failure",(request,response)=>{
    response.redirect("/");
});
app.listen(process.env.PORT || 3000);