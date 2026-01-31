import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env'
import { CONFLICT, UNAUTHORIZED } from '../constants/http'
import { VerificationCodeType } from '../constants/verificationCodeType'
import { SessionModel } from '../models/session.model'
import { UserModel } from '../models/user.model'
import { verificationCodeModel } from '../models/verificationCode.model'
import { appAssert } from '../utils/appAssert'
import { oneYearFromNow } from '../utils/date'
import jwt from 'jsonwebtoken'

export type CreateAccountParams = {
  email: string
  password: string
  userAgent?: string
}

export async function createAccount(data: CreateAccountParams) {
  // verify existing user doesnt exist
  const existingUser = await UserModel.exists({
    email: data.email
  })

  appAssert(!existingUser, CONFLICT, 'Email already in use')

  // create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password
  })
  // create cerification code
  const verificationCode = await verificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow()
  })

  // send verification email

  // create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent
  })

  // sign access token & refresh token
  const refreshToken = jwt.sign(
    { sessionId: session._id },
    JWT_REFRESH_SECRET,
    {
      audience: ['user'],
      expiresIn: '30d'
    }
  )

  const accessToken = jwt.sign(
    {
      userId: user._id,
      sessionId: session._id
    },
    JWT_SECRET,
    {
      audience: ['user'],
      expiresIn: '15m'
    }
  )

  // return user & tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken
  }
}

export type LoginParams = {
  email: string
  password: string
  userAgent?: string
}

export async function loginUser({ email, password, userAgent }: LoginParams) {
  // get the user by emial
  const user = await UserModel.findOne({ email })
  appAssert(user, UNAUTHORIZED, 'Invalid email or password')

  // validate password from the request
  const isValid = user.comparePassword(password)
  appAssert(isValid, UNAUTHORIZED, 'Invalid email or password')

  const userId = user._id

  // create a SessionModel
  const session = await SessionModel.create({
    userId,
    userAgent
  })

  const sessionInfo = {
    sessionId: session._id
  }

  // sign access token & refresh token
  const refreshToken = jwt.sign(
    sessionInfo,
    JWT_REFRESH_SECRET,
    {
      audience: ['user'],
      expiresIn: '30d'
    }
  )

  const accessToken = jwt.sign(
    {
      ...sessionInfo,
      userId: user._id
    },
    JWT_SECRET,
    {
      audience: ['user'],
      expiresIn: '15m'
    }
  )

  // return user & tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken
  }
}
