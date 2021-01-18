import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Calculator from '../../src/task-2.js';

const component = ReactTestUtils.renderIntoDocument(<Calculator />);
const inputs = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'form-control');
const buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'button');

function inputChange(el, value) {
    el.value = value;
    ReactTestUtils.Simulate.change(el);
}

function checkButton(el, text, cName = 'btn-secondary') {
    expect(el.className).toBe('col-2');
    expect(el.children.length).toBe(1);
    expect(el.children[0].tagName).toBe('BUTTON');
    expect(el.children[0].classList.contains('btn')).toBeTruthy();
    expect(el.children[0].classList.contains('btn-block')).toBeTruthy();
    expect(el.children[0].classList.contains(cName)).toBeTruthy();
    expect(el.children[0].textContent).toBe(text);
}

function checkInput(el, placeholder, cName = 'col-3') {
    expect(el.className).toBe(cName);
    expect(el.children.length).toBe(1);
    expect(el.children[0].tagName).toBe('INPUT');
    expect(el.children[0].type).toBe('text');
    expect(el.children[0].placeholder).toBe(placeholder);
    expect(el.children[0].classList.contains('form-control')).toBeTruthy();
}

describe('<Calculator />', () => {

    it('type', () => {
        expect(ReactTestUtils.isElementOfType(<Calculator />, Calculator)).toBeTruthy();
    });

    it('structure of component', () => {

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        expect(divs[0].className).toBe('container');
        expect(divs[1].className).toBe('row');
        checkInput(divs[2], 'Operand 1');
        checkInput(divs[3], 'Operand 2');
        checkButton(divs[4], 'Clear', 'btn-danger');
        expect(divs[5].className).toBe('row my-3');
        checkButton(divs[6], 'Add');
        checkButton(divs[7], 'Subtract');
        checkButton(divs[8], 'Multiply');
        checkButton(divs[9], 'Divide');
        expect(divs[10].className).toBe('row');
        checkInput(divs[11], 'Result', 'col-4');
    });

    it('check input into fields Operand 1 and 2', () => {

        [
            ['231', '231'],
            ['aa', ''],
            ['q2erty', '2']
        ].forEach((v) => {
            for (let i = 0; i <= 1; i++) {
                inputChange(inputs[i], v[0]);
                expect(inputs[i].value).toBe(v[1]);
            }
        });

    });

    it('check input into field Result', () => {

        inputChange(inputs[2], 'q');
        expect(inputs[2].value).toBe('');
        inputChange(inputs[2], '1');
        expect(inputs[2].value).toBe('');
    });

    it('clicking Add button', () => {

        inputChange(inputs[0], '3');
        inputChange(inputs[1], '4');

        ReactTestUtils.Simulate.click(buttons[1]);
        expect(inputs[2].value).toBe('7');
    });

    it('clicking Subtract button', () => {

        inputChange(inputs[0], '3');
        inputChange(inputs[1], '4');

        ReactTestUtils.Simulate.click(buttons[2]);
        expect(inputs[2].value).toBe('-1');
    });

    it('clicking Multiply button', () => {

        inputChange(inputs[0], '3');
        inputChange(inputs[1], '4');

        ReactTestUtils.Simulate.click(buttons[3]);
        expect(inputs[2].value).toBe('12');
    });

    it('clicking Divide button', () => {

        inputChange(inputs[0], '3');
        inputChange(inputs[1], '4');

        ReactTestUtils.Simulate.click(buttons[4]);
        expect(inputs[2].value).toBe('0.75');
    });

    it('clicking Clear button', () => {

        inputChange(inputs[0], '3');
        inputChange(inputs[1], '4');

        ReactTestUtils.Simulate.click(buttons[0]);
        expect(inputs[2].value).toBe('0');
    });
});
