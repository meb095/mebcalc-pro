
export enum AppMode {
  BASIC = 'BASIC',
  SCIENTIFIC = 'SCIENTIFIC',
  CONVERTER = 'CONVERTER',
  SMART = 'SMART',
  HISTORY = 'HISTORY'
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface ConversionCategory {
  name: string;
  icon: string;
  units: { [key: string]: number }; // base unit factor
}
