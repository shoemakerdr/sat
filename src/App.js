import React, { Component } from 'react'
import styles from './App.css'
import searchIcon from './images/search.png'
import chairIcon from './images/chair.svg'
import FloorPlanEditor from './components/FloorPlanEditor'

class App extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <header className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <h1 className={styles.title}>Sat</h1>
                        <img src={chairIcon} alt='chair icon' className={styles.chair}/>
                    </div>
                    <div className={styles.searchWrapper}>
                        <img src={searchIcon} alt='search icon' className={styles.searchIcon} />
                        <input type='text' className={styles.searchInput} />
                    </div>
                </header>
                <div className={styles.appContent}>
                    <FloorPlanEditor />
                </div>
            </div>
        )
    }
}

export default App
