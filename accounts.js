import express from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();


let users= [];



router.post('/login', (req,res) => {
    const {email,password}=req.body;
    const find= users.find(x => x.email == email)
    if (find)
    {
        const match = await bcryptjs.compare(password,find.password);
        if (match)
        {
            return res.status(200).json({
                message:`hello ${find.name}`
            })
        }
        else
        {
            return res.status(200).json({
                message:`password not match`
            })
        }
    }
})



router.post('/register', async(req,res) => {
    // const name = req.body.fname +' '+ req.body.lname;
    // const email=req.body.email;
    const {fname,lname,email,password}=req.body;
    const check = users.filter(x => x.email==email)
    if (check.length > 0)
    {
        return res.status(200).json({
             message: 'the email in use'
        })
    }else{

        const hash = await bcryptjs.hash(password,10)

    const user ={fname:fname,lname:lname,email:email,password:hash}
    users.push(
        user
    )
    return res.status(200).json({
        users:users       
    })
}
})


export default router;