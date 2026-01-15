import { describe, it } from 'node:test';
import assert from 'node:assert';
import User from '../src/modules/user.js';

describe('User Module', () => {
  const user = new User();

  it('should throw error if email or password missing', async () => {
    await assert.rejects(async () => await user.performLogin(), /Email and password are required/);
    await assert.rejects(async () => await user.performLogin('user'), /Email and password are required/);
  });

  it('should attempt login with invalid credentials and fail gracefully', async () => {
    const result = await user.performLogin('test@example.com', 'wrongpassword');
    
    if (result.error) {
        assert.ok(result.error);
        assert.strictEqual(result.code, 'couldNotObtainAccessToken');
    } else {
        // If by some miracle it works, we check for access token
        assert.ok(result.access_token);
    }
  });

  // Note: We can't easily test successful login without valid credentials in CI/CD.
  // But we can test the structure of other methods if we had a token.
  // For now, we'll verify they handle invalid tokens correctly.

  it('should return error for getMe with invalid token', async () => {
      const result = await user.getMe('invalid_token');
      assert.strictEqual(result.code, 'invalidAccessToken');
  });

  it('should return error for getPassangers with invalid token', async () => {
      const result = await user.getPassangers('invalid_token');
      assert.strictEqual(result.code, 'invalidAccessToken');
  });

  it('should return error for getActiveTickets with invalid token', async () => {
      const result = await user.getActiveTickets('invalid_token');
      assert.strictEqual(result.code, 'invalidAccessToken');
  });

  it('should return error for getInactiveTickets with invalid token', async () => {
      const result = await user.getInactiveTickets('invalid_token');
      assert.strictEqual(result.code, 'invalidAccessToken');
  });
  
  it('should throw error for getInactiveTickets with missing params', async () => {
      await assert.rejects(async () => await user.getInactiveTickets('token', null, null), /Page and per_page are required/);
  });

  it('should return error for getTransactionHistory with invalid token', async () => {
      const result = await user.getTransactionHistory('invalid_token');
      assert.strictEqual(result.code, 'invalidAccessToken');
  });
});
