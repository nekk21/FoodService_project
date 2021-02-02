import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
//
import ModalWindow from './ModalWindow'
import SignUpForm from './Forms/SignUpForm'
import SignInForm from './Forms/SignInForm'
import { Context } from '..'

export const NavStyled = styled.div`
    .nav-wrapper {
        padding-left: 2rem;
        padding-right: 2rem;
    }
    .space {
        padding-right: 1.5rem;
        padding-left: 1.5rem;
    }
    .padd {
        padding-left: 1.5rem;
    }
    .buttons {
        margin-left: 1.3rem;
    }
`

const NavBar = observer(({ page }) => {
    const [modalActive, setmodalActive] = useState(false)
    const [modalActiveSign, setmodalActiveSign] = useState(false)

    const { user } = useContext(Context)

    ////////Content Inside
    let content = ''

    const modalLogInContent = <SignInForm />
    const modalSignUpContent = <SignUpForm />

    const logoutButton = (
        <li className="padd">
            <button
                onClick={() => {}}
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
            >
                Log Out
            </button>
        </li>
    )

    switch (page) {
        case '/':
            content = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className="buttons">
                        <button
                            className="btn waves-effect waves-light #ffeb3b yellow black-text"
                            onClick={() => setmodalActiveSign(true)}
                        >
                            Sign Up
                        </button>
                    </li>
                    <li className="buttons">
                        <button
                            className="btn waves-effect waves-light #ffeb3b yellow black-text"
                            onClick={() => setmodalActive(true)}
                        >
                            Sign In
                        </button>
                    </li>
                </ul>
            )

            break

        default:
            content = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {logoutButton}
                </ul>
            )
    }

    if (user.isAuth) {
        content = (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {logoutButton}
            </ul>
        )
    }

    return (
        <>
            <NavStyled>
                <nav>
                    <div className="nav-wrapper #424242 grey darken-3">
                        <Link to="/" className="brand-logo">
                            FOOD SERVISE
                        </Link>
                        {content}
                    </div>
                </nav>
            </NavStyled>
            <ModalWindow
                active={modalActive}
                setActive={setmodalActive}
                children={modalLogInContent}
            />
            <ModalWindow
                active={modalActiveSign}
                setActive={setmodalActiveSign}
                children={modalSignUpContent}
            />
        </>
    )
})

export default NavBar
