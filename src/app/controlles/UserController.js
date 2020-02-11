import * as Yup from 'yup'
import User from '../models/User'

class UserController {
  async store(req, res) { 
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required().min(6)
    })

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validate fails'})
    }

    const userExists = await User.findOne({ where: {email: req.body.email} });

    if(userExists) {
      return res.status(400).json({error: "User alredy exist." })
    }

    const {id, name, email, providers} = await User.create(req.body)

    return res.json({
      id, 
      name,
      email,
      providers
    })
  }
  
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string(),
      oldpassword: Yup.string().min(6),
      password: Yup.string().min(6)
        .when('oldpassword', (oldpassword, field)=>
          oldpassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field)=>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    })

    if(!(await schema.isValid(req.body))) {
      return res.status(400).json({error: 'Validate fails'})
    }

    const {email, oldpassword} = req.body

    const user = await User.findByPk(req.userId)

    if(email && email != user.email) {
      const userExists = await User.findOne({ where: {email} });

      if(userExists) {
        return res.status(400).json({error: "User alredy exist." })
      }
    }

    if(oldpassword && !(await user.checkPassword(oldpassword))) {
      return res.json({error:"Password does not match"})
    }

    const {id, name, providers} = await user.update(req.body)
    
    return res.json({
      id, 
      name,
      email,
      providers
    })
  }
}

export default new UserController();