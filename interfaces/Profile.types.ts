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
  { value: 'RESICO', label: 'RESICO (Confianza)' },
  { value: 'SUELDOS_Y_SALARIOS', label: 'Sueldos y Salarios' },
  { value: 'ACTIVIDAD_PROFESIONAL', label: 'Actividad Profesional' },
  { value: 'PLATAFORMAS_TECNOLOGICAS', label: 'Plataformas Tecnológicas' },
];

export interface SalaryInputProps {
  label: string;
  value: number;
  description: string;
  onChange: (val: number) => void;
}