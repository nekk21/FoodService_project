import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ModalWindow from './ModalWindow'

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

function NavBar({ page }) {
    const [modalActive, setmodalActive] = useState(false)
    const [modalActiveSign, setmodalActiveSign] = useState(false)

    let modalLogIn = ''
    let modalSignUp = ''

    let content = ''

    ////////Content Inside

    const modalLogInContent = ''
    const modalSignUpContent = ''

    // const buttonLogOut = (
    //     <li className="padd">
    //         <button
    //             onClick={() => {}}
    //             className="btn waves-effect waves-light #757575 grey darken-1"
    //         >
    //             Log Out
    //         </button>
    //     </li>
    // )

    switch (page) {
        case '/':
            modalLogIn = (
                <ModalWindow
                    active={modalActive}
                    setActive={setmodalActive}
                    children={modalLogInContent}
                />
            )

            modalSignUp = (
                <ModalWindow
                    active={modalActiveSign}
                    setActive={setmodalActiveSign}
                    children={modalSignUpContent}
                />
            )

            content = (
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li className="buttons">
                        <button
                            className="btn waves-effect waves-light #757575 grey darken-1"
                            onClick={() => setmodalActiveSign(true)}
                        >
                            Sign Up
                        </button>
                    </li>
                    <li className="buttons">
                        <button
                            className="btn waves-effect waves-light #757575 grey darken-1"
                            onClick={() => setmodalActive(true)}
                        >
                            Log In
                        </button>
                    </li>
                </ul>
            )

            break

        case '':
            content = ''

            break
        case '///':
            content = ''
            break
        default:
            content = ''
    }

    return (
        <>
            <NavStyled>
                <nav>
                    <div className="nav-wrapper #bdbdbd grey lighten-1">
                        <Link to="/" className="brand-logo">
                            FOOD SERVISE
                        </Link>
                        {content}
                    </div>
                </nav>
            </NavStyled>
            {modalLogIn}
            {modalSignUp}
        </>
    )
}

export default NavBar
