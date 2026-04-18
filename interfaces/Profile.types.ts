export interface SelectOption {
  value: string;
  label: string;
}

export interface UserProfileData {
  firstName: string;
  email: string;
  taxRegime: string;
  averageSalary: number;
  maxSalary: number;
}

export const TAX_REGIME_OPTIONS: SelectOption[] = [
  { value: 'SUELDOS_Y_SALARIOS', label: 'Sueldos y Salarios' },
  { value: 'RESICO_PERSONAS_FISICAS', label: 'RESICO (Personas Físicas)' },
  { value: 'ACTIVIDAD_PROFESIONAL', label: 'Actividad Profesional' },
  { value: 'PLATAFORMAS_TECNOLOGICAS', label: 'Plataformas Tecnológicas' },
  { value: 'ARRENDAMIENTO', label: 'Arrendamiento' },
  { value: 'INTERESES', label: 'Intereses' },
];

export interface SalaryInputProps {
  label: string;
  value: number;
  description: string;
  onChange: (val: number) => void;
}