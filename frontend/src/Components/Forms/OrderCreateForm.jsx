import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '../..'
import * as yup from 'yup'
import { StyledForm } from './StyledForm'
import { getTimestamp } from '../../CostomFunc/customFunctions'
import { useFormik } from 'formik'
import M from 'materialize-css'

const OrderCreateForm = observer(props => {
    const { dish } = useContext(Context)

    ///date now
    const today = Date.now()

    //// obj with all data of Date
    const todayStr = getTimestamp(today)

    ////form settings
    const DishCreateSchema = yup.object().shape({
        date: yup.string().required('Required!'),

        time: yup.string().required('Required!'),
    })

    const formik = useFormik({
        ///////////////////////!
        initialValues: {
            date: '',
            time: '',
        },
        validationSchema: DishCreateSchema,
        onSubmit: values => {
            console.log(values)
        },
    })

    //pickers initialization
    document.addEventListener('DOMContentLoaded', () => {
        const timepicker = document.querySelectorAll('.timepicker')
        const instanceTime = M.Timepicker.init(timepicker, {
            twelveHour: false,
        })

        const datepicker = document.querySelectorAll('.datepicker')
        const instanceDate = M.Datepicker.init(datepicker, { firstDay: 1 })
    })

    return (
        <StyledForm>
            <div>
                <p>
                    <strong>Today</strong> : {todayStr.fullDate}
                </p>
            </div>

            <div>
                <strong> A good choice :)</strong>
                <p>
                    <strong> Name:</strong> {dish.dish.name}
                    <br /> <strong>Price:</strong> {dish.dish.price}$
                </p>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <input
                    name="date"
                    type="text"
                    className="validate datepicker" //datepicker
                    onChange={formik.handleChange}
                    value={formik.values.date}
                />
                {formik.errors.date && formik.touched.date ? (
                    <div className="warning">{formik.errors.date}</div>
                ) : null}

                <input
                    name="time"
                    type="text"
                    className="validate timepicker" //timepicker
                    onChange={formik.handleChange}
                    value={formik.values.time}
                />
                {formik.errors.time && formik.touched.time ? (
                    <div className="warning">{formik.errors.time}</div>
                ) : null}

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

export default OrderCreateForm
