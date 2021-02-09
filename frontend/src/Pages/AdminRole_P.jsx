import React, { useContext, useEffect } from 'react'
import NavBar from '../Components/NavBar'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { getUsers, deleteUserEmail } from '../http/userAPI'
import M from 'materialize-css'

const StyledUsersList = styled.div`
    border: 1px solid black;
    width: 50%;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 30px;
    background: #424242;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-bottom: 30px;

    .nameList {
        display: block;
        margin: 0 auto;
        color: white;
        font-family: inherit;
    }

    .element {
        width: 100%;
        color: white;
        border: 2px solid white;
        margin: 15px 10px;
        display: flex;
        justify-content: space-around;
        border-radius: 15px;
    }

    .paragraph {
        width: 25%;
    }
`

const AdminRole_P = observer(() => {
    const page = '/admin'
    const { user } = useContext(Context)

    useEffect(() => {
        getUsers().then(data => {
            user.setUsers(data)
        })
    }, [user])

    const deleteUser = async email => {
        try {
            const confirm = window.confirm(
                `Are u sure? You want to delete this user - ${email} ?!`
            )
            if (confirm) {
                const response = await deleteUserEmail(email)
                //rerender
                const users = await getUsers()
                user.setUsers(users)
                return response
            }

            AdminRole_P.forceUpdate(() => {})
        } catch (e) {
            M.toast({ html: 'User still have active order/dish!!!' })
        }
    }

    return (
        <div>
            <NavBar page={page} />
            <StyledUsersList className="wrapper">
                <h2 className="nameList">Users List</h2>
                {user.users.map(user => (
                    <div className="element" key={user.id}>
                        <p className="paragraph">Name: {user.firstName}</p>
                        <p className="paragraph">Email: {user.email}</p>
                        <p className="paragraph">Role: {user.role?.name}</p>
                        <p>
                            <button
                                className="btn waves-effect waves-light #ff1744 red accent-3 black-text"
                                onClick={() => {
                                    deleteUser(user.email)
                                }}
                            >
                                <i className="material-icons left">
                                    delete_forever
                                </i>
                                DELETE USER
                            </button>
                        </p>
                    </div>
                ))}
            </StyledUsersList>
        </div>
    )
})

export default AdminRole_P
