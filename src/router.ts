// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/auth`
  | `/dashboard/:accountId`
  | `/dashboard/:accountId/history`
  | `/dashboard/:accountId/transfers`

export type Params = {
  '/dashboard/:accountId': { accountId: string }
  '/dashboard/:accountId/history': { accountId: string }
  '/dashboard/:accountId/transfers': { accountId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
