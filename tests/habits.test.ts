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
  })
})
