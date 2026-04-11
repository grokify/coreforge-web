import { describe, it, expect } from 'vitest';
import { ROLE_LEVELS, type Role } from '../types';

describe('ROLE_LEVELS', () => {
  it('should define correct role hierarchy', () => {
    expect(ROLE_LEVELS.guest).toBeLessThan(ROLE_LEVELS.member);
    expect(ROLE_LEVELS.member).toBeLessThan(ROLE_LEVELS.admin);
    expect(ROLE_LEVELS.admin).toBeLessThan(ROLE_LEVELS.owner);
    expect(ROLE_LEVELS.owner).toBeLessThan(ROLE_LEVELS.platform_admin);
  });

  it('should have guest at level 0', () => {
    expect(ROLE_LEVELS.guest).toBe(0);
  });

  it('should have platform_admin at highest level', () => {
    const roles: Role[] = ['guest', 'member', 'admin', 'owner', 'platform_admin'];
    const maxLevel = Math.max(...roles.map((role) => ROLE_LEVELS[role]));
    expect(ROLE_LEVELS.platform_admin).toBe(maxLevel);
  });
});

describe('hasMinimumRole helper', () => {
  const hasMinimumRole = (userRole: Role, minimumRole: Role): boolean => {
    const userLevel = ROLE_LEVELS[userRole];
    const minLevel = ROLE_LEVELS[minimumRole];
    return userLevel >= minLevel;
  };

  it('should return true when user role meets minimum', () => {
    expect(hasMinimumRole('admin', 'member')).toBe(true);
    expect(hasMinimumRole('owner', 'admin')).toBe(true);
    expect(hasMinimumRole('platform_admin', 'owner')).toBe(true);
  });

  it('should return true when user role equals minimum', () => {
    expect(hasMinimumRole('member', 'member')).toBe(true);
    expect(hasMinimumRole('admin', 'admin')).toBe(true);
  });

  it('should return false when user role is below minimum', () => {
    expect(hasMinimumRole('guest', 'member')).toBe(false);
    expect(hasMinimumRole('member', 'admin')).toBe(false);
    expect(hasMinimumRole('admin', 'owner')).toBe(false);
  });
});
