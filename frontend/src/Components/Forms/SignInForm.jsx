import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import styled from 'styled-components'

export const StyledForm = styled.div`
    .warning {
        color: crimson;
    }
    .buttons {
        display: flex;
        justify-content: center;
    }

    .input-field label {
        color: #000;
    }

    .input-field input[type='text']:focus + label {
        color: #000;
    }

    .input-field input[type='text']:focus {
        border-bottom: 1px solid #ffeb3b;
        box-shadow: 0 1px 0 0 #ffeb3b;
    }

    .input-field input[type='password']:focus {
        border-bottom: 1px solid #ffeb3b;
        box-shadow: 0 1px 0 0 #ffeb3b;
    }

    .input-field input[type='email']:focus {
        border-bottom: 1px solid #ffeb3b;
        box-shadow: 0 1px 0 0 #ffeb3b;
    }

    .input-field input[type='number']:focus {
        border-bottom: 1px solid #ffeb3b;
        box-shadow: 0 1px 0 0 #ffeb3b;
    }

    .input-field input[type='text'].invalid {
        border-bottom: 1px solid #000;
        box-shadow: 0 1px 0 0 #000;
    }

    .input-field .prefix.active {
        color: #000;
    }
`

const SignInForm = () => {
    const SignInSchema = yup.object().shape({
        email: yup
            .string()
            .email('Invalid email')
            .required('Field is Required'),
        password: yup
            .string()
            .max(10, 'Too Long!')
            .min(2, 'Too Short!')
            .required('Field is Required'),
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: SignInSchema,
        onSubmit: values => {
            console.log(values)
        },
    })
    return (
        <>
            <StyledForm>
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-field col s6">
                        <label htmlFor="email">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            className="validate"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <div className="warning">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="input-field col s6">
                        <label htmlFor="password">Password </label>
                        <input
                            name="password"
                            type="password"
                            className="validate"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <div className="warning">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>

                    <div className="buttons">
                        <button
                            className="btn waves-effect waves-light #ffeb3b yellow black-text"
                            type="submit"
                            name="action"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </StyledForm>
        </>
    )
}

export default SignInForm
