// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/auth`
  | `/dashboard/:accountId`
  | `/dashboard/:accountId/debts`
  | `/dashboard/:accountId/edit`
  | `/dashboard/:accountId/grouped-transfers`
  | `/dashboard/:accountId/statement`

export type Params = {
  '/dashboard/:accountId': { accountId: string }
  '/dashboard/:accountId/debts': { accountId: string }
  '/dashboard/:accountId/edit': { accountId: string }
  '/dashboard/:accountId/grouped-transfers': { accountId: string }
  '/dashboard/:accountId/statement': { accountId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
