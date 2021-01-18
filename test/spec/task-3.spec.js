import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import Tabs from '../../src/task-3';

const tabs = [
    { header: 't-h 1', content: 't-b 3' },
    { header: 't-h 2', content: 't-b 2' },
    { header: 't-h 3', content: 't-b 1' }
];

function checkHeader(box, data, getVal, active) {
    expect(box.children.length).toBe(3);
    data.forEach((el, i) => {
        expect(box.children[i].textContent).toBe(getVal(el));
        if (i === active) {
            expect(box.children[i].classList.contains('active')).toBeTruthy();
        } else {
            expect(box.children[i].classList.contains('active')).toBeFalsy();
        }
    });
}

function checkContent(box, data, getVal, active) {
    expect(box.children.length).toBe(3);
    data.forEach((el, i) => {
        expect(box.children[i].textContent).toBe(getVal(el));
        if (i === active) {
            expect(box.children[i].classList.contains('d-none')).toBeFalsy();
        } else {
            expect(box.children[i].classList.contains('d-none')).toBeTruthy();
        }
    });
}

function checkActive(hBox, cBox, index) {
    expect(hBox.children[index].classList.contains('active')).toBeTruthy();
    expect(cBox.children[index].classList.contains('d-none')).toBeFalsy();
}
function checkInactive(hBox, cBox, index) {
    expect(hBox.children[index].classList.contains('active')).toBeFalsy();
    expect(cBox.children[index].classList.contains('d-none')).toBeTruthy();
}

describe('<Tabs />', () => {

    it('type', () => {
        expect(ReactTestUtils.isElementOfType(<Tabs />, Tabs)).toBeTruthy();
    });

    it('structure of component', () => {
        const component = ReactTestUtils.renderIntoDocument(<Tabs tabs={tabs}/>);
        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');

        expect(divs[0].className).toBe('row');
        expect(divs[0].children.length).toBe(2);
        expect(divs[0].children[0].tagName).toBe('UL');
        expect(divs[0].children[0].classList.contains('col-3')).toBeTruthy();
        expect(divs[0].children[0].classList.contains('list-group')).toBeTruthy();

        checkHeader(divs[0].children[0], tabs, el => el.header, 0);
        expect(divs[1].className).toBe('col-9');
        checkContent(divs[1], tabs, el => el.content, 0);
    });

    it('structure of component headerTpl', () => {
        const component = ReactTestUtils.renderIntoDocument(<Tabs tabs={tabs} headerTpl={props => props.item.content} />);
        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');

        checkHeader(divs[0].children[0], tabs, el => el.content, 0);
        checkContent(divs[1], tabs, el => el.content, 0);
    });

    it('structure of component contentTpl', () => {
        const component = ReactTestUtils.renderIntoDocument(<Tabs tabs={tabs} contentTpl={props => props.item.header} />);
        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');

        checkHeader(divs[0].children[0], tabs, el => el.header, 0);
        checkContent(divs[1], tabs, el => el.header, 0);
    });

    it('clicking on tabs', () => {
        const component = ReactTestUtils.renderIntoDocument(<Tabs tabs={tabs}/>);
        const divs = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'div');
        const headers = divs[0].children[0];
        const bodies = divs[1];

        checkInactive(headers, bodies, 1);

        ReactTestUtils.Simulate.click(headers.children[1]);
        checkActive(headers, bodies, 1);

        ReactTestUtils.Simulate.click(headers.children[1]);
        checkActive(headers, bodies, 1);

        ReactTestUtils.Simulate.click(headers.children[2]);
        checkInactive(headers, bodies, 1);
    });
});
