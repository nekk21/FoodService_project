import React from 'react'
import styled from 'styled-components'

export const LoginModalStyle = styled.div`
    .modalWindow {
        height: 100vh;
        width: 100vw;
        background-color: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: 0.5s;
    }
    .modalWindow.active {
        pointer-events: all;
        opacity: 1;
        z-index: 1;
    }
    .modal_content {
        padding: 20px;
        border-radius: 12px;
        background-color: white;
        transform: scale(0.5);
        transition: 0.4s all;
        width: 30vw;
    }
    .modal_content.active {
        transform: scale(1);
    }
    .close {
        float: right;
        cursor: pointer;
    }
`

const ModalWindow = ({ active, setActive, children }) => {
    return (
        <LoginModalStyle>
            <div
                className={active ? 'modalWindow active' : 'modalWindow'}
                onClick={() => setActive(false)}
            >
                <div
                    className={
                        active ? 'modal_content active' : 'modal_content'
                    }
                    onClick={e => e.stopPropagation()}
                >
                    <i
                        className="close material-icons"
                        onClick={() => setActive(false)}
                    >
                        close
                    </i>
                    {children}
                </div>
            </div>
        </LoginModalStyle>
    )
}

export default ModalWindow
