import { Injectable } from '@nestjs/common';
import { EHRProviderPort, Patient } from '../../domain/ports/ehr-provider.port';

interface EpicPatient {
  epicId: string;
  name: {
    given: string;
    family: string;
  };
  birthDate: string;
  // Add other Epic-specific fields
}

@Injectable()
export class EpicAdapter implements EHRProviderPort {
  async getPatient(patientId: string): Promise<Patient> {
    const epicPatient = await this.fetchPatient(patientId);
    return this.mapToPatient(epicPatient);
  }

  private async fetchPatient(patientId: string): Promise<EpicPatient> {
    // In a real implementation, this would make an HTTP request to Epic's API
    return {
      epicId: patientId,
      name: {
        given: 'John',
        family: 'Doe',
      },
      birthDate: '1990-01-01',
    };
  }

  private mapToPatient(epicPatient: EpicPatient): Patient {
    return {
      id: epicPatient.epicId,
      firstName: epicPatient.name.given,
      lastName: epicPatient.name.family,
      dateOfBirth: new Date(epicPatient.birthDate),
    };
  }
}
