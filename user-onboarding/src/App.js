import React, { useState, useEffect } from 'react';
import axios from 'axios'
import * as yup from 'yup'
import Form from './Form';
import './App.css';

// Yum Validation schema

const schema = yup.object().shape({
  name: yup
    .string(),
  password: yup
    .string(),
  email: yup
    .string()
    .email('A valid email address is required')
    .required('Email is required'),
  termsAgree: yup
    .boolean()
    .oneOf([true], 'Must Accept Terms and Conditions'),
})

// DATA ENDPOINT
const url = 'https://reqres.in/api/users'

// USER TEMPLATE
const userTemplate = {
  name: '',
  email: '',
  password: '',
  termsAgree: false,
}

//ERRORS TEMPLATE
const initialErrors = {
  email: '',
  termsAgree: '',
}

function App() {
///////////// STATE LIVES HERE
const [users, setUsers] = useState([])
const [newUser, SetNewUser] = useState(userTemplate)
const [isDisabled, setIsDisabled] = useState(true)
const [errors, setErrors] = useState(initialErrors)

///////////// END OF STATE

///////////// EVENT HANDLES LIVE HERE
//HANDLE FORM INPUT CHANGE
const onChange = e => {
  //save values ahead of time
  const name = e.target.name
  const value = e.target.value

  // run validation
  yup
    .reach(schema, name)
    .validate(value)
    .then(valid => {
      // clear errors
      setErrors({
        ...errors, [name]: '',
      })
    })
    .catch(err => {
      // add errors
      setErrors({
        ...errors, [name]: err.errors[0],
      })
    })

  // update state
  SetNewUser({...newUser, [name]:value})
}

//HANDLE FORM CHECKBOX CHANGE
const onCheckChange = e => {
  const name = e.target.name
  const value = e.target.checked

  yup
    .reach(schema, name)
    .validate(value)
    .then(valid => {
      // clear errors
      setErrors({
        ...errors, [name]: '',
      })
    })
    .catch(err => {
      // add errors
      setErrors({
        ...errors, [name]: err.errors[0],
      })
    })



  SetNewUser({...newUser, [name]:value})

}

//HANDLE FORM SUBMIT
const onSubmit = (e) => {
  e.preventDefault()
  sendUser(newUser)
  SetNewUser(userTemplate)
}

///////////// END OF EVENT HANDLERS

///////////// HELPER FUNCTIONS & EFFECTS
//SEND DATA TO SERVER
const sendUser = (userData) => {
  axios.post(url, userData)
    .then(res => {
      let user = res.data
      setUsers([...users, user])
    })
    .catch(err => {
      debugger
    })
}

// VALIDATE FORM
useEffect(() => {
  schema.isValid(newUser)
    .then(isValid => setIsDisabled(!isValid))
}, [newUser])

///////////// END OFHELPER FUNCTIONS & EFFECTS

// OUTPUT
  return (
    <div className="App">
      <h1>User List</h1>
      <Form errors={errors} userData={newUser} isDisabled={isDisabled} onChange={onChange} onSubmit={onSubmit} onCheckChange={onCheckChange} />
      {users.map((user, i) => <pre key={i}>{JSON.stringify(user, null, 2)}</pre>)}
    </div>
  );
}

export default App;
