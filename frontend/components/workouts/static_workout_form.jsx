import React from 'react';
import moment from 'moment';
import StaticWorkoutIndexItem from './static_workout_index_item.jsx';

class StaticWorkoutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      user_id: this.props.currentUser.id,
      date: moment().format("YYYY-MM-DD"),
      duration: null,
      focus: "",
      calories: null,
      notes: "",
      exercises: []
    };
    this.updateState = this.updateState.bind(this);
    this.addExercise = this.addExercise.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCalories = this.setCalories.bind(this);
    this.handleExercises = this.handleExercises.bind(this);
  }

  componentDidMount() {
    this.props.requestExercises();
  }

  handleSubmit() {
    this.setCalories();
    this.handleExercises();
    delete this.state.exercises;
    this.props.createStaticWorkout(this.state);
  }

  updateState (field) {
    return e => {
      this.setState({[field]: e.currentTarget.value});
    };
  }

  setCalories() {
    const weightLbs = this.props.currentUser.weight;
    const duration = this.state.duration;
    const calories = (weightLbs * duration * .039);
    this.state.calories = calories;
    this.handleExercises();
  }

  handleExercises() {
    //todo: add workoutexercises model, iterate over this exercises and
    //create a new workout exercise for each
  }

  addExercise() {
    return e => {
      if(e.currentTarget.value !== "Select Exercise") {
        const exercises = this.props.exercises;
        const exerciseKeys = Object.keys(exercises);
        exerciseKeys.forEach(key => {
          if (exercises[key].title === e.currentTarget.value) {
            this.setState({exercises: this.state.exercises.concat(exercises[key])});
          }
        });
      }
    };
  }

  render() {

    const allExercises = [];
    const myExercises = [];

    if(!!this.props.exercises) {
      const exerciseKeys = Object.keys(this.props.exercises);
      let that = this;
      exerciseKeys.forEach(key => {
        allExercises.push(<option key={key} value={that.props.exercises[key].title}>
          {that.props.exercises[key].title}</option>);
      });
    }

    if (this.state.exercises.length > 0) {
      this.state.exercises.forEach(exercise => {
        myExercises.push(
          <div key={exercise.id} className="static-workout-exercise-item">
            <h3>{exercise.title}</h3>
            <label>
              Reps
              <input type="text" />
            </label>
            <label>
              Sets
              <input type="text" />
            </label>
            <label>
              Weight
              <input type="text" />
            </label>
          </div>
        );
      });
    }

    return(
      <div className="static-workout-form-outer">
        <div className="static-workout-form-container">
          <form className="static-workout-form" onSubmit={this.handleSubmit}>
            <label>
              <h2>Date:</h2>
              <input className="static-workout-date" type="date" value={this.state.date}
                onChange={this.updateState("date")} />
            </label>
            <label>
              <h2>Duration(minutes):</h2>
              <input className="static-workout-duration" type="text" value={this.state.duration}
                onChange={this.updateState("duration")} />
            </label>
            <label>
              <h2>Notes:</h2>
              <textarea className="static-workout-form-notes" value={this.state.notes}
                onChange={this.updateState("notes")} />
            </label>
            <label className="exercise-dropdown-label"><h2>Add Exercises:</h2>
              <select className="static-workout-form-select"
                onChange={this.addExercise()}>
                <option>Select Exercise</option>
                {allExercises}
              </select>
            </label>
            <div>
            </div>
            <input type="submit" className="static-workout-form-submit" value="Create" />
          </form>
        </div>
        <div className="static-exercises-container">
          {myExercises}
        </div>
      </div>
    );
  }
}

export default StaticWorkoutForm;
