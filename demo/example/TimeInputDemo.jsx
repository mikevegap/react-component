import React from 'react';
import {TimeInput} from './index.js';

export default class TimeInputDemo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showTime: '13:12:31'
        };
    }

    handleTimeChange(value){
        this.setState({
            showTime: value
        });
    }

    render() {
        return (
            <div>
                <h3>Time input</h3>
                <ul>
                    <li>
                        <h4>Default time input</h4>
                        <TimeInput onChange={value => console.log(value)}/>
                        <pre>
                            <code>
                                {`<TimeInput onChange={onChangeFunc}/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Time input with given value</h4>
                        <TimeInput value="12:44:23" onChange={value => console.log(value)}/>
                        <pre>
                            <code>
                                {`<TimeInput value="12:44:23" onChange={onChangeFunc}/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>Time input onchange event</h4>
                        <p>time you selected is {this.state.showTime}</p>
                        <TimeInput onChange={this.handleTimeChange.bind(this)} value={this.state.showTime}/>
                        <pre>
                            <code>
                                {`<TimeInput onChange={handleTimeChange} value={value}/>`}
                            </code>
                        </pre>
                    </li>
                    <li>
                        <h4>simple</h4>
                        <TimeInput simple={true} value="02:12" onChange={value => console.log(value)}/>
                        <pre>
                            <code>
                                {`<TimeInput simple={true} value="02:12"/>`}
                            </code>
                        </pre>
                    </li>
                </ul>
            </div>
        );
    }
}
