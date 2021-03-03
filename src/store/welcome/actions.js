/* eslint-disable import/prefer-default-export */
import { forwardPayload } from '../utils'
import * as types from '../types'

export const setSeen = forwardPayload(types.SET_WELCOME_SEEN)
