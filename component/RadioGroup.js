const React = require('react')
const Radio = require('./Radio')
const klassName = require('./util/className')
const UpdatePropsMixin = require('./mixin/UpdatePropsMixin')

const RadioGroup = React.createClass({
    mixins: [UpdatePropsMixin],
    propTypes: {
        options: React.PropTypes.array,
        labelName: React.PropTypes.string,
        valueName: React.PropTypes.string,
        onChange: React.PropTypes.func,
        defaultChecked: React.PropTypes.bool,
    },
    getInitialState() {
        const { value } = this.props;
        return { value };
    },

    getDefaultProps() {
        return {
            labelName: 'name',
            valueName: 'value',
        };
    },

    toggleChange(e, value){
        this.setState({ value }, () => {
            if (this.props.onChange) this.props.onChange(this.state.value);
        });
    },

    componentWillReceiveProps(nextProps) {
        const {defaultChecked, valueName} = this.props;
        const {options, children} = nextProps
        const {value} = this.state;
        if (!value && defaultChecked) {
            if (options && this.props.options && options.length > 0) {
                this.setState({
                    value: options[0][valueName],
                });
                return
            }
            if (children && this.props.children && children.length > 0) {
                this.setState({
                    value: children[0].props[valueName]
                });
            }
        }
    },

    componentDidMount() {
        const {defaultChecked, options, children, valueName} = this.props;
        const {value} = this.state;
        // init defaultChecked status
        if (!value && defaultChecked) {
            if (options && options.length > 0) {
                this.setState({
                    value: options[0][valueName],
                });
                return
            }
            if (children && children.length > 0) {
                this.setState({
                    value: children[0].props[valueName]
                });
            }
        }
    },

    render() {
        let {labelName, valueName, options, className, style, children} = this.props;
        className = klassName(className, 'radio-group');
        const {value} = this.state;
        let optionNodes = [], itemChecked;

        if (children) {
            React.Children.map(children, (node, i) => {
                itemChecked = node.props.value === value;
                if ((value === null || value === undefined ) && node.props.checked) itemChecked = true;
                optionNodes.push(<Radio key={i} {...node.props} checked={itemChecked} onChange={this.toggleChange}>
                                </Radio>);
            })
        } else {
            for (let i = 0; i < options.length; i++) {
                let item = options[i];
                itemChecked = item[valueName] === value;
                optionNodes.push(<Radio key={item[valueName]} value={item[valueName]} disabled={item.disabled}
                                    checked={itemChecked} onChange={this.toggleChange}>
                                        {item[labelName]}
                                    </Radio>);
            }
        }


        return (
            <div style={style} className={className}>
                {optionNodes}
            </div>
        );
    }
});

module.exports = RadioGroup;