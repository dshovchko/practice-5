import React from 'react';

class Calculator extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3"><input type="text" className="form-control" placeholder="Operand 1" /></div>
          <div className="col-3"><input type="text" className="form-control" placeholder="Operand 2" /></div>
          <div className="col-2"><button className="btn btn-block btn-danger">Clear</button></div>
        </div>
        <div className="row my-3">
          <div className="col-2"><button className="btn btn-block btn-secondary">Add</button></div>
          <div className="col-2"><button className="btn btn-block btn-secondary">Subtract</button></div>
          <div className="col-2"><button className="btn btn-block btn-secondary">Multiply</button></div>
          <div className="col-2"><button className="btn btn-block btn-secondary">Divide</button></div>
        </div>
        <div className="row">
          <div className="col-4">
            <input type="text" className="form-control" placeholder="Result" />
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
