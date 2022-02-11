import express from 'express'
import { comparePassword, hashPassword } from '../helpers/bcrypt.helper.js'
import {
  sendEmailVerificationConfirmation,
  sendEmailVerificationLink,
} from '../helpers/email.helper.js'
import { getJWTs } from '../helpers/jwt.helper.js'
import { isUser } from '../middlewares/auth.middleware.js'
import {
  loginUserFormValidation,
  userEmailVerificationValidation,
} from '../middlewares/formValidation.middleware.js'
import {
  createUniqueEmailConfirmation,
  deleteInfo,
  findUserEmailVerification,
} from '../models/Pin/Pin.model.js'
import { removeSession } from '../models/Session/Session.model.js'
import {
  createUser,
  getUserByUsername,
  removeRefreshJWT,
  verifyEmail,
} from '../models/User/User.model.js'

const userRouter = express.Router()

// CREATE NEW USER
userRouter.post('/register', async (req, res) => {
  try {
    //encrypt password
    const hashPass = hashPassword(req.body.password)

    if (hashPass) {
      req.body.password = hashPass

      const { _id, firstName, email } = await createUser(req.body)

      if (_id) {
        // create unique activation link
        const { pin } = await createUniqueEmailConfirmation(email)

        if (pin) {
          // email the link to the new user email
          const forSendingEmail = {
            firstName,
            email,
            pin,
          }
          sendEmailVerificationLink(forSendingEmail)
        }
        return res.json({
          status: 'success',
          message:
            'New user has been successfully created. We have sent an email confirmation to your email, please check and follow the instructions to verify and activate your account',
        })
      }
    }
    res.json({
      status: 'error',
      message: 'Unable to create new user. Please try again later',
    })
  } catch (error) {
    let msg = 'Error, Unable to create new user'
    console.log(error.message)
    if (error.message.includes('E11000 duplicate key error collection')) {
      msg = 'Error, an account already exists for this email address'
    }
    res.json({
      status: 'error',
      message: 'Unable to create new user',
    })
  }
})

//email verification
userRouter.patch(
  '/email-verification',
  userEmailVerificationValidation,
  async (req, res) => {
    try {
      const result = await findUserEmailVerification(req.body)

      if (result?._id) {
        //information is valid now we can update the user
        const data = await verifyEmail(result.email)
        console.log(data)
        if (data?._id) {
          // delete the pin info
          deleteInfo(req.body)

          // send email confirmation to user
          sendEmailVerificationConfirmation({
            firstName: data.firstName,
            email: data.email,
          })

          return res.json({
            status: 'success',
            message: 'Your email has been verified. You may now log in.',
          })
        }
      }
      res.json({
        status: 'error',
        message:
          'Unable to verify your email. The link is either invalid or expired.',
      })
    } catch (error) {
      console.log(error)
      res.json({
        status: 'error',
        message: 'Error, Unable to verify the email. Please try again later.',
      })
    }
  },
)

//USER LOGIN
userRouter.post('/login', loginUserFormValidation, async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await getUserByUsername(username)

    if (user?._id) {
      // Check if password is valid or not

      const isPasswordMatch = comparePassword(password, user.password)

      if (isPasswordMatch) {
        // GET JWTs tHEN SEND TO CLIENT
        const jwts = await getJWTs({ _id: user._id, username: user.username })
        user.password = undefined

        return res.json({
          status: 'success',
          messsage: 'Login successful',
          jwts,
          user,
        })
      }
    }
    res.status(401).json({
      status: 'error',
      messsage: 'Unauthorized',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'error',
      message: 'Error, unable to login at the moment. Please try again later',
    })
  }
})

// user logout
userRouter.post('/logout', async (req, res) => {
  try {
    const { accessJWT, refreshJWT } = req.body
    accessJWT && (await removeSession(accessJWT))
    refreshJWT && (await removeRefreshJWT(refreshJWT))

    res.json({
      status: 'success',
      message: 'Logging out...',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'error',
      message: 'Error, unable to Logout, Please try again later.',
    })
  }
})

// Get user info
userRouter.get('/', isUser, (req, res) => {
  res.json({
    statur: 'success',
    message: 'User Profile',
    user: req.user,
  })
})

export default userRouter
