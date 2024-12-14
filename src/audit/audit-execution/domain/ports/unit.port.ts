export const UNIT_PORT = Symbol('UNIT_PORT');

export interface UnitPort {
  getUserIds(unitId: string): Promise<string[]>;
}
