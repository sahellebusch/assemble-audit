import { EHRProviderPort } from '../../domain/ports/ehr-provider.port';
import { Patient } from '../../domain/entities/patient.entity';
import { Condition } from '../../domain/entities/condition.entity';
import { PatientMapper } from '../mappers/patient.mapper';
import { ConditionMapper } from '../mappers/condition.mapper';
import { FHIRPatient, FHIRCondition } from '../types/fhir.types';

export class EpicAdapter implements EHRProviderPort {
  async getPatient(patientId: string): Promise<Patient> {
    // Mock FHIR patient response
    const fhirPatient: FHIRPatient = {
      resourceType: 'Patient',
      id: patientId,
      identifier: [
        {
          use: 'official',
          type: {
            coding: [
              {
                system: 'http://terminology.hl7.org/CodeSystem/v2-0203',
                code: 'MR',
                display: 'Medical Record Number',
              },
            ],
          },
          value: 'E789012',
          system: 'http://epic.hospital.org',
        },
      ],
      name: [
        {
          use: 'official',
          family: 'Johnson',
          given: ['Sarah', 'Elizabeth'],
          prefix: ['Mrs.'],
        },
      ],
      gender: 'female',
      birthDate: '1985-03-15',
      active: true,
    };

    return PatientMapper.toDomain(fhirPatient);
  }

  async getPatientConditions(patientId: string): Promise<Condition[]> {
    // Mock FHIR conditions response
    const fhirConditions: FHIRCondition[] = [
      {
        resourceType: 'Condition',
        id: 'epic-cond-1',
        subject: {
          reference: `Patient/${patientId}`,
        },
        clinicalStatus: {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/condition-clinical',
              code: 'active',
              display: 'Active',
            },
          ],
        },
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '38341003',
              display: 'Hypertension',
            },
          ],
          text: 'High Blood Pressure',
        },
        onsetDateTime: '2019-08-10',
        severity: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '255604002',
              display: 'mild',
            },
          ],
        },
        category: [
          {
            coding: [
              {
                system:
                  'http://terminology.hl7.org/CodeSystem/condition-category',
                code: 'problem-list-item',
                display: 'Problem List Item',
              },
            ],
          },
        ],
      },
    ];

    return fhirConditions.map((condition) =>
      ConditionMapper.toDomain(condition),
    );
  }
}
