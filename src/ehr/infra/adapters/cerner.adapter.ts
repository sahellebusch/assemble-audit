import { EHRProviderPort } from '../../domain/ports/ehr-provider.port';
import { Patient } from '../../domain/entities/patient.entity';
import { Condition } from '../../domain/entities/condition.entity';
import { PatientMapper } from '../mappers/patient.mapper';
import { ConditionMapper } from '../mappers/condition.mapper';
import { FHIRPatient, FHIRCondition } from '../types/fhir.types';

export class CernerAdapter implements EHRProviderPort {
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
          value: 'MRN123456',
          system: 'http://hospital.example.org',
        },
      ],
      name: [
        {
          use: 'official',
          family: 'Smith',
          given: ['John', 'Jacob'],
          prefix: ['Mr.'],
        },
      ],
      gender: 'male',
      birthDate: '1990-01-01',
      active: true,
    };

    return PatientMapper.toDomain(fhirPatient);
  }

  async getPatientConditions(patientId: string): Promise<Condition[]> {
    // Mock FHIR conditions response
    const fhirConditions: FHIRCondition[] = [
      {
        resourceType: 'Condition',
        id: 'cond-1',
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
              code: '73211009',
              display: 'Diabetes mellitus',
            },
          ],
          text: 'Type 2 Diabetes',
        },
        onsetDateTime: '2020-01-01',
        severity: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '6736007',
              display: 'moderate',
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
      {
        resourceType: 'Condition',
        id: 'cond-2',
        subject: {
          reference: `Patient/${patientId}`,
        },
        clinicalStatus: {
          coding: [
            {
              system:
                'http://terminology.hl7.org/CodeSystem/condition-clinical',
              code: 'resolved',
              display: 'Resolved',
            },
          ],
        },
        code: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '195967001',
              display: 'Asthma',
            },
          ],
          text: 'Asthma',
        },
        onsetDateTime: '2018-06-15',
        abatementDateTime: '2021-03-01',
        severity: {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '24484000',
              display: 'severe',
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
