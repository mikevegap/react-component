'use strict';

var React = require('react');
var PropTypes = React.PropTypes;
var ReactCssTransitionGroup = require('react-addons-css-transition-group');
var formatDate = require('./util/datetime').formatDate;
var DocumentClickMixin = require('./mixin/DocumentClickMixin');
var Calendar = require('./Calendar');
var klassName = require('./util/className');

var _DATE_FORMAT = {
    day: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    year: 'yyyy'
};

var DatePicker = React.createClass({
    displayName: 'DatePicker',

    mixins: [DocumentClickMixin],
    propTypes: {
        onChange: PropTypes.func.isRequired,
        showPreview: PropTypes.bool,
        format: PropTypes.string,
        value: PropTypes.instanceOf(Date),
        type: PropTypes.oneOf(['day', 'month', 'year'])
    },

    getDefaultProps: function getDefaultProps() {
        return {
            className: '',
            placeHolder: 'select date',
            showPreview: true,
            type: 'day'
        };
    },
    getInitialState: function getInitialState() {
        var value = this.initDate();
        return { value: value, open: false };
    },
    initDate: function initDate() {
        var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.value;

        if (!date) {
            return;
        }
        return new Date(date.getTime());
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                value: this.initDate(nextProps.value)
            });
        }
    },
    dateParams: function dateParams() {
        var _props = this.props,
            begin = _props.begin,
            end = _props.end;

        return { begin: begin, end: end };
    },
    handleValChange: function handleValChange(value) {
        this.setState({
            value: value,
            open: false
        });
        this.props.onChange(new Date(value.getTime()));
    },
    onOtherDomClick: function onOtherDomClick() {
        this.setState({
            open: false
        });
    },
    render: function render() {
        var _this = this;

        var _state = this.state,
            open = _state.open,
            value = _state.value;
        var _props2 = this.props,
            begin = _props2.begin,
            end = _props2.end,
            className = _props2.className,
            placeHolder = _props2.placeHolder,
            showPreview = _props2.showPreview,
            format = _props2.format,
            type = _props2.type;

        format = format || _DATE_FORMAT[type];
        var valueStr = value ? formatDate(value, format) : '';
        if (open) className += ' _active';
        return React.createElement(
            'div',
            { className: klassName('datepicker', className) },
            React.createElement(
                'div',
                { className: 'input', onClick: function onClick() {
                        _this.setState({ open: true });
                    } },
                React.createElement('input', { type: 'text', className: '_input', value: valueStr, readOnly: true, placeholder: placeHolder }),
                React.createElement('i', null)
            ),
            React.createElement(
                ReactCssTransitionGroup,
                { className: '_picker', transitionName: 'datepicker',
                    transitionEnterTimeout: 200, transitionLeaveTimeout: 200 },
                open ? React.createElement(Calendar, { begin: begin, end: end,
                    type: type, showPreview: showPreview,
                    value: value, onChange: this.handleValChange }) : null
            )
        );
    }
});

module.exports = DatePicker;