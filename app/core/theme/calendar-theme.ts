import { colours } from './colours';

export const calendarTheme = {
  itemDayContainer: {
    activeDayFiller: {
      backgroundColor: colours.PRIMARY,
    },
  },
  itemDay: {
    active: () => ({
      container: {
        backgroundColor: colours.PRIMARY,
      },
      content: {
        color: '#ffffff',
      },
    }),
  },
};
