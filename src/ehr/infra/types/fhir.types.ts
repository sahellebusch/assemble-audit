export interface FHIRPatient {
  resourceType: 'Patient';
  id: string;
  identifier?: Array<{
    use?: string;
    type?: {
      coding: Array<{
        system: string;
        code: string;
        display?: string;
      }>;
    };
    value: string;
    system?: string;
  }>;
  name?: Array<{
    use?: string;
    family?: string;
    given?: string[];
    prefix?: string[];
    suffix?: string[];
  }>;
  gender?: string;
  birthDate?: string;
  active?: boolean;
}

export interface FHIRCondition {
  resourceType: 'Condition';
  id: string;
  subject: {
    reference: string;
  };
  clinicalStatus?: {
    coding: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
  };
  code: {
    coding: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
    text?: string;
  };
  onsetDateTime?: string;
  abatementDateTime?: string;
  severity?: {
    coding: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
  };
  category?: Array<{
    coding: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
  }>;
}
