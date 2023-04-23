const { render } = require("ejs");
const fs = require("fs");
const path = require("path");




const controlador = {
  index: (req, res) => {
    res.render('products/main.ejs', {products:products,tittle:'Teca'});
  },
  best: (req,res) => {
    res.render('products/bestSelling.ejs', {products:products,tittle:'Teca'})
  },
  recommended: (req,res) => {
    res.render('products/recommended.ejs', {products:products,tittle:'Teca'})
  },
  offer: (req,res) => {
    res.render('products/offers.ejs', {products:products,tittle:'Teca'})
  },
  allProducts: (req,res) => {
    res.render('products/product.ejs', {products:products,tittle:'Teca'})
  }
};

module.exports = controlador;