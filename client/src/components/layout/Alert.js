import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

/* Map through alerts and display what the message is. If array is empty, don't output anything. */
const Alert = (props) => 
    props.alerts !== null && props.alerts.length > 0 && props.alerts.map(el => 
        (
        <div key={el.id} className={`alert alert-${el.alertType}`}>
            { el.message }
        </div>
        ))
   
Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

//Fetch the alert state from redux and map it to the prop in the component (array of alerts). To get state inside of alert, call what's in root reducer file.
const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert);
