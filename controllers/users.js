const User = require('../models/user')
const flash = require('connect-flash')

module.exports.renderRegister = async (req, res) => {
    res.render('users/register')
}

module.exports.register = async (req, res) => {
    try{
        const { username, email, password } = req.body
        const user = new User({ username, email })
        const newUser = await User.register(user, password)
        req.login(newUser,err => {
            if(err) return next(err)
            req.flash('success', 'Welcome to campgrounds')
            res.redirect('/campgrounds')
        })
    }catch(e) {
        req.flash('error',e.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = async(req,res)=>{
    res.render('users/login')
}

module.exports.login = async(req,res) => {
    req.flash('success','Welcome back')
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    delete res.locals.returnTo
    res.redirect(redirectUrl)
}

module.exports.logout = (req,res,next)=>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        req.flash('success','goodbye!!')
        res.redirect('/campgrounds')
    })
}