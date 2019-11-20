import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

class CreateExercise extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'',
            description: '',
            duration: 0,
            date: new Date(),
            users:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users/')
        .then(res => {
            if(res.data.length > 0){
                this.setState({
                    users: res.data.map(user => user.username),
                    username: res.data[0].username
                });
            }
        })
        .catch(err => console.log(err));
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    }
    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value,
        });
    }
    onChangeDuration = (e) => {
        this.setState({
            duration: e.target.value,
        });
    }
    onChangeDate = (date) => {
        this.setState({
            date: date,
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
      //  const exercise = {
      //      username: this.state.username,
      //      description: this.state.description,
      //      duration: this.state.duration,
      //      date: this.state.date,
      //      users:this.state.users
      //  }
      const exercise = {
          username: this.state.username,
          description: this.state.description,
          duration: this.state.duration,
          date: this.state.date
        };
      console.log(exercise);
      axios.post('http://localhost:5000/exercises/add',exercise)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
    }

    render(){
        return(
            <div className="container">
                <h3>Create New Exercise Log</h3>
                <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="ControlSelect1">
                    <Form.Label>Username :</Form.Label>
                    {console.log(this.state.users)}
                    <Form.Control as="select"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={(event) => this.onChangeUsername(event)}>
                        {   
                            this.state.users.map(user => <option key={user} value={user}> {user} </option>)
                        }
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>                
                    <Form.Control type="text" placeholder="Description" value={this.state.description} onChange={(event) => this.onChangeDescription(event)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Duration</Form.Label>                
                    <Form.Control type="text" placeholder="Duration" value={this.state.duration} onChange={(event) => this.onChangeDuration(event)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Date</Form.Label> 
                        <DatePicker placeholder="Date" selected={this.state.date} onChange={(event) => this.onChangeDate(event)}/>
                </Form.Group>
                    
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                </Form>
            </div>
        );
    }
};

export default CreateExercise;