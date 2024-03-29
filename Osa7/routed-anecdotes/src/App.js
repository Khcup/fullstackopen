import { useState } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from "react-router-dom"
import { useField } from './hooks'

const Menu = () => {

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/" >
        Anecdotes
      </Link>

      <Link style={padding} to="/create" >
        Create new
      </Link>

      <Link style={padding} to="/about" >
        About
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  console.log(anecdotes)
  return (
    <div>
      <h2>Anecdotes</h2>

      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id} >
            <Link to={`/anecdotes/${anecdote.id}`}>
              {anecdote.content}
            </Link>
          </li>)}
      </ul>

    </div >
  )
}

const Anecdote = ({ anecdote }) => (
  <div>
    <h3> <i> {anecdote.content} </i> by {anecdote.author} </h3>
    <p> has {anecdote.votes} votes </p>
    <p> for more info see <a href={anecdote.info} > {anecdote.info} </a> </p>
  </div >
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    <p>
      Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    </p>
  </div>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (event) => {
    event.preventDefault()

    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }

    props.addNew(newAnecdote)
  }

  const resetFields = (event) => {
    event.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  const { reset: resetContent, ...inputcontent } = content
  const { reset: resetInput, ...inputauthor } = author
  const { reset: resetInfo, ...inputinfo } = info


  return (
    <div>
      <h2>Create a new anecdote</h2>

      <form>

        <div>
          content:
          <input {...inputcontent} />
        </div>

        <div>
          author:
          <input {...inputauthor} />
        </div>

        <div>
          url for more info
          <input {...inputinfo} />
        </div>

        <button onClick={handleSubmit}>
          create
        </button>

        <button onClick={resetFields}>
          reset
        </button>

      </form>

    </div>
  )

}

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'testi1',
      author: 'testii1',
      info: 'testi1_url',
      votes: 0,
      id: 1
    },
    {
      content: 'testi2',
      author: 'testi2',
      info: 'testi2_url',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const navigate = useNavigate()


  const addNew = (anecdote) => {

    if (anecdote.author && anecdote.content && anecdote.info) {
      anecdote.id = Math.round(Math.random() * 10000)
      setAnecdotes(anecdotes.concat(anecdote))
      navigate("/")
      notify(`New anecdote ${anecdote.content} created!`)
    } else {
      notify('Author, content and info are required')
    }
  }


  const notify = (message) => {
    setNotification(message)

    setTimeout(() => {
      setNotification('')
    }, 5000);
  }

  /*
    const anecdoteById = (id) => {
      anecdotes.find(a => a.id === id)
    }


    const vote = (id) => {
      const anecdote = anecdoteById(id)

      const voted = {
        ...anecdote,
        votes: anecdote.votes + 1
      }

      setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }
   */

  const matchAnecdoteId = useMatch('/anecdotes/:id')
  const anecdote = matchAnecdoteId
    ? anecdotes.find(anecdote => anecdote.id === Number(matchAnecdoteId.params.id))
    : null


  return (
    <div>
      <h1>Software anecdotes</h1>

      <div>
        <Menu />
      </div>

      <div>
        {notification}
      </div>

      <div>
        <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <div>
        <Footer />
      </div>

    </div>
  )
}

export default App