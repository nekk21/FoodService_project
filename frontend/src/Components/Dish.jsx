import image from '../images/image.jpg'
import styled from 'styled-components'

const StyledDish = styled.div`
    width: 15rem;
    margin: 2rem;

    .btn{
        margin-left 5px;
    }
`

function Dish(props) {
    let customerButton = ''

    let deleteButtonCook = ''

    let editButtonCook = ''

    if (props.cook) {
        deleteButtonCook = (
            <button
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
                onClick={() => {}}
            >
                Delete
            </button>
        )

        editButtonCook = (
            <button
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
                onClick={() => {}}
            >
                Edit
            </button>
        )
    } else {
        customerButton = (
            <button
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
                onClick={() => {}}
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
                        {props.title} Card Title
                        <i className="material-icons right">more_vert</i>
                    </span>
                    <p>
                        {customerButton} {deleteButtonCook}
                    </p>
                </div>
                <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">
                        Card Title
                        <i className="material-icons right">close</i>
                    </span>
                    <span className="card-title grey-text text-darken-4">
                        Price $
                    </span>
                    <p>
                        Here is some more information about this product that is
                        only revealed once clicked on.
                    </p>
                    <p>{editButtonCook}</p>
                </div>
            </div>
        </StyledDish>
    )
}

export default Dish
