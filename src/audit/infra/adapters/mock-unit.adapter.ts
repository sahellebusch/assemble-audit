import { Injectable } from '@nestjs/common';
import { UnitPort } from '../../domain/ports/unit.port';

// This should live in a different sub-domain, but it's for illustration purposes.
@Injectable()
export class MockUnitAdapter implements UnitPort {
  private readonly mockUnitUsers: Record<string, string[]> = {
    'unit-1': [
      '123e4567-e89b-12d3-a456-426614174000',
      '223e4567-e89b-12d3-a456-426614174000',
      '323e4567-e89b-12d3-a456-426614174000',
    ],
    'unit-2': [
      '423e4567-e89b-12d3-a456-426614174000',
      '523e4567-e89b-12d3-a456-426614174000',
    ],
  };

  async getUserIds(unitId: string): Promise<string[]> {
    const users = this.mockUnitUsers[unitId];
    if (!users) {
      throw new Error(`Unit ${unitId} not found`);
    }
    return users;
  }
}
