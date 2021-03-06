import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { StyledForm } from './StyledForm'

const DishCreateForm = observer(props => {
    const DishCreateSchema = yup.object().shape({
        name: yup
            .string()
            .required('Field is Required')
            .max(20, 'Too Long!')
            .min(2, 'Too Short!'),
        description: yup
            .string()
            .max(200, 'Too Long!')
            .min(10, 'Too Short!')
            .required('Field is Required'),
        price: yup
            .number()
            .required('Field is Required')
            .max(999, 'Dish cost cant be more then 999$')
            .min(0.1, 'Dish cost cant be less then 0,1$'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
        },
        validationSchema: DishCreateSchema,
        onSubmit: values => {
            props.submit(values)
        },
    })

    return (
        <StyledForm>
            <form onSubmit={formik.handleSubmit}>
                <div className="input-field col s6">
                    <label htmlFor="name">Dish Name</label>
                    <input
                        name="name"
                        type="text"
                        className="validate"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors.name && formik.touched.name ? (
                        <div className="warning">{formik.errors.name}</div>
                    ) : null}
                </div>

                <div className="input-field col s6">
                    <label htmlFor="description">Dish description </label>
                    <textarea
                        name="description"
                        className="materialize-textarea validate"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors.description && formik.touched.description ? (
                        <div className="warning">
                            {formik.errors.description}
                        </div>
                    ) : null}
                </div>

                <div className="input-field col s6">
                    <label htmlFor="price">Price</label>
                    <input
                        name="price"
                        type="number"
                        className="validate"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    {formik.errors.price && formik.touched.price ? (
                        <div className="warning">{formik.errors.price}</div>
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
    )
})

export default DishCreateForm
