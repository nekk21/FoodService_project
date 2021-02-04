import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import * as yup from 'yup'
import { Context } from '../..'
import { logIn } from '../../http/userAPI'
import { StyledForm } from './StyledForm'
import M from 'materialize-css'

const SignInForm = observer(() => {
    const { user } = useContext(Context)

    const history = useHistory()
    ///signIn in func

    const signIn = async data => {
        try {
            const response = await logIn(data)
            const userData = response.data
            user.setIsAuth(true)
            user.setUser(userData)
            history.push('/user')
            ///
            console.log(user.isAuth)
            ///
            return response
        } catch (e) {
            M.toast({ html: 'Wrong input DATA!!!' })
        }
    }

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
            signIn(values)
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
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </StyledForm>
        </>
    )
})

export default SignInForm
