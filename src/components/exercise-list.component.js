import React, {Component} from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Exercise from './exercise';

class ExerciseList extends Component{
    state = {
        exercises: []
    }

    componentDidMount(){
        axios.get('http://localhost:5000/exercises/')
        .then(res => {
            console.log(res);
            this.setState({
                exercises: res.data
            });
        })
        .catch(err => console.log(err));
    }

    deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/'+ id)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }

    exerciseList = () => {
        return this.state.exercises.map(el => {
            return <Exercise exercise={el} deleteExercise={this.deleteExercise} key={el._id}/>
        });
    }

    render(){
        return(
            <div>
                <h3>Logged Exercises</h3>
                <Table striped bordered hover size="sm">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Description</th>
                          <th>Duration</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.exerciseList()}
                      </tbody>
                </Table>    
            </div>
        );
    }
};

export default ExerciseList;