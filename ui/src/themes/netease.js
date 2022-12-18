export default {
  themeName: '网易云主题',
  palette: {
    primary: {
      light: '#f757ff',
      dark: '#BD3B40',
      main: '#BD3B40',
      contrastText: '#fff',
    },
    secondary: {
      light: '#bd4aff',
      dark: '#BD3B40',
      main: '#25262b',
      contrastText: '#fff',
    },
    warn: {
      light: '#ffff82',
      dark: '#BD3B40',
      main: '#BD3B40',
      contrastText: '#000',
    },
    error: {
      light: '#BD3B40',
      dark: '#BD3B40',
      main: '#BD3B40',
      contrastText: '#000',
    },
    type: 'light',
  },
  overrides: {
    MuiFormGroup: {
      root: {
        color: 'white',
      },
    },

    // MuiAppBar: {
    //   colorSecondary: {
    //     color: '#BD3B40!important',
    //   },
    // },
    MuiListItemIcon: {
      root: {
        color: '#BD3B40!important',
      },
    },
    NDLogin: {
      systemNameLink: {
        color: '#fff',
      },
      welcome: {
        color: 'grey',
      },
    },
    NDMobileArtistDetails: {
      bgContainer: {
        background:
          'linear-gradient(to bottom, rgba(52 52 52 / 72%), rgb(48 48 48))!important',
      },
    },
  },
  player: {
    theme: 'dark',
    stylesheet: require('./netease.css.js'),
  },
}
