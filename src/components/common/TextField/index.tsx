import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

export const Input = (props: TextFieldProps) => {
  const { id, variant, label, onChange, value, error, helperText, name, type, className } = props
  return (
    <TextField
      style={{ marginBottom: '20px' }}
      className='p-4'
      fullWidth
      id={id}
      variant={variant}
      label={label}
      onChange={onChange}
      value={value}
      error={error}
      helperText={helperText}
      name={name}
      type={type}
    />
  )
}

export default Input