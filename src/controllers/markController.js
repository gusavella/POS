const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require('express-validator')
const controller = {
    all: async (req, res) => {
        try{
            let marks=await db.Mark.findAll()
            res.render('marks/marks.ejs',{tittle:'Marcas',marks})
        }catch(e){
            console.log(e)
        }
    },
    create:async(req,res)=>{
        resultValidation = validationResult(req)
        let marks=await db.Mark.findAll()
        if (resultValidation.errors.length > 0){
            return res.render('marks/marks.ejs', {tittle : 'Marcas', marks,
                errors: resultValidation.mapped(),
            })
        }
        try{
           await db.Mark.create({name:req.body.name})
            res.redirect('/marks/all')
        }catch(e){
            console.log(e)
        }
      },
      update:async(req,res)=>{
        try{
            // console.log('paramsId:',req.params.id)
            // console.log(req.body)
            await db.Mark.update({name:req.body.name},
                {where:{
                        id:req.params.id
                        }
                })
            res.redirect('/marks/all')
        }catch(e){
            console.log(e)
        }
      },
      delete:async(req,res)=>{
        try{
           await db.Mark.destroy({where:{
            id:req.params.id
           }})
            res.redirect('/marks/all')
        }catch(e){
            console.log(e)
        }
      }
     

}

    module.exports=controller;