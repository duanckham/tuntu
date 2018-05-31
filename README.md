# 吞吐

Installation
---


```
yarn add tuntu

// or 

npm install tuntu
```

Examples
---


```
import TuntuMixin from 'tuntu';
...

@reactMixin.decorate(TuntuMixin)
...

class AComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ...
    };
  }
  
  someFunction() {
    this.suck('someEventNameA');
    
    // or
    
    this.suck('someEventNameB', data => {
      console.log(data);
    });
  }
  
  render() {
    // My name is Socrates.
    return (
      <p>My name is { this.state.name }.</p>
    );
  }
}
```

```
import TuntuMixin from 'tuntu';
...

@reactMixin.decorate(TuntuMixin)
...

class BComponent extends React.Component {  
  someFunction() {
    this.spit('someEventNameA', { name: 'Socrates' });
    
    // or
    
    this.spit('someEventNameB', { someMessage: 'Ya.' });
  }
}
```
