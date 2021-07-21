import React from 'react'

import Header from './components/header/Header'
import ViewUI from './views/ViewUI'

export default function DefaultLayout() {
    return (
        <>
            <Header />
            <div id="canvas">
                <div className="container-fluid">
                    <ViewUI />
                </div>
            </div>
        </>
    )
}
