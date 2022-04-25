import express from 'express';
const router = express.Router();
let users= [];
router.post('/login', (req,res) => {

    //1
    const fn = req.body.name;
    const ln = req.body.lastname;

    //2
    const {name,lastname} = req.body;

    return res.status(200).json({
        message: `Hello ${name} ${lastname}`
    })
})

router.post('/register', async(req,res) => {
    // const name = req.body.fname +' '+ req.body.lname;
    // const email=req.body.email;
    const {fname,lname,email}=req.body;
    const check = users.filter(x => x.email==email)
    if (check.length > 0)
    {
        return res.status(200).json({
             message: 'the email in use'
        })
    }else{
    const user ={fname:fname,lname:lname,email:email}
    users.push(
        user
    )
    return res.status(200).json({
        users:users       
    })
}
})
export default router;