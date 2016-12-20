/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { KEYS, EventUtil, DateUtil } from '../../../utilities';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';


const DatepickerCalendarDay = React.createClass({
	displayName: 'SLDSDatepickerCalendarDay',

	// onSelectDate (date) {
	// 	console.log('onSelectDate should be defined ',date);
	// },

	// onClick (index) {
	// 	console.log('onClick should be defined ',index);
	// },

	// onMoveFocus (delta){
	// 	console.log('onMoveFocus should be defined ',delta);
	// },

	// onBlur (relatedTarget){
	// 	console.log('onBlur should be defined ',relatedTarget);
	// },

	// onFocus (index, height) {
	// 	console.log('onFocus should be defined ',index,height);
	// },

	// onCancel () {
	// 	console.log('onCancel should be defined');
	// }

	propTypes: {
		calendarHasFocus: PropTypes.bool,
		date: PropTypes.instanceOf(Date),
		displayedDate: PropTypes.instanceOf(Date),
		focused: PropTypes.bool,
		onBlur: PropTypes.func,
		onCancel: PropTypes.func.isRequired,
		onClick: PropTypes.func,
		onFocus: PropTypes.func,
		onMoveFocus: PropTypes.func,
		onPrevDay: PropTypes.func,
		onPrevWeek: PropTypes.func,
		onNextDay: PropTypes.func,
		onNextWeek: PropTypes.func,
		onSelectDate: PropTypes.func.isRequired,
		selectedDate: PropTypes.instanceOf(Date)
	},

	getDefaultProps () {
		return {
			displayedDate: new Date(),
			selectedDate: new Date(),
			calendarHasFocus: false
		};
	},

	handleClick (event) {
		this.props.onSelectDate(event, { date: this.props.date });

		if (event.nativeEvent) {
			event.nativeEvent.stopImmediatePropagation();
			event.nativeEvent.preventDefault();
		}
	},

	handleToPrevDay () {
		if (this.props.onPrevDay) {
			this.props.onPrevDay(this.props.date);
		}
	},

	handleToNextDay () {
		if (this.props.onNextDay) {
			this.props.onNextDay(this.props.date);
		}
	},

	handleToPrevWeek () {
		if (this.props.onPrevWeek) {
			this.props.onPrevWeek(this.props.date);
		}
	},

	handleToNextWeek () {
		if (this.props.onNextWeek) {
			this.props.onNextWeek(this.props.date);
		}
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ENTER ||
				event.keyCode === KEYS.SPACE) {
				EventUtil.trapEvent(event);
				if (this.props.onSelectDate) {
					this.props.onSelectDate(event, { date: this.props.date });
				}
			} else if (event.keyCode === KEYS.ESCAPE) {
				EventUtil.trapEvent(event);
				if (this.props.onCancel) {
					this.props.onCancel();
				}
			} else if (event.keyCode === KEYS.TAB) {
/*
				if(!event.shiftKey){
					EventUtil.trapEvent(event);
					if(this.props.onCancel){
						this.props.onCancel();
					}
				}
*/
			} else if (event.keyCode === KEYS.RIGHT) {
				EventUtil.trapEvent(event);
				this.handleToNextDay();
			} else if (event.keyCode === KEYS.LEFT) {
				EventUtil.trapEvent(event);
				this.handleToPrevDay();
			} else if (event.keyCode === KEYS.RIGHT) {
				EventUtil.trapEvent(event);
				this.handleToNextDay();
			} else if (event.keyCode === KEYS.UP) {
				EventUtil.trapEvent(event);
				this.handleToPrevWeek();
			} else if (event.keyCode === KEYS.DOWN) {
				EventUtil.trapEvent(event);
				this.handleToNextWeek();
			} else {
				EventUtil.trapEvent(event);
			}
		}
	},

	setFocus () {
		console.log(this.dayCell);
		console.log(this.props.calendarHasFocus);
		if (this.dayCell && this.props.calendarHasFocus) {
			ReactDOM.findDOMNode(this.dayCell).focus();
		}
	},

	render () {
		const isCurrentMonth = DateUtil.isSameMonth(this.props.date, this.props.displayedDate);
		const isToday = DateUtil.isToday(this.props.date);
		const isSelectedDay = DateUtil.isSameDay(this.props.date, this.props.selectedDate);
		const isFirstDayOfMonth = DateUtil.isFirstDayOfMonth(this.props.date);


		return (
			<td
				aria-disabled={!isCurrentMonth}
				aria-selected={isSelectedDay}
				className={classNames({
					'slds-is-today': isToday,
					'slds-disabled-text': !isCurrentMonth,
					'slds-is-selected': isSelectedDay
				})}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}
				ref={(component) => { this.dayCell = component; }}
				role="gridcell"
				tabIndex="0"
				// tabIndex={!this.props.calendarHasFocus && isFirstDayOfMonth && isCurrentMonth ? 0 : -1}
			>
				<span className="slds-day">
					{this.props.date.getDate()}
				</span>
			</td>
		);
	},

	componentDidUpdate (prevProps) {
		console.log(this.props.focused);
		if (this.props.focused && !prevProps.focused) {
			this.setFocus();
		}
	}

});

module.exports = DatepickerCalendarDay;
