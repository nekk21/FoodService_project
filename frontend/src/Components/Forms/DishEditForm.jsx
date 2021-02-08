import { useFormik } from 'formik'
import { observer } from 'mobx-react-lite'
import * as yup from 'yup'
import { StyledForm } from './StyledForm'

const DishEditForm = observer(props => {
    const DishCreateSchema = yup.object().shape({
        name: yup.string().max(20, 'Too Long!').min(2, 'Too Short!'),
        description: yup.string().max(200, 'Too Long!').min(10, 'Too Short!'),
        price: yup
            .number()
            .max(999, 'Dish cost cant be more then 999$')
            .min(0.1, 'Dish cost cant be less then 0,1$'),
    })

    const formik = useFormik({
        ///////////////////////!
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
                    <input
                        placeholder={props.targetData.name}
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
                    <textarea
                        placeholder={props.targetData.description}
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
                    <input
                        placeholder={props.targetData.price}
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

export default DishEditForm
