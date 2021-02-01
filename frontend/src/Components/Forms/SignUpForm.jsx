import React from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { StyledForm } from './SignInForm'

function SignUpForm() {
    const SignUpSchema = yup.object().shape({
        firstName: yup
            .string()
            .min(2, 'Too Short!')
            .max(10, 'Too Long!')
            .required('Required'),
        lastName: yup
            .string()
            .min(2, 'Too Short!')
            .max(10, 'Too Long!')
            .required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        password: yup
            .string()
            .min(2, 'Too Short!')
            .max(10, 'Too Long!')
            .required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: null,
        },
        validationSchema: SignUpSchema,
        onSubmit: values => {
            console.log(values)
        },
    })

    return (
        <>
            <StyledForm>
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-field col s6">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                        {formik.errors.firstName && formik.touched.firstName ? (
                            <div className="warning">
                                {formik.errors.firstName}
                            </div>
                        ) : null}
                    </div>

                    <div className="input-field col s6">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        {formik.errors.lastName && formik.touched.lastName ? (
                            <div className="warning">
                                {formik.errors.lastName}
                            </div>
                        ) : null}
                    </div>

                    <div className="input-field col s6">
                        <label htmlFor="email">Email Address</label>
                        <input
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <div className="warning">{formik.errors.email}</div>
                        ) : null}
                    </div>

                    <div className="input-field col s6">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <div className="warning">
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>

                    <div>
                        <p>
                            <label>
                                <input
                                    name="role"
                                    type="checkbox"
                                    value="COOK"
                                    onChange={formik.handleChange}
                                />
                                <span>I want to be a COOK!</span>
                            </label>
                        </p>
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

export default SignUpForm
