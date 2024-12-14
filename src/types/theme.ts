export type EveningTheme = 'purple' | 'navy' | 'black';
export type MorningTheme = 'sunrise' | 'sage' | 'coffee';
export type AfternoonTheme = 'butterflies' | 'meadow' | 'stormy';

export interface ThemeSettings {
  eveningTheme: EveningTheme;
  morningTheme: MorningTheme;
  afternoonTheme: AfternoonTheme;
}