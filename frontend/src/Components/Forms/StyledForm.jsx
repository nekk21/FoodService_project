import styled from 'styled-components'

export const StyledForm = styled.div`
    .warning {
        color: black;
        display: flex;
        justify-content: center;
        background-color: darksalmon;
        border-radius: 10px;
    }
    .buttons {
        display: flex;
        justify-content: center;
    }

    .input-field label {
        color: #000;
    }

    .input-field input[type='text']:focus + label {
        color: #000;
    }

    .input-field input[type='text']:focus {
        border-bottom: 1px solid #ffeb3b;
        box-shadow: 0 1px 0 0 #ffeb3b;
    }

    .input-field input[type='password']:focus {
        border-bottom: 1px solid #ffeb3b;
        box-shadow: 0 1px 0 0 #ffeb3b;
    }

    .input-field input[type='email']:focus {
        border-bottom: 1px solid #ffeb3b;
        box-shadow: 0 1px 0 0 #ffeb3b;
    }

    .input-field input[type='number']:focus {
        border-bottom: 1px solid #ffeb3b;
        box-shadow: 0 1px 0 0 #ffeb3b;
    }

    .input-field input[type='text'].invalid {
        border-bottom: 1px solid #000;
        box-shadow: 0 1px 0 0 #000;
    }

    .input-field .prefix.active {
        color: #000;
    }
`
