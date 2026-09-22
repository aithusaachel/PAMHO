import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../server.js';
import pg from 'pg';

// Mock the pg module so tests don't require a live database
vi.mock('pg', () => {
  const query = vi.fn().mockResolvedValue({ rows: [{ id: 1 }], rowCount: 1 });
  const release = vi.fn();
  const connect = vi.fn().mockResolvedValue({ query, release });
  
  return {
    default: {
      Pool: class {
        connect = connect;
        query = query;
      }
    }
  };
});

describe('PAMHO API Integration Tests', () => {
  // Use these credentials since server.js requires them
  beforeEach(() => {
    process.env.ADMIN_USERNAME = 'testadmin';
    process.env.ADMIN_PASSWORD = 'testpassword';
  });

  describe('POST /api/submissions (Public & Validation)', () => {
    
    it('rejects completely empty submission', async () => {
      const res = await request(app)
        .post('/api/submissions')
        .send({});
      
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Validation failed');
    });

    it('rejects unknown formType', async () => {
      const res = await request(app)
        .post('/api/submissions')
        .send({ formType: 'unknown', data: {} });
      
      expect(res.status).toBe(400);
    });

    it('accepts valid contact form submission', async () => {
      const res = await request(app)
        .post('/api/submissions')
        .send({
          formType: 'contact',
          data: {
            fullName: 'John Doe',
            email: 'john@example.com',
            whatsapp: '123456789',
            subject: 'Test Subject',
            message: 'Hello world'
          }
        });
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it('rejects contact form missing required fields', async () => {
      const res = await request(app)
        .post('/api/submissions')
        .send({
          formType: 'contact',
          data: {
            fullName: 'John Doe',
            // missing email, whatsapp, etc
          }
        });
      
      expect(res.status).toBe(400);
      expect(res.body.details.data.email).toBeDefined();
    });

    it('rejects oversized string payloads (length limits)', async () => {
      const massiveString = 'A'.repeat(6000); // Max is 5000 for message
      const res = await request(app)
        .post('/api/submissions')
        .send({
          formType: 'contact',
          data: {
            fullName: 'John Doe',
            email: 'john@example.com',
            whatsapp: '123456789',
            subject: 'Test Subject',
            message: massiveString
          }
        });
      
      expect(res.status).toBe(400);
    });

    it('rejects extra unexpected fields (strict schema)', async () => {
      const res = await request(app)
        .post('/api/submissions')
        .set('X-Forwarded-For', '10.0.0.6') // Unique IP
        .send({
          formType: 'contact',
          data: {
            fullName: 'John Doe',
            email: 'john@example.com',
            whatsapp: '123456789',
            subject: 'Test Subject',
            message: 'Hello world',
            maliciousField: 'exploit'
          }
        });
      
      expect(res.status).toBe(400);
    });
  });

  describe('Rate Limiting Tests', () => {
    it('blocks POST submissions after 5 requests from the same IP', async () => {
      const ip = '10.0.0.99';
      // Send 5 valid requests
      for (let i = 0; i < 5; i++) {
        const res = await request(app)
          .post('/api/submissions')
          .set('X-Forwarded-For', ip)
          .send({
            formType: 'contact',
            data: {
              fullName: 'John Doe',
              email: 'john@example.com',
              whatsapp: '123456789',
              subject: 'Test Subject',
              message: 'Hello world'
            }
          });
        expect(res.status).toBe(201);
      }
      
      // The 6th request should be blocked
      const blockedRes = await request(app)
        .post('/api/submissions')
        .set('X-Forwarded-For', ip)
        .send({
          formType: 'contact',
          data: {
            fullName: 'John Doe',
            email: 'john@example.com',
            whatsapp: '123456789',
            subject: 'Test Subject',
            message: 'Hello world'
          }
        });
      
      expect(blockedRes.status).toBe(429);
      expect(blockedRes.body.error).toContain('Too many submissions');
    });
  });

  describe('GET /api/submissions (Protected)', () => {
    
    it('rejects unauthorized access (missing header)', async () => {
      const res = await request(app).get('/api/submissions');
      expect(res.status).toBe(401);
    });

    it('rejects unauthorized access (wrong credentials)', async () => {
      const res = await request(app)
        .get('/api/submissions')
        .auth('testadmin', 'wrongpassword');
      
      expect(res.status).toBe(401);
    });

    it('allows authorized access (correct credentials)', async () => {
      const res = await request(app)
        .get('/api/submissions')
        .auth('testadmin', 'testpassword');
      
      expect(res.status).toBe(200);
      // Data matches mock
      expect(Array.isArray(res.body)).toBe(true);
    });
  });
});
