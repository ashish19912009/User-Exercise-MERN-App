import React, {Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class CreateUser extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            username: ''
        }   
    }
    
    componentDidMount(){
        this.setState({
            username: ''
        });
    }
    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value,
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const user = {...this.state};
        console.log(user);
        axios.post('http://localhost:5000/users/add', user)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err));

        this.setState({username: ''});
    }

    render(){
        return(
            <div className="container">
                <h3>Create New User</h3>
                <Form onSubmit={this.onSubmit}>
                
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Username :</Form.Label>                
                    <Form.Control type="text" placeholder="Username" value={this.state.username} onChange={(event) => this.onChangeUsername(event)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                      Submit
                </Button>
                </Form>
            </div>
        );
    }
};

export default CreateUser;