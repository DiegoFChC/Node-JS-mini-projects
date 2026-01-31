import { JWT_REFRESH_SECRET, JWT_SECRET } from '../constants/env'
import { CONFLICT, UNAUTHORIZED } from '../constants/http'
import { VerificationCodeType } from '../constants/verificationCodeType'
import { SessionModel } from '../models/session.model'
import { UserModel } from '../models/user.model'
import { verificationCodeModel } from '../models/verificationCode.model'
import { appAssert } from '../utils/appAssert'
import { oneYearFromNow } from '../utils/date'
import jwt from 'jsonwebtoken'
import { refreshTokenSignOptions, signToken } from '../utils/jwt'

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
  const userId = user._id

  // create cerification code
  const verificationCode = await verificationCodeModel.create({
    userId,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow()
  })

  // send verification email

  // create session
  const session = await SessionModel.create({
    userId,
    userAgent: data.userAgent
  })

  // sign access token & refresh token
  const refreshToken = signToken({ sessionId: session._id }, refreshTokenSignOptions)

  const accessToken = signToken({
    userId,
    sessionId: session._id
  })

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
  const refreshToken = signToken(sessionInfo, refreshTokenSignOptions)

  const accessToken = signToken({
    ...sessionInfo,
    userId: user._id
  })

  // return user & tokens
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken
  }
}
