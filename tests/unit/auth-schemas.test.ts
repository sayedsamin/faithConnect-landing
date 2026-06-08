import { describe, expect, test } from 'vitest'
import {
  forgotPasswordSchema,
  guardianSignUpSchema,
  resetPasswordSchema,
  signInSchema,
} from '../../src/routes/-auth/auth-schemas'

describe('auth form schemas', () => {
  test('validates sign in values', () => {
    expect(
      signInSchema.safeParse({
        email: 'guardian@example.com',
        password: 'secret',
      }).success,
    ).toBe(true)

    expect(
      signInSchema.safeParse({
        email: 'not-an-email',
        password: '',
      }).success,
    ).toBe(false)
  })

  test('validates guardian signup values and matching passwords', () => {
    expect(
      guardianSignUpSchema.safeParse({
        guardianName: 'Alex Morgan',
        email: 'alex@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      }).success,
    ).toBe(true)

    expect(
      guardianSignUpSchema.safeParse({
        guardianName: 'A',
        email: 'alex@example.com',
        password: 'password123',
        confirmPassword: 'different123',
      }).success,
    ).toBe(false)
  })

  test('validates forgot password email', () => {
    expect(
      forgotPasswordSchema.safeParse({
        email: 'guardian@example.com',
      }).success,
    ).toBe(true)

    expect(
      forgotPasswordSchema.safeParse({
        email: 'guardian',
      }).success,
    ).toBe(false)
  })

  test('validates reset password values and matching passwords', () => {
    expect(
      resetPasswordSchema.safeParse({
        password: 'newpassword123',
        confirmPassword: 'newpassword123',
      }).success,
    ).toBe(true)

    expect(
      resetPasswordSchema.safeParse({
        password: 'newpassword123',
        confirmPassword: 'different123',
      }).success,
    ).toBe(false)
  })
})
