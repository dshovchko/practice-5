import ReactTestUtils from 'react-dom/test-utils';

import Accordion from '../../src/task-1';
import React from 'react';

const tabs = [
    { header: 't-header.1', content: 't-body.3' },
    { header: 't-header.2', content: 't-body.2' },
    { header: 't-header.3', content: 't-body.1' }
];

function checkHeader(div, text) {
    expect(div.classList.contains('card-header')).toBeTruthy();
    expect(div.classList.contains('text-white')).toBeTruthy();
    expect(div.classList.contains('bg-info')).toBeTruthy();
    expect(div.textContent).toBe(text);
}

function checkBody(div, text) {
    expect(div.classList.contains('card-body')).toBeTruthy();
    expect(div.textContent).toBe(text);
}

function checkActive(div) {
    expect(div.children[0].classList.contains('active')).toBeTruthy();
    expect(div.children[1].classList.contains('d-none')).toBeFalsy();
}

function checkInactive(div) {
    expect(div.children[0].classList.contains('active')).toBeFalsy();
    expect(div.children[1].classList.contains('d-none')).toBeTruthy();
}

describe('<Accordion />', () => {

    it('type', () => {
        expect(ReactTestUtils.isElementOfType(<Accordion />, Accordion)).toBeTruthy();
    });

    it('structure of component', () => {
        const component = ReactTestUtils.renderIntoDocument(<Accordion tabs={tabs} />);
        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');

        expect(divs.length).toBe(1 + tabs.length * 3);

        const items = divs[0].children;
        tabs.forEach((el, i) => {
            expect(items[i].className).toBe('card');
            expect(items[i].children.length).toBe(2);

            checkHeader(items[i].children[0], el.header);
            checkBody(items[i].children[1], el.content);
        });
    });

    it('click on tab item', () => {
        const component = ReactTestUtils.renderIntoDocument(<Accordion tabs={tabs} />);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        const items = divs[0].children;
        checkInactive(items[1]);

        ReactTestUtils.Simulate.click(items[1].children[0]);
        checkActive(items[1]);

        ReactTestUtils.Simulate.click(items[1].children[0]);
        checkInactive(items[1]);
    });

    it('mixed clicks on tabs', () => {
        const component = ReactTestUtils.renderIntoDocument(<Accordion tabs={tabs} />);

        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        const items = divs[0].children;

        ReactTestUtils.Simulate.click(items[0].children[0]);
        ReactTestUtils.Simulate.click(items[1].children[0]);

        checkActive(items[0]);
        checkActive(items[1]);

        ReactTestUtils.Simulate.click(items[1].children[0]);
        checkActive(items[0]);
        checkInactive(items[1]);
    });
});
