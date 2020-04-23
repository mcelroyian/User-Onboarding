import React from "react"

function Form(props) {

    const { onSubmit, errors, userData, onChange, onCheckChange, isDisabled } = props
    
    return (
        <div className='form-wrapper'>
        <form>
            <h2>Add New User</h2>
                <div className='errors'>
                {errors.email}
                {errors.termsAgree}
                </div>
                <div className='form'>
                <label htmlFor='name'>Name:</label>
                <input 
                    value={userData.name}
                    onChange={onChange}
                    type='text' 
                    name='name' />
                <label htmlFor='email'>Email:  </label>
                <input 
                    value={userData.email}
                    onChange={onChange}
                    type='text' 
                    name='email' />
                <label htmlFor='password'>Password:  </label>
                <input 
                    value={userData.password}
                    onChange={onChange}
                    type='text' 
                    name='password' />
                <label htmlFor='termsAgree'>I agree to the Terms of Service  </label>
                <input 
                    type='checkbox'
                    checked={userData.termsAgree}
                    onChange={onCheckChange} 
                    name='termsAgree' />
                </div>
                <button onClick={onSubmit} disabled={isDisabled}>Submit</button>
        </form>
        </div>
    )
}

export default Form

