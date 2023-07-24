// const express = require("express")
// const router = express.Router()

// router
//   .route("/:id")
//   .get((req, res) => {
//     console.log(req.user)
//     res.send(`Get User With ID ${req.params.id}`)
//   })
//   .put((req, res) => {
//     res.send(`Update User With ID ${req.params.id}`)
//   })
//   .delete((req, res) => {
//     res.send(`Delete User With ID ${req.params.id}`)
//   })


// module.exports = router




// Importing the module
const express=require("express")

// Creating express Router
const router=express.Router()

// Handling login request
router.get("/",(req,res,next)=>{
	res.send("This is the login request")
})
module.exports=router
