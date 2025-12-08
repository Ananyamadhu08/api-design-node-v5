import request from 'supertest'
import { app } from '../src/server.ts'
import { afterEach } from 'vitest'
import {
  createTestUser,
  createTestHabit,
  cleanupDatabase,
} from './helpers/dbHelpers.ts'

describe('Habits API', () => {
  afterEach(async () => {
    await cleanupDatabase()
  })

  describe('POST /api/habits', () => {
    it('should create a new habit', async () => {
      const { token } = await createTestUser()

      const response = await request(app)
        .post('/api/habits')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Exercise daily',
          description: 'Daily exercise routine',
          frequency: 'daily',
          targetCount: 1,
        })

      expect(response.status).toBe(201)
      expect(response.body.habit).toBeDefined()
      expect(response.body.habit.name).toBe('Exercise daily')
    })

    it('should require authentication', async () => {
      const response = await request(app).post('/api/habits').send({
        name: 'Exercise',
        frequency: 'daily',
      })

      expect(response.status).toBe(401)
    })

    it('should validate input data', async () => {
      const { token } = await createTestUser()

      const response = await request(app)
        .post('/api/habits')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          frequency: 'invalid',
        })

      expect(response.status).toBe(400)
    })
  })

  describe('GET /api/habits', () => {
    it('should get all user habits', async () => {
      const { user, token } = await createTestUser()
      await createTestHabit(user.id)

      const response = await request(app)
        .get('/api/habits')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.habits)).toBe(true)
      expect(response.body.habits.length).toBeGreaterThan(0)
    })

    it('should return empty array for user with no habits', async () => {
      const { token } = await createTestUser()

      const response = await request(app)
        .get('/api/habits')
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(Array.isArray(response.body.habits)).toBe(true)
      expect(response.body.habits.length).toBe(0)
    })
  })
})
