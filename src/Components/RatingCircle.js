import styled from 'styled-components'
//----------------div styled-component-------------------
export const DivRating = styled.div`
transform: rotate(${props => props.rotate}deg);
animation: fill ease-in-out 2s;

@keyframes fill{
    0% {
      transform: rotate(0deg);
    }
    100% {
        transform:  rotate(${props => props.rotate}deg);

    }
  }
   
`;

