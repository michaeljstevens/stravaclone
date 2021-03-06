import { connect } from 'react-redux';
import Stats from './stats.jsx';
import {requestStaticWorkouts} from '../../actions/static_workout_actions.js';
import {requestTravelWorkouts} from '../../actions/travel_workout_actions.js';


const mapStateToProps = state => {
  return ({
    currentUser: state.session.currentUser,
    staticWorkouts: state.staticWorkouts.allStaticWorkouts,
    travelWorkouts: state.travelWorkouts.allTravelWorkouts,
    staticWorkout: state.staticWorkouts.staticWorkout,
    travelWorkout: state.travelWorkouts.travelWorkout
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return ({
    requestStaticWorkouts: () => dispatch(requestStaticWorkouts()),
    requestTravelWorkouts: () => dispatch(requestTravelWorkouts())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);
