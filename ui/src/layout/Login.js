import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import MainLogo from '../icons/mainlogo.png'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import defaultConfig from '../config'
import {
  createMuiTheme,
  useLogin,
  useNotify,
  useRefresh,
  useSetLocale,
  useTranslate,
  useVersion,
} from 'react-admin'
import Logo from '../icons/android-icon-192x192.png'

import Notification from './Notification'
import useCurrentTheme from '../themes/useCurrentTheme'
import config from '../config'
import { clearQueue } from '../actions'
import { retrieveTranslation } from '../i18n'

const useStyles = makeStyles(
  (theme) => ({
    main: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'flex-start',
      background: `url(${config.loginBackgroundURL})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    card: {
      minWidth: 300,
      marginTop: '6em',
      overflow: 'visible',
    },
    avatar: {
      margin: '1em',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '-3em',
    },
    icon: {
      backgroundColor: 'transparent',
      width: '6.3em',
      height: '6.3em',
    },
    systemName: {
      marginTop: '1em',
      display: 'flex',
      justifyContent: 'center',
      color: '#3f51b5', //theme.palette.grey[500]
    },
    welcome: {
      marginTop: '1em',
      padding: '0 1em 1em 1em',
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      color: '#3f51b5', //theme.palette.grey[500]
    },
    form: {
      padding: '0 1em 1em 1em',
    },
    input: {
      marginTop: '1em',
    },
    actions: {
      padding: '0 1em 1em 1em',
    },
    button: {},
    systemNameLink: {
      textDecoration: 'none',
    },
  }),
  { name: 'NDLogin' }
)
console.log(defaultConfig.otherUrl)
const renderInput = ({
  meta: { touched, error } = {},
  input: { ...inputProps },
  ...props
}) => (
  <TextField
    error={!!(touched && error)}
    helperText={touched && error}
    {...inputProps}
    {...props}
    fullWidth
  />
)

const FormLogin = ({
  loading,
  handleSubmit,
  validate,
  isLogin,
  handleChangeLogin,
}) => {
  const translate = useTranslate()
  const classes = useStyles()
  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form
          style={{ display: isLogin ? 'block' : 'none' }}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={classes.main}>
            <Card className={classes.card}>
              <div
                style={{
                  display: 'flex',
                  marginTop: '3em',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={MainLogo}
                  style={{ backgroundColor: 'transparent', width: 220 }}
                  alt={'logo'}
                />
              </div>
              <div className={classes.systemName}>
                <a
                  href="https://www.navidrome.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.systemNameLink}
                >
                  源音云
                </a>
              </div>
              {config.welcomeMessage && (
                <div
                  className={classes.welcome}
                  dangerouslySetInnerHTML={{ __html: config.welcomeMessage }}
                />
              )}
              <div className={classes.form}>
                <div className={classes.input}>
                  <Field
                    autoFocus
                    name="username"
                    component={renderInput}
                    label={translate('ra.auth.username')}
                    disabled={loading}
                  />
                </div>
                <div className={classes.input}>
                  <Field
                    name="password"
                    component={renderInput}
                    label={translate('ra.auth.password')}
                    type="password"
                    disabled={loading}
                  />
                </div>
              </div>
              <CardActions className={classes.actions}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                  fullWidth
                >
                  {loading && <CircularProgress size={25} thickness={2} />}
                  {translate('ra.auth.sign_in')}
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => handleChangeLogin(false)}
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                  fullWidth
                >
                  {translate('ra.auth.signUser')}
                </Button>
              </CardActions>
              <CardActions className={classes.actions}>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => window.open(defaultConfig.otherUrl)}
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                  fullWidth
                >
                  {translate('ra.auth.uploadMusic')}
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() =>
                    window.open(`${defaultConfig.otherUrl}源音云.exe`)
                  }
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                  fullWidth
                >
                  {translate('ra.auth.downloadClient')}
                </Button>
              </CardActions>
            </Card>
            <Notification />
          </div>
        </form>
      )}
    />
  )
}
const FormRegisterUp = ({
  loading,
  handleSubmit,
  validate,
  isLogin,
  handleChangeLogin,
}) => {
  const translate = useTranslate()
  const classes = useStyles()
  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form
          style={{ display: isLogin ? 'none' : 'block' }}
          onSubmit={handleSubmit}
          noValidate
        >
          <div className={classes.main}>
            <Card className={classes.card}>
              <div
                style={{
                  display: 'flex',
                  marginTop: '3em',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={MainLogo}
                  style={{ backgroundColor: 'transparent', width: 220 }}
                  alt={'logo'}
                />
              </div>
              <div className={classes.welcome}>{'欢迎使用源音云！'}</div>
              <div className={classes.welcome}>
                {'注册一个账户，享受所有服务'}
              </div>
              <div className={classes.form}>
                <div className={classes.input}>
                  <Field
                    autoFocus
                    name="username"
                    component={renderInput}
                    label={translate('ra.auth.username')}
                    disabled={loading}
                  />
                </div>
                <div className={classes.input}>
                  <Field
                    name="password"
                    component={renderInput}
                    label={translate('ra.auth.password')}
                    type="password"
                    disabled={loading}
                  />
                </div>
                <div className={classes.input}>
                  <Field
                    name="confirmPassword"
                    component={renderInput}
                    label={translate('ra.auth.confirmPassword')}
                    type="password"
                    disabled={loading}
                  />
                </div>
                <div className={classes.input}>
                  <Field
                    name="urls"
                    component={renderInput}
                    style={{ display: 'none' }}
                    defaultValue="/auth/createNormalUser"
                    type="password"
                    disabled={loading}
                  />
                </div>
              </div>
              <CardActions className={classes.actions}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                  fullWidth
                >
                  {loading && <CircularProgress size={25} thickness={2} />}
                  {translate('ra.auth.buttonRegisterUser')}
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => handleChangeLogin(true)}
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                  fullWidth
                >
                  {translate('ra.auth.loginUser')}
                </Button>
              </CardActions>
              <CardActions className={classes.actions}>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => window.open(defaultConfig.otherUrl)}
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                  fullWidth
                >
                  {translate('ra.auth.uploadMusic')}
                </Button>
                <Button
                  variant="contained"
                  type="button"
                  onClick={() =>
                    window.open(`${defaultConfig.otherUrl}/源音云.exe`)
                  }
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                  fullWidth
                >
                  {translate('ra.auth.downloadClient')}
                </Button>
              </CardActions>
            </Card>
            <Notification />
          </div>
        </form>
      )}
    />
  )
}
const FormSignUp = ({ loading, handleSubmit, validate }) => {
  const translate = useTranslate()
  const classes = useStyles()

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} noValidate>
          <div className={classes.main}>
            <Card className={classes.card}>
              <div
                style={{
                  display: 'flex',
                  marginTop: '3em',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={MainLogo}
                  style={{ backgroundColor: 'transparent', width: 220 }}
                  alt={'logo'}
                />
              </div>
              <div className={classes.welcome}>
                {translate('ra.auth.welcome1')}
              </div>
              <div className={classes.welcome}>
                {translate('ra.auth.welcome2')}
              </div>
              <div className={classes.form}>
                <div className={classes.input}>
                  <Field
                    autoFocus
                    name="username"
                    component={renderInput}
                    label={translate('ra.auth.username')}
                    disabled={loading}
                  />
                </div>
                <div className={classes.input}>
                  <Field
                    name="password"
                    component={renderInput}
                    label={translate('ra.auth.password')}
                    type="password"
                    disabled={loading}
                  />
                </div>
                <div className={classes.input}>
                  <Field
                    name="confirmPassword"
                    component={renderInput}
                    label={translate('ra.auth.confirmPassword')}
                    type="password"
                    disabled={loading}
                  />
                </div>
              </div>
              <CardActions className={classes.actions}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={loading}
                  className={classes.button}
                  fullWidth
                >
                  {loading && <CircularProgress size={25} thickness={2} />}
                  {translate('ra.auth.buttonCreateAdmin')}
                </Button>
              </CardActions>
            </Card>
            <Notification />
          </div>
        </form>
      )}
    />
  )
}
const Login = ({ location }) => {
  const [loading, setLoading] = useState(false)
  const [isLogin, setLoginState] = useState(true)
  const translate = useTranslate()
  const notify = useNotify()
  const login = useLogin()
  const dispatch = useDispatch()
  const handleChangeLogin = (prop = true) => {
    setLoginState(prop)
  }
  const handleSubmit = useCallback(
    (auth) => {
      setLoading(true)
      dispatch(clearQueue())
      login(auth, location.state ? location.state.nextPathname : '/').catch(
        (error) => {
          setLoading(false)
          notify(
            typeof error === 'string'
              ? error
              : typeof error === 'undefined' || !error.message
              ? 'ra.auth.sign_in_error'
              : error.message,
            'warning'
          )
        }
      )
    },
    [dispatch, login, notify, setLoading, location]
  )

  const validateLogin = useCallback(
    (values) => {
      const errors = {}
      if (!values.username) {
        errors.username = translate('ra.validation.required')
      }
      if (!values.password) {
        errors.password = translate('ra.validation.required')
      }
      return errors
    },
    [translate]
  )

  const validateSignup = useCallback(
    (values) => {
      const errors = validateLogin(values)
      const regex = /^\w+$/g
      if (values.username && !values.username.match(regex)) {
        errors.username = translate('ra.validation.invalidChars')
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = translate('ra.validation.required')
      }
      if (values.confirmPassword !== values.password) {
        errors.confirmPassword = translate('ra.validation.passwordDoesNotMatch')
      }
      return errors
    },
    [translate, validateLogin]
  )
  console.log(isLogin, loading)
  if (config.firstTime) {
    return (
      <FormSignUp
        handleSubmit={handleSubmit}
        validate={validateSignup}
        loading={loading}
      />
    )
  }
  return (
    <div>
      <FormLogin
        handleSubmit={handleSubmit}
        validate={validateLogin}
        isLogin={isLogin}
        handleChangeLogin={handleChangeLogin}
        loading={loading}
      />
      <FormRegisterUp
        handleSubmit={handleSubmit}
        validate={validateSignup}
        loading={loading}
        handleChangeLogin={handleChangeLogin}
        isLogin={isLogin}
      />
    </div>
  )
}

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
}

// We need to put the ThemeProvider decoration in another component
// Because otherwise the useStyles() hook used in Login won't get
// the right theme
const LoginWithTheme = (props) => {
  const theme = useCurrentTheme()
  const setLocale = useSetLocale()
  const refresh = useRefresh()
  const version = useVersion()

  useEffect(() => {
    if (config.defaultLanguage !== '' && !localStorage.getItem('locale')) {
      retrieveTranslation(config.defaultLanguage)
        .then(() => {
          setLocale(config.defaultLanguage).then(() => {
            localStorage.setItem('locale', config.defaultLanguage)
          })
          refresh(true)
        })
        .catch((e) => {
          throw new Error(
            'Cannot load language "' + config.defaultLanguage + '": ' + e
          )
        })
    }
  }, [refresh, setLocale])

  return (
    <ThemeProvider theme={createMuiTheme(theme)}>
      <Login key={version} {...props} />
    </ThemeProvider>
  )
}

export default LoginWithTheme
