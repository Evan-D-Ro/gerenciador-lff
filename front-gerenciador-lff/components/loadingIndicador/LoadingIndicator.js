import React, { useEffect, useState } from 'react';
import styles from './LoadingIndicator.module.css';

function LoadingIndicator(props){

    let timeWait = 10;
    
    if (props.timeWait)
        timeWait = props.timeWait;

    const [showLoading, setShowLoading] = useState(false)

    useEffect(() => {
        let timer1 = setTimeout(() => setShowLoading(true), timeWait);

        return () => {
            clearTimeout(timer1)
        }
    }, []);

    let saida = showLoading ?
            <div className={styles.siteLoading} style={props.style}>
                <img src={"/loading.png"} />
            </div>: null;

    return saida;
}

export default LoadingIndicator;
