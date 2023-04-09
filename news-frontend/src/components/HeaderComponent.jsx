import React, {Component} from 'react';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div style={{background:'#EFF8FB'}}>
                <header>
                    <nav className="navbar1 navbar-expand-lg navbar-light bg-light navbar-mb-0">
                        <a href="http://localhost:3000" className="navbar-brand" style={{color:'#0080FF', fontFamily:"squreB"}}> Na-News</a>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;