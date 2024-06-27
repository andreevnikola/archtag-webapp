/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthImport } from './routes/auth'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthAuthenticateImport } from './routes/auth/_authenticate'
import { Route as AuthenticatedDashboardIndexImport } from './routes/_authenticated/dashboard/index'
import { Route as AuthAuthenticateVerifyEmailImport } from './routes/auth/_authenticate/verify-email'
import { Route as AuthAuthenticateSigninImport } from './routes/auth/_authenticate/signin'
import { Route as AuthAuthenticateResetPasswordImport } from './routes/auth/_authenticate/reset-password'
import { Route as AuthAuthenticateRegisterImport } from './routes/auth/_authenticate/register'
import { Route as AuthAuthenticateForgottenPasswordImport } from './routes/auth/_authenticate/forgotten-password'

// Create/Update Routes

const AuthRoute = AuthImport.update({
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthAuthenticateRoute = AuthAuthenticateImport.update({
  id: '/_authenticate',
  getParentRoute: () => AuthRoute,
} as any)

const AuthenticatedDashboardIndexRoute =
  AuthenticatedDashboardIndexImport.update({
    path: '/dashboard/',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

const AuthAuthenticateVerifyEmailRoute =
  AuthAuthenticateVerifyEmailImport.update({
    path: '/verify-email',
    getParentRoute: () => AuthAuthenticateRoute,
  } as any)

const AuthAuthenticateSigninRoute = AuthAuthenticateSigninImport.update({
  path: '/signin',
  getParentRoute: () => AuthAuthenticateRoute,
} as any)

const AuthAuthenticateResetPasswordRoute =
  AuthAuthenticateResetPasswordImport.update({
    path: '/reset-password',
    getParentRoute: () => AuthAuthenticateRoute,
  } as any)

const AuthAuthenticateRegisterRoute = AuthAuthenticateRegisterImport.update({
  path: '/register',
  getParentRoute: () => AuthAuthenticateRoute,
} as any)

const AuthAuthenticateForgottenPasswordRoute =
  AuthAuthenticateForgottenPasswordImport.update({
    path: '/forgotten-password',
    getParentRoute: () => AuthAuthenticateRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/auth/_authenticate': {
      preLoaderRoute: typeof AuthAuthenticateImport
      parentRoute: typeof AuthImport
    }
    '/_authenticated/': {
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/auth/_authenticate/forgotten-password': {
      preLoaderRoute: typeof AuthAuthenticateForgottenPasswordImport
      parentRoute: typeof AuthAuthenticateImport
    }
    '/auth/_authenticate/register': {
      preLoaderRoute: typeof AuthAuthenticateRegisterImport
      parentRoute: typeof AuthAuthenticateImport
    }
    '/auth/_authenticate/reset-password': {
      preLoaderRoute: typeof AuthAuthenticateResetPasswordImport
      parentRoute: typeof AuthAuthenticateImport
    }
    '/auth/_authenticate/signin': {
      preLoaderRoute: typeof AuthAuthenticateSigninImport
      parentRoute: typeof AuthAuthenticateImport
    }
    '/auth/_authenticate/verify-email': {
      preLoaderRoute: typeof AuthAuthenticateVerifyEmailImport
      parentRoute: typeof AuthAuthenticateImport
    }
    '/_authenticated/dashboard/': {
      preLoaderRoute: typeof AuthenticatedDashboardIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedIndexRoute,
    AuthenticatedDashboardIndexRoute,
  ]),
  AuthRoute.addChildren([
    AuthAuthenticateRoute.addChildren([
      AuthAuthenticateForgottenPasswordRoute,
      AuthAuthenticateRegisterRoute,
      AuthAuthenticateResetPasswordRoute,
      AuthAuthenticateSigninRoute,
      AuthAuthenticateVerifyEmailRoute,
    ]),
  ]),
])

/* prettier-ignore-end */
