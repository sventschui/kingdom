import React, { PropTypes } from 'react'
import actions from '../actions'
import stores from '../stores'
import alt from 'alt'
import mui from 'material-ui'
import {TextField, RaisedButton} from 'material-ui'
import NameChallenge from './name-challenge'

export default class Welcome extends React.Component {

  constructor() {
    super();

    this.state = {
      userProfile: stores.userProfile,
      process: stores.process
    };

    this.onUserProfileChange = this.onUserProfileChange.bind(this)
    this.onProcessStoreChange = this.onProcessStoreChange.bind(this)
    this._handleNameChange = this._handleNameChange.bind(this)

    stores.userProfile.listen(this.onUserProfileChange)
    stores.process.listen(this.onProcessStoreChange)
  }

  componentWillUnmount() {
    stores.userProfile.unlisten(this.onUserProfileChange)
    stores.process.unlisten(this.onProcessStoreChange)
  }

  onUserProfileChange(store) {
    this.setState({
      userProfile: store,
      process: this.state.process
    })
  }

  onProcessStoreChange(store) {
    console.log('process store changed')
    this.setState({
      userProfile: this.state.userProfile,
      process: store
    })
  }

  shouldComponentUpdate(newState) {
    console.log('new state', newState)
    console.log('old state', this.state)
    return this.state.userProfile != newState.userProfile ||
      this.state.process != newState.process
  }

  render() {
    var useTag = '<path d="M16.867 68.412c5.025 1.094 19.847 4.047 33.375 4.047 13.31 0 27.87-2.858 33.125-3.993v-7.195c-1.77.406-18.582 4.188-33.125 4.188-15.293 0-33.11-4.184-33.288-4.227l-.087.367v6.812z"/><path d="M16.867 69.777v3.072c4.315.946 19.738 4.108 33.375 4.108 13.38 0 28.486-3.045 33.125-4.055v-3.07c-3.54.79-19.296 4.125-33.125 4.125-14.165 0-30.38-3.503-33.375-4.18z"/><circle cx="50.117" cy="26.729" r="3.688"/><circle cx="31.177" cy="33.238" r="3.134"/><circle cx="13.018" cy="39.511" r="2.664"/><circle cx="86.982" cy="39.511" r="2.664"/><circle cx="69.24" cy="33.238" r="3.135"/><path d="M74.867 48.292l-5.75-11.875-9.625 11.875-9.375-17.875-9.375 17.875-9.625-11.875-5.75 11.875-11.5-6.125 3 14.61v3.073c4.315.947 19.738 4.11 33.375 4.11 13.38 0 28.486-3.046 33.125-4.056v-2.127l3-15.61-11.5 6.125zm-24.75 11.583c-6.745-6.746-.015-12.674 0-12.686v-.002c.014.013 6.744 5.94 0 12.687z"/>';
    var challenge = ''
    if (this.state.process.processState == 'getName' || (this.state.process.state && this.state.process.state.processState == 'getName'))
    {
      challenge = <NameChallenge ref='nameChallenge'
        onProceed={this._handleProceedToNumberOfPeople}
        onChange={this._handleNameChange}
        hintText='Gundalf'
        value={this.state.userProfile.name} />
    }

    return (
      <div className="welcome">
        <svg className="welcome__logo" viewBox="0 0 100 100" dangerouslySetInnerHTML={{__html: useTag }} />
        <div className="welcome__h1">Your home is your castle, your block is your kingdom.</div>
        <div className="welcome__h2">Let's find your kingdom</div>
        {
          challenge
        }
      </div>
    )
  }

  _handleNameChange() {
    actions.userProfile.updateName(this.refs.nameChallenge.getValue())
  }

  _handleProceedToNumberOfPeople() {
    actions.process.updateProcessState('getNumberOfPeople')
  }
}

//Welcome.propTypes = {
//  onProceed: PropTypes.func.isRequired,
//}
