import { Injectable } from '@nestjs/common';
import { EHRProviderPort, Patient } from '../../domain/ports/ehr-provider.port';

interface CernerPatient {
  cernerId: string;
  name: {
    given: string;
    family: string;
  };
  birthDate: string;
}

// Mock HTTP client
@Injectable()
export class CernerAdapter implements EHRProviderPort {
  async getPatient(patientId: string): Promise<Patient> {
    const cernerPatient = await this.fetchPatient(patientId);
    return this.mapToPatient(cernerPatient);
  }

  private async fetchPatient(patientId: string): Promise<CernerPatient> {
    // In a real implementation, this would make an HTTP request to Cerner's API
    return {
      cernerId: patientId,
      name: {
        given: 'John',
        family: 'Doe',
      },
      birthDate: '1990-01-01',
    };
  }

  private mapToPatient(cernerPatient: CernerPatient): Patient {
    return {
      id: cernerPatient.cernerId,
      firstName: cernerPatient.name.given,
      lastName: cernerPatient.name.family,
      dateOfBirth: new Date(cernerPatient.birthDate),
    };
  }
}
