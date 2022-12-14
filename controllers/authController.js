import { StatusCodes } from 'http-status-codes'
import User from '../models/User.js'
import {BadRequestError} from '../errors/index.js'

const register = async (req, res) => {
    const {name,email,password} = req.body

    // if any field is empty
    if(!name || !email || !password) {
        throw new BadRequestError('please provide all values')
    }
    // find duplicate email
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists) {
        throw new BadRequestError('Email already in use')
    }

    const user = await User.create({name, email, password})
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user, token})
}

const login = async (req, res) => {
    res.send('login user')
}

const updateUser = async (req, res) => {
    res.send('update user')
}

export {register, login, updateUser}