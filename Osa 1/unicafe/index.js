import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, arvo }) => {
    return (
        <button onClick={ onClick }>{ arvo }</button>
    )
}

class Statistics extends React.Component {
    render() {
        if( this.props.arvot.length === 0 ) {
            return (
                <p>Ei yhtään palautetta annettu!</p>
            )
        }

        const keskiarvo = () => {
            let summa = this.props.arvot.reduce(( previous, current ) => current += previous )
            let keskiarvo = summa / this.props.arvot.length

            return Math.round( keskiarvo * 10 ) / 10
        }

        const prosentti = () => {
            let prosentti = ( this.props.hyva / this.props.arvot.length ) * 100

            return Math.round( prosentti * 10 ) / 10
        }
        
        return (
            <table>
                <tbody>
                    <Statistic teksti="Hyvä" arvo={ this.props.hyva } />
                    <Statistic teksti="Neutraali" arvo={ this.props.neutraali } />
                    <Statistic teksti="Huono" arvo={ this.props.huono } />
                    <Statistic teksti="Keskiarvo" arvo={ keskiarvo() } />
                    <Statistic teksti="Positiivisia" arvo={ `${ prosentti() } %` } />
                </tbody>
            </table>
        )
    }

}

const Statistic = ({ teksti, arvo }) => {
    return (
        <tr><td>{ teksti }</td><td>{ arvo }</td></tr>
    )
}

class App extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0,
            arvot: []
        }
    }
  
    palauteClick = ( palaute, arvo ) => {
        return () => {
            this.setState({
                [palaute]: this.state[palaute] + 1,
                arvot: this.state.arvot.concat( arvo )
            })
        }
    }

    clickHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
            arvot: this.state.arvot.concat( 1 )
        })
    }
  
    render() {
        return (
            <div>
                <div>
                    <h2>Anna palautetta</h2>
                    <div>
                        <Button onClick={ this.palauteClick( "hyva", 1 ) } arvo="Hyvä" />
                        <Button onClick={ this.palauteClick( "neutraali", 0 ) } arvo="Neutraali" />
                        <Button onClick={ this.palauteClick( "huono", -1 ) } arvo="Huono" />
                        
                    </div>
                    <h2>Statistiikka</h2>
                    <Statistics { ...this.state } />
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById( 'root' )
)