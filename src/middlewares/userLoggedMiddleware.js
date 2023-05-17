 const User= require('../database/models/User')

 function userLoggedMiddleware(req,res,next){

    res.locals.isLogged = false
    //  console.log('cookies desde el middleware:',req.cookies)
     let emailInCookie=req.cookies.userEmail
    //  let userFromCookie =  User.findAll({where:{name:'email'}})

    //  if(userFromCookie){
    //      req.session.userLogged = userFromCookie
    //  }

     if(req.session.userLogged){
         res.locals.isLogged=true
         res.locals.userLogged=req.session.userLogged
     }
    next()
}

module.exports=userLoggedMiddleware