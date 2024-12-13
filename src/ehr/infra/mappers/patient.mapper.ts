import { Patient } from '../../domain/entities/patient.entity';
import { FHIRPatient } from '../types/fhir.types';

export class PatientMapper {
  static toDomain(fhirPatient: FHIRPatient): Patient {
    const primaryName = fhirPatient.name?.[0];
    const mrn = fhirPatient.identifier?.find((id) =>
      id.type?.coding.some((coding) => coding.code === 'MR'),
    )?.value;

    return new Patient(
      fhirPatient.id,
      primaryName?.given?.[0] ?? '',
      primaryName?.family ?? '',
      fhirPatient.birthDate ? new Date(fhirPatient.birthDate) : new Date(),
      fhirPatient.gender,
      mrn,
    );
  }
}
