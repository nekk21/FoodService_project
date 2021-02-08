import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
//
import ModalWindow from './ModalWindow'
import SignUpForm from './Forms/SignUpForm'
import SignInForm from './Forms/SignInForm'
import { logOut } from '../http/userAPI'
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
    .bramd-logo {
        font-family: inherit;
    }
    .arrow {
        height: 100%;
        display: flex;
        align-items: center;
    }
`

const NavBar = observer(({ page, userData }) => {
    const [modalActive, setmodalActive] = useState(false)
    const [modalActiveSign, setmodalActiveSign] = useState(false)

    const history = useHistory()

    const { user } = useContext(Context)
    const role = localStorage.getItem('role')

    ////////Content Inside
    let content = ''

    const modalLogInContent = <SignInForm />
    const modalSignUpContent = <SignUpForm />

    const logoutButton = (
        <li className="padd">
            <button
                onClick={() => {
                    logOut().then(data => {
                        if (data) {
                            localStorage.clear()
                            user.setIsAuth(false)
                        }
                    })
                }}
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
            >
                Log Out
            </button>
        </li>
    )

    const adminButton = (
        <li className="padd">
            <button
                onClick={() => {
                    history.push('/admin')
                }}
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
            >
                ADMIN PANEl
            </button>
        </li>
    )

    const cookButton = (
        <li className="padd">
            <button
                onClick={() => {
                    history.push('/cook')
                }}
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
            >
                KITCHEN
            </button>
        </li>
    )

    const backButton = (
        <li className="padd">
            <button
                onClick={() => {
                    history.push('/user')
                }}
                className="btn waves-effect waves-light #ffeb3b yellow black-text"
            >
                BACK
                <i className="arrow material-icons left">chevron_left</i>
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

        case '/cook':
            content = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {backButton}
                    {logoutButton}
                </ul>
            )

            break

        case '/admin':
            content = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {backButton}
                    {logoutButton}
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

    if (role === 'ADMIN' && page === '/user') {
        content = (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {adminButton}
                {logoutButton}
            </ul>
        )
    }

    if (role === 'COOK' && page === '/user') {
        content = (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
                {cookButton}
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
