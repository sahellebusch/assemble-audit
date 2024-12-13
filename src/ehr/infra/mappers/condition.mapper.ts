import { Condition } from '../../domain/entities/condition.entity';
import { FHIRCondition } from '../types/fhir.types';

export class ConditionMapper {
  static toDomain(fhirCondition: FHIRCondition): Condition {
    const status = this.mapClinicalStatus(fhirCondition.clinicalStatus);
    const patientId = fhirCondition.subject.reference.split('/').pop() ?? '';

    return new Condition(
      fhirCondition.id,
      patientId,
      fhirCondition.code.text ?? fhirCondition.code.coding[0]?.display ?? '',
      status,
      fhirCondition.onsetDateTime
        ? new Date(fhirCondition.onsetDateTime)
        : undefined,
      fhirCondition.abatementDateTime
        ? new Date(fhirCondition.abatementDateTime)
        : undefined,
      this.mapSeverity(fhirCondition.severity),
      this.mapCategory(fhirCondition.category),
    );
  }

  private static mapClinicalStatus(status?: {
    coding: Array<{ code: string }>;
  }): 'active' | 'resolved' | 'inactive' {
    const code = status?.coding[0]?.code;
    switch (code) {
      case 'active':
        return 'active';
      case 'resolved':
        return 'resolved';
      default:
        return 'inactive';
    }
  }

  private static mapSeverity(severity?: {
    coding: Array<{ code: string }>;
  }): 'mild' | 'moderate' | 'severe' | undefined {
    const code = severity?.coding[0]?.code;
    switch (code) {
      case 'mild':
        return 'mild';
      case 'moderate':
        return 'moderate';
      case 'severe':
        return 'severe';
      default:
        return undefined;
    }
  }

  private static mapCategory(
    categories?: Array<{ coding: Array<{ display?: string }> }>,
  ): string | undefined {
    return categories?.[0]?.coding[0]?.display;
  }
}
