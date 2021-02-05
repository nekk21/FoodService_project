import React from 'react'
import Day from './Day'
import styled from 'styled-components'

const StyledDayContainer = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin: 2rem;
    justify-content: center;
`

function DaysContainer() {
    return (
        <StyledDayContainer>
            <Day day={'Mon'} />
            <Day day={'Tue'} />
            <Day day={'Wed'} />
            <Day day={'Thu'} />
            <Day day={'Fri'} />
        </StyledDayContainer>
    )
}

export default DaysContainer
