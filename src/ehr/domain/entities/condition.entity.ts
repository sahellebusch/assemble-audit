export class Condition {
  constructor(
    public readonly id: string,
    public readonly patientId: string,
    public readonly name: string,
    public readonly status: 'active' | 'resolved' | 'inactive',
    public readonly onsetDate?: Date,
    public readonly resolvedDate?: Date,
    public readonly severity?: 'mild' | 'moderate' | 'severe',
    public readonly category?: string,
  ) {}
}
