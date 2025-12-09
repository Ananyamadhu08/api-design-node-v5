import { db } from '../../src/db/connection.ts'
import {
  users,
  habits,
  entries,
  type NewUser,
  type NewHabit,
  habitTags,
  tags,
} from '../../src/db/schema.ts'
import { hashPassword } from '../../src/utils/password.ts'
import { generateToken } from '../../src/utils/jwt.ts'

export async function createTestUser(userData: Partial<NewUser> = {}) {
  const defaultData = {
    email: `test-${Date.now()}-${Math.random()}@example.com`,
    username: `testuser-${Date.now()}-${Math.random()}`,
    password: 'TestPassword123!',
    firstName: 'Test',
    lastName: 'User',
    ...userData,
  }

  const hashedPassword = await hashPassword(defaultData.password)

  const [user] = await db
    .insert(users)
    .values({
      ...defaultData,
      password: hashedPassword,
    })
    .returning()

  const token = await generateToken({
    id: user.id,
    email: user.email,
    username: user.username,
  })

  return { user, token, rawPassword: defaultData.password }
}

export async function createTestHabit(
  userId: string,
  habitData: Partial<NewHabit> = {}
) {
  const defaultData = {
    name: `Test Habit ${Date.now()}`,
    description: 'A test habit',
    frequency: 'daily',
    targetCount: 1,
    ...habitData,
  }

  const [habit] = await db
    .insert(habits)
    .values({
      userId,
      ...defaultData,
    })
    .returning()

  return habit
}

export async function cleanupDatabase() {
  // Clean up in the right order due to foreign key constraints
  await db.delete(entries)
  await db.delete(habits)
  await db.delete(users)
  await db.delete(habitTags)
  await db.delete(tags)
}
