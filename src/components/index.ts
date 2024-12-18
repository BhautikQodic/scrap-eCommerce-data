import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
`

interface ButtonColor {
    type?: string;
}

export const Button = styled.button<ButtonColor>`
    // width: 100%;
    height: 50px;
    background-color: ${({type}) => type === "danger" ? "#f44336" : "#4CAF50"};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-transform: uppercase;
`

export const Table = styled.table`
    th, td {
        padding: 10px 0;
    }

    
`

// export const Tr = styled.tr`
//     padding: 10px;
//     margin-bottom: 10px;

// `