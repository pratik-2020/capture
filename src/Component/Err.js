import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
function Err() {
    return (
        <div>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-9'>
                        <h4>
                            {localStorage.getItem('err')}
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Err
