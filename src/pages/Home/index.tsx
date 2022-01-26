import React, { useState, useEffect } from 'react'
import { Input } from '../../components/common/TextField'
import { useFormik } from 'formik'
import api from '../../services/api'
import { Alert, AlertColor } from '@mui/material'
import { Slide } from '@mui/material'
import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string()
    .required('Type your email.'),
  password: Yup.string()
    .required('Type your password to continue.')
})

export const initialValues = {
  email: '',
  password: ''
}


export const Home = () => {
  const [severityAlert, setSeverityAlert] = useState<AlertColor>('success')
  const [alertMessage, setAlertMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const handleSubmit = async (values: any) => {
    try {
      const response = await api.post('auth/1/session', {
        data: {
          password: values.password,
          email: values.email
        }
      })
      setAlertMessage('Invalid credentials, please try again.')
      setShowAlert(true)
      console.log('response: ', response)
    } catch (error) {
      setAlertMessage('Could not login with this credentials.')
      setShowAlert(true)
      console.error(error)
    }
    console.log('values: ', values)
  }

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: initialValues,
    validationSchema
  });

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
    }
  }, [showAlert])


  return (
    <div className='flex flex-col h-screen justify-center'>
      <Slide direction='down' timeout={700} in={showAlert}>
        <Alert 
          severity={severityAlert}
          >
          {alertMessage}
        </Alert>
      </Slide>

      <h1 className='font-serif text-center text-3xl'>
        Jira issuer
      </h1>
      <h2 className='text-center text-lg mt-4'>
        A simple UI Application that helps create Jira stories, bugs or epics easily.
      </h2>
        <form onSubmit={formik.handleSubmit} className='flex flex-col w-1/2 self-center p-6 justify-center'>
          <Input
            label='Email'
            variant='outlined'
            id='email'
            name='email'
            type='text'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Input 
            label='Password'
            variant='outlined'
            id='password'
            name='password'
            type='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
            <div className="rounded-md shadow">
              <button
                type='submit'
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
              >
                Login
              </button>
            </div>
        </form>
    </div>
  )
}

export default Home;