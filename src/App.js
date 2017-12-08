import React, { Component } from 'react'
import styles from './App.css'
import FloorPlanEditor from './components/FloorPlanEditor'

class App extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Welcome to Sat</h1>
                </header>
                <div className={styles.appContent}>
                    <FloorPlanEditor />
                </div>
            </div>
        )
    }
}

export default App
