import { CookieOptions, Response } from 'express'
import { fifteenMinutesFromNow, thirtyDaysFromNow } from './date'
import { NODE_ENV } from '../constants/env'

export const REFRESH_PATH = "/auth/refresh"
const secure = NODE_ENV !== 'development'

const defautls: CookieOptions = {
  sameSite: 'strict',
  httpOnly: true,
  secure,
}

export function getAccessTokenCookieOptions(): CookieOptions {
  return {
    ...defautls,
    expires: fifteenMinutesFromNow()
  }
}

export function getRefreshTokenCookieOptions(): CookieOptions {
  return {
    ...defautls,
    expires: thirtyDaysFromNow(),
    path: REFRESH_PATH
  }
}

type Params = {
  res: Response
  accessToken: string
  refreshToken: string
}

export function setAuthCookies({ res, accessToken, refreshToken }: Params) {
  return res
    .cookie('accessToken', accessToken, getAccessTokenCookieOptions())
    .cookie('refreshToken', refreshToken, getRefreshTokenCookieOptions())
}

export function clearAuthCookies(res: Response) {
  return res
    .clearCookie("accessToken")
    .clearCookie("refreshToken", { path: REFRESH_PATH })
}
