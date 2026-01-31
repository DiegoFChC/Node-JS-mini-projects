import assert from 'node:assert'
import { AppErrorCode } from '../constants/appErrorCode'
import { HttpStatusCode } from '../constants/http'
import { AppError } from './AppError'

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode
) => asserts condition

/**
 * Asserts a condition and throws an AppError if the condition is falsy
 */
export const appAssert: AppAssert = (
  condiiton: any,
  httpStatusCode,
  message,
  appErrorCode
) => assert(condiiton, new AppError(httpStatusCode, message, appErrorCode))
