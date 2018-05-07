import React from 'react';
import ReactDOM from 'react-dom';
import Swipe, { SwipeItem } from 'swipejs/react';

import Table from './table/Table.js';
import PlayerPerformance from './PlayerPerformance.js';
import MedalsList from './MedalsList.js';

class ActivityReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mySwipe: null,
      activeTab: 0,
      sliderHeight: 'auto',
    };

    this.findPlayer = this.findPlayer.bind(this);
    this.updateActiveTab = this.updateActiveTab.bind(this);
    this.transitionSlide = this.transitionSlide.bind(this);
  }

  componentDidMount() {
    let mySwipe = this.swipe;
    mySwipe.stop();

    this.setState({
      mySwipe: this.swipe
    });
  }

  transitionSlide(e, index, duration) {
    e.preventDefault();
    let activeSlide;
    let newHeight;

    this.state.mySwipe.slide(index, duration);

    // Access the DOM to find the height of the active slide.
    if (index === 0) {
      activeSlide = ReactDOM.findDOMNode(this.refs.performanceSlide);
      newHeight = activeSlide.clientHeight + 'px';
    } else {
      activeSlide = ReactDOM.findDOMNode(this.refs.summarySlide);
      newHeight = activeSlide.clientHeight + 'px';
    }

    this.setState({
      activeTab: index,
      sliderHeight: newHeight
    });
  }

  updateActiveTab() {
    let activeSlideIndex = this.state.mySwipe.getPos();
    let activeSlide;
    let newHeight;

    // Access the DOM to find the height of the active slide.
    if (activeSlideIndex === 0) {
      activeSlide = ReactDOM.findDOMNode(this.refs.performanceSlide);
      newHeight = activeSlide.clientHeight + 'px';
    } else {
      activeSlide = ReactDOM.findDOMNode(this.refs.summarySlide);
      newHeight = activeSlide.clientHeight + 'px';
    }

    this.setState({
      activeTab: activeSlideIndex,
      sliderHeight: newHeight
    });
  }

  findPlayer(characterId, array) {
    let player = array.find(player => player.characterId === characterId);
    return(player);
  }

  render() {
    let report = this.props.report;
    var sliderStyle = {
      height: this.state.sliderHeight
    };

    return (
      <div className="activity-report">
        <div className="report-nav">
          <a href="#" onClick={(e) => this.transitionSlide(e, 0, 300)} 
            className={this.state.activeTab === 0 ? 'report-nav__item is-active' : 'report-nav__item'}>
            Your Performance
          </a>
          <a href="#" onClick={(e) => this.transitionSlide(e, 1, 300)} 
            className={this.state.activeTab === 1 ? 'report-nav__item is-active' : 'report-nav__item'}>
            Post Game Report
          </a>
        </div>
        <Swipe
        className=''
        ref={o => this.swipe = o}
        startSlide={0}
        style={sliderStyle}
        speed={300}
        draggable={true}
        continuous={false}
        autoRestart={false}
        disableScroll={false}
        stopPropagation={false}
        callback={this.updateActiveTab}>
            <SwipeItem
              className=''
              ref='performanceSlide'
              onClick={this.handleClick}>
              <PlayerPerformance player={this.findPlayer(this.props.characterId, report.entries)} />
              <MedalsList player={this.findPlayer(this.props.characterId, report.entries)} instanceId={this.props.instanceId} />
            </SwipeItem>
            <SwipeItem
              className=''
              ref='summarySlide'
              onClick={this.handleClick}>
              <div className="report-scoreboard">
                <Table data={report.entries} 
                  alphaScore={report.teams[0].score.basic.displayValue}
                  bravoScore={report.teams[1].score.basic.displayValue}
                />
              </div>
            </SwipeItem>
        </Swipe>
      </div>
    )
  }
}

export default ActivityReport;
