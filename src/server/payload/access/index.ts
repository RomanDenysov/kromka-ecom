import { Access } from 'payload'

const staffRoles = ['admin', 'manager', 'author']

export const isAdmin: Access = ({ req }) => {
  return req?.user?.role === 'admin'
}

export const isAnyone: Access = () => true

export const isAdminOrCurrentUser: Access = ({ req }) => {
  if (req?.user?.role === 'admin') return true

  return { id: { equals: req.user?.id } }
}

export const isAdminOrManager: Access = ({ req }) => {
  if (req?.user?.role === 'admin') return true

  return { role: { equals: 'manager' } }
}

export const isAdminOrAuthor: Access = ({ req }) => {
  if (req?.user?.role === 'admin') return true

  return { role: { equals: 'author' } }
}

export const isAdminOrPartner: Access = ({ req }) => {
  if (req?.user?.role === 'admin') return true

  return { role: { equals: 'partner' } }
}

export const isStaff: Access = ({ req }) => {
  if (!req?.user?.role) return false
  return staffRoles.includes(req?.user?.role)
}
