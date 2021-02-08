import React from 'react'
import image from '../images/paper.jpg'
import styled from 'styled-components'

const StyledDay = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Lato');
    /* default */
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    /* .flip-card-container */
    .flip-card-container {
        --hue: 150;
        --primary: hsl(var(--hue), 50%, 50%);
        --white-1: hsl(0, 0%, 90%);
        --white-2: hsl(0, 0%, 80%);
        --dark: hsl(var(--hue), 25%, 10%);
        --grey: hsl(0, 0%, 50%);

        width: 250px;
        height: 360px;
        margin: 40px;

        perspective: 1000px;
    }

    /* .flip-card */
    .flip-card {
        width: inherit;
        height: inherit;

        position: relative;
        transform-style: preserve-3d;
        transition: 0.6s 0.1s;
    }

    /* hover and focus-within states */
    .flip-card-container:hover .flip-card,
    .flip-card-container:focus-within .flip-card {
        transform: rotateY(180deg);
    }

    /* .card-... */
    .card-front,
    .card-back {
        width: 100%;
        height: 100%;
        border-radius: 24px;

        background: var(--dark);
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;

        backface-visibility: hidden;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* .card-front */
    .card-front {
        transform: rotateY(0deg);
        z-index: 2;
    }

    /* .card-back */
    .card-back {
        transform: rotateY(180deg);
        z-index: 1;
    }

    /* figure */
    figure {
        z-index: -1;
    }

    /* figure, .img-bg */
    figure,
    .img-bg {
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;
    }

    /* img */
    img {
        height: 100%;
        border-radius: 24px;
    }

    /* figcaption */
    figcaption {
        display: block;

        width: auto;
        margin-top: 12%;
        padding: 8px 22px;

        font-weight: bold;
        line-height: 1.6;
        letter-spacing: 2px;
        word-spacing: 6px;
        text-align: right;

        position: absolute;
        top: 0;
        right: 12px;

        color: var(--white-1);
        background: hsla(var(--hue), 25%, 10%, 0.5);
    }

    /* hover state */
    .flip-card-container:hover .card-front .img-bg::before {
        width: 6px;
        border-left-color: var(--primary);
        border-right-color: var(--primary);
    }

    /* ul */
    ul {
        padding-top: 50%;
        margin: 0 auto;
        width: 70%;
        height: 100%;

        list-style: none;
        color: var(--white-1);

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    /* li */
    li {
        width: 100%;
        margin-top: 12px;
        padding-bottom: 12px;
        color: black;

        font-size: 20px;
        text-align: center;

        position: relative;
    }

    li:nth-child(2n) {
        color: var(--white-2);
    }

    li:not(:last-child)::after {
        content: '';

        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
        height: 1px;

        background: currentColor;
        opacity: 0.2;
    }
    .btn {
        padding: 3px;
    }
`

function Day(props) {
    return (
        <StyledDay>
            <div className="flip-card-container">
                <div className="flip-card">
                    <div className="card-front">
                        <figure>
                            <img src={image} alt="Brohm Lake" />
                            <figcaption>{props.day}</figcaption>
                        </figure>

                        <ul>
                            {props.order}
                            <li>ORDER CARD</li>
                        </ul>
                    </div>

                    <div className="card-back">
                        <figure>
                            <img src={image} alt="Brohm Lake" />
                        </figure>

                        <button className="btn waves-effect waves-light #ffeb3b yellow black-text">
                            CANCEL ORDER
                        </button>
                    </div>
                </div>
            </div>
        </StyledDay>
    )
}

export default Day
