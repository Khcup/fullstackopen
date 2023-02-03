import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            paras: -1,
            pisteet: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0
            }
        }
    }

    randomiseSelected = () => {
        return () => {
            this.setState({ selected: Math.floor( Math.random() * this.props.anecdotes.length ) })
        }
    }

    voteForAnecdote = () => {
        let pisteet = Object.assign( {}, this.state.pisteet )
        pisteet[ ( this.state.selected ) ] += 1

        let keys = Object.keys( pisteet )
        keys.sort( function( a, b ) {
            return pisteet[b] - pisteet[a]
        })

        return () => {
            this.setState({ pisteet, paras: keys[0] })
        }
    }

    render() {
        console.log( this.state.pisteet )
        console.log( this.state.paras )
        return (
            <div>
                <h2>Anekdootit</h2>
                <p>{ this.props.anecdotes[ this.state.selected ] }</p>
                <button onClick={ this.voteForAnecdote() }>Äänestä</button>
                <button onClick={ this.randomiseSelected() }>Seuraava anekdootti</button>
                <h2>Eniten ääniä saanut anekdootti</h2>
                <p>{ this.props.anecdotes[ this.state.paras ] }</p>
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)