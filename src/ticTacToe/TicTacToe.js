import React from 'react';
import styles from './ticTacToe.module.scss';
import Board from '../components/board/Board';

const TicTacToe = (props) => {

    return (
        <div className={styles.container}>
            <h2>Tic Tac Toe Game</h2>
            <Board />
        </div>
    )
};
export default TicTacToe;