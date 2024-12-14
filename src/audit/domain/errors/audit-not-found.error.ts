export class AuditNotFoundError extends Error {
  constructor(id: string) {
    super(`Audit not found: ${id}`);
    this.name = 'AuditNotFoundError';
  }
}
