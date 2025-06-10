export const colors = {
  primary: {
    50: '#F8F9FA',  // Very light gray - background
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#868E96',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },
  secondary: {
    50: '#E8E2DF',  // Brown tones - keeping as accent
    100: '#D1C5BF',
    200: '#BAA89F',
    300: '#A38B7F',
    400: '#8C6E5F',
    500: '#7F675B',  // Original brown
    600: '#665247',
    700: '#4D3D33',
    800: '#33281F',
    900: '#1A140B',
  },
  success: {
    50: '#EBFBEE',
    100: '#D3F9D8',
    200: '#B2F2BB',
    300: '#8CE99A',
    400: '#69DB7C',
    500: '#51CF66',
    600: '#40C057',
    700: '#37B24D',
    800: '#2F9E44',
    900: '#2B8A3E',
  },
  error: {
    50: '#FFF5F5',
    100: '#FFE3E3',
    200: '#FFC9C9',
    300: '#FFA8A8',
    400: '#FF8787',
    500: '#FF6B6B',
    600: '#FA5252',
    700: '#F03E3E',
    800: '#E03131',
    900: '#C92A2A',
  },
  // Track colors
  elementary: {
    50: '#E3FAFC',  // Cyan tones
    100: '#C5F6FA',
    200: '#99E9F2',
    300: '#66D9E8',
    400: '#3BC9DB',
    500: '#22B8CF',  // Main elementary color
    600: '#15AABF',
    700: '#1098AD',
    800: '#0C8599',
    900: '#0B7285',
  },
  middle: {
    50: '#E7F5FF',  // Blue tones
    100: '#D0EBFF',
    200: '#A5D8FF',
    300: '#74C0FC',
    400: '#4DABF7',
    500: '#339AF0',  // Main middle school color
    600: '#228BE6',
    700: '#1C7ED6',
    800: '#1971C2',
    900: '#1864AB',
  },
  high: {
    50: '#F3F0FF',  // Purple tones
    100: '#E5DBFF',
    200: '#D0BFFF',
    300: '#B197FC',
    400: '#9775FA',
    500: '#845EF7',  // Main high school color
    600: '#7950F2',
    700: '#7048E8',
    800: '#6741D9',
    900: '#5F3DC4',
  },
}

export const levelColors = {
  elementary: {
    light: colors.elementary[100],
    base: colors.elementary[500],
    dark: colors.elementary[600],
    text: colors.elementary[800],
    border: colors.elementary[200],
  },
  middle: {
    light: colors.middle[100],
    base: colors.middle[500],
    dark: colors.middle[600],
    text: colors.middle[800],
    border: colors.middle[200],
  },
  high: {
    light: colors.high[100],
    base: colors.high[500],
    dark: colors.high[600],
    text: colors.high[800],
    border: colors.high[200],
  },
} 