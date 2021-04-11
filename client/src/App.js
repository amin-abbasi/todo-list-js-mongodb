import logo  from './logo.svg'
import axios from 'axios'
import { Component } from 'react'
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Container,
  Row,
  Col,
  Button,
  // Form,
  // FormGroup,
  // Label,
  Input,
  Spinner,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from 'reactstrap'

// Fill Board List
const BoardList = ({ board }) => {
  const color = (board.privacy === 'private') ? 'success' : 'warning'
  return (
    <ListGroupItem tag="button" href="#" action>
      {board.title}&nbsp;
      <Badge pill color={color} >{board.privacy}</Badge>
    </ListGroupItem>
  )
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentBoard: null,
      boards: [],
      isLoading: false,
      error: null,
      baseUrl: 'http://localhost:4000/api/v1',
    }
  }

  componentDidMount() {
    this.boardList()
  }

  // ------------------------------------ CRUD on Boards ------------------------------------
  // Create Board
  async boardCreate(title, privacy) {
    this.setState({ isLoading: true, error: null })
    const { baseUrl, boards } = this.state
    try {
      const response = await axios.post(`${baseUrl}/boards`, { title, privacy })
      console.log('create board response: ', response)
      if (!response.data.result || response.data.result == null)
        this.setState({ isLoading: false, error: response })
      else {
        boards.push(response.data.result)
        this.setState({ isLoading: false, boards })
      }
    } catch (err) {
      console.log(' -------- error: ', err)
      this.setState({ isLoading: false, error: err.toString() })
    }
  }

  // List Boards
  async boardList() {
    this.setState({ isLoading: true, error: null })
    const { baseUrl } = this.state
    try {
      const response = await axios.get(`${baseUrl}/boards`)
      console.log('list boards response: ', response)
      if (!response.data.result || response.data.result == null)
        this.setState({ isLoading: false, error: response })
      else {
        const boards = response.data.result.list
        this.setState({ isLoading: false, boards })
      }
    } catch (err) {
      console.log(' -------- error: ', err)
      this.setState({ isLoading: false, error: err.toString() })
    }
  }

  // Board Details
  async boardDetails(boardId) {
    this.setState({ isLoading: true, error: null })
    const { baseUrl } = this.state
    try {
      const response = await axios.post(`${baseUrl}/boards`)
      console.log('create board response: ', response)
      if (!response.data.result || response.data.result == null)
        this.setState({ isLoading: false, error: response })
      else {
        const currentBoard = response.data.result
        console.log('Current Board ', currentBoard)
        this.setState({ isLoading: false, currentBoard })
      }
    } catch (err) {
      console.log(' -------- error: ', err)
      this.setState({ isLoading: false, error: err.toString() })
    }
  }

  // Update Board
  async boardUpdate(boardId, title, privacy) {
    this.setState({ isLoading: true, error: null })
    const { baseUrl, boards } = this.state
    try {
      const response = await axios.put(`${baseUrl}/boards/${boardId}`, { title, privacy })
      console.log('create board response: ', response)
      if (!response.data.result || response.data.result == null)
        this.setState({ isLoading: false, error: response })
      else {
        boards.push(response.data.result)
        this.setState({ isLoading: false, boards })
      }
    } catch (err) {
      console.log(' -------- error: ', err)
      this.setState({ isLoading: false, error: err.toString() })
    }
  }

  // Delete Board
  async boardDelete(title, privacy) {
    this.setState({ isLoading: true, error: null })
    const { baseUrl, boards } = this.state
    try {
      const response = await axios.post(`${baseUrl}/boards`, { title, privacy })
      console.log('create board response: ', response)
      if (!response.data.result || response.data.result == null)
        this.setState({ isLoading: false, error: response })
      else {
        boards.push(response.data.result)
        this.setState({ isLoading: false, boards })
      }
    } catch (err) {
      console.log(' -------- error: ', err)
      this.setState({ isLoading: false, error: err.toString() })
    }
  }

  render() {
    const { isLoading, error, boards } = this.state

    return (
      <div>

        {/* <h1 style={{margin: '20px'}}>To-Do List App</h1>{' '} */}

        {/* Header */}
        <Container className="App-header" style={{ margin: '10pt' }}>
          <Row>
            <Col xs={3} md={2}>
              <header>
                <img src={logo} className="App-logo" alt="logo" />
              </header>
            </Col>
            <Col xs={6} md={6}>
              <p className="App-name" style={{ fontSize: '28pt', margin: '20pt' }}><strong>To-Do List App</strong></p>
              &nbsp;&nbsp;
              {isLoading && <div className='App-loading'><Spinner color="primary" /></div>}
            </Col>
            <Col>

            </Col>
          </Row>
          <Row>
            <Col>

              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                  </InputGroupText>
                </InputGroupAddon>

                <Input placeholder="Your new board name..." id="boardName" type="text" name="boardName" />

                <InputGroupAddon addonType="append">
                  <Button color="primary" onClick={this.boardCreate('test', 'public')} >Create</Button>
                </InputGroupAddon>
              </InputGroup>

              <br></br>

              {/* <Form inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="boardName" className="mr-sm-2">Board Name</Label>
                  <Input type="text" name="boardName" id="boardName" placeholder="my board"/>
                </FormGroup>
                <Button color='primary' onClick={this.boardCreate()}>Submit</Button>
              </Form> */}

            </Col>
          </Row>
        </Container>

        <br></br>

        {isLoading && <div style={{margin: '20px'}} className="spinner-border text-primary" role="status"> <span className="sr-only">Loading...</span> </div>}

        {/* Error Message */}
        {error && <div style={{margin: '20px'}} className="card"><div className="card-body">{error}</div></div>}

        {/* Boards List */}
        <ListGroup className='list' style={{ margin: '10pt' }}>
          { boards.map((board) => (<BoardList board={board} key={board._id}></BoardList>) ) }
        </ListGroup>

      </div>
    )
  }
}

export default App
