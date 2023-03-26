const React = {
    createElement: (tag, props, ...children) => {
        return {
            tag,
            props,
            children
        }
    },
    states: {},
    statePointer: 0,
    useState: (initialValue) => {

        const localPointer = React.statePointer;

        React.states[localPointer] = React.states[localPointer] || initialValue;

        const setState = (newState) => {
            React.states[localPointer] = newState;
            ReactDOM.rerender();
        };

        React.statePointer++;
        return [React.states[localPointer], setState];
    }
};

const ReactDOM = {
    render: (reactElement, container) => {
        
        if (typeof reactElement === 'string' || typeof reactElement === 'number') {
            container.appendChild(document.createTextNode(reactElement));
            return;
        }

        if (typeof reactElement === 'function') {
            reactElement = reactElement();
        }

        const {tag, props, children} = reactElement;

        const element = document.createElement(tag);

        Object.keys(props).filter(key => {
            if (key === '__self' || key === '__source') {
                return false;
            }
            return true;
        }).map(key => {
            element[key] = props[key];
        });

        if (children) {
            children.map(child => {
                ReactDOM.render(child, element);
            });
        }

        container.appendChild(element);

    },

    rerender: () => {
        const container = document.querySelector('#app');
        container.innerHTML = '';
        React.statePointer = 0;
        ReactDOM.render(App, container);
    }
};

const {useState} = React;
const App = () => {

    const [name, setName] = useState('John Doe');
    const [count, setCount] = useState(20);
    return (
        <div id="main">
            <h1>Hello {name}</h1>
    
            <input onchange={(event) => {
                setName(event.target.value);
            }} value={name} type={'text'} placeholder="Enter your name" />
    
            <div>
                <h1>Counter: {count}</h1>

                <button onclick={() => {setCount(count+1)}}>+</button>
                <button onclick={() => {setCount(count-1)}}>-</button>
            </div>
        </div>
    )
};


console.log(App);

ReactDOM.render(App, document.querySelector('#app'));


/*

React
    -> React as a Library
        -> import {} from 'react'
        -> creaetElement, hooks, effects

    -> React as a renderer
        -> ReactDOM, React Native

*/