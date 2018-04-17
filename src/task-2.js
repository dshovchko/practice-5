import React from "react";

class Calculator extends React.Component {

    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-3"><input type="text" class="form-control" placeholder="Operand 1" /></div>
                    <div class="col-3"><input type="text" class="form-control" placeholder="Operand 2" /></div>
                    <div class="col-2"><button class="btn btn-block btn-danger">Clear</button></div>
                </div>
                <div class="row my-3">
                    <div class="col-2"><button class="btn btn-block btn-secondary">Add</button></div>
                    <div class="col-2"><button class="btn btn-block btn-secondary">Subtract</button></div>
                    <div class="col-2"><button class="btn btn-block btn-secondary">Multiply</button></div>
                    <div class="col-2"><button class="btn btn-block btn-secondary">Divide</button></div>
                </div>
                <div class="row">
                    <div class="col-4">
                        <input type="text" class="form-control" placeholder="Result" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator;