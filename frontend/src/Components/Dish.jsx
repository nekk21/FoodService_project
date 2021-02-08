import image from '../images/image.jpg'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Context } from '..'

const StyledDish = styled.div`
    width: 15rem;
    margin: 1rem;

    .btn{
        margin-left 5px;
    }
    .description{
        word-break: break-word;
    }

    .wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
    }
`

const Dish = observer(props => {
    const { dish } = useContext(Context)

    let customerButton = ''

    let deleteButtonCook = ''

    let editButtonCook = ''

    if (props.cook) {
        deleteButtonCook = (
            <button
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
                onClick={() => {
                    dish.setDish(props)
                    props.deleteFunction()
                }}
            >
                Delete
            </button>
        )

        editButtonCook = (
            <button
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
                onClick={() => {
                    dish.setDish(props)
                    props.setActivatorEdit(true)
                }}
            >
                Edit
            </button>
        )
    } else {
        customerButton = (
            <button
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
                onClick={() => {
                    dish.setDish(props)
                }}
            >
                Order
            </button>
        )
    }

    return (
        <StyledDish>
            <div className="card small ">
                <div className="card-image waves-effect waves-block waves-light">
                    <img alt="here" className="activator" src={image} />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">
                        {props.name}
                        <i className="material-icons right">more_vert</i>
                    </span>
                    <p>
                        {customerButton} {deleteButtonCook}
                    </p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                        {props.name}
                        <i className="material-icons right">close</i>
                    </span>
                    <span className="card-title grey-text text-darken-4">
                        {props.price}$
                    </span>
                    <p className="description">{props.description}</p>
                    <p>Cook: {props.cookEmail}</p>
                    <p>{editButtonCook}</p>
                </div>
            </div>
        </StyledDish>
    )
})

export default Dish
