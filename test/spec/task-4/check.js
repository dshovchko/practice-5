import chai from 'chai';

const assert = chai.assert;

const classList = (el, classList) => {
    classList.forEach(e => {
        assert.isTrue(el.classList.contains(e), `class ${e} in ${el.outerHTML}`);
    });
};
const className = (el, className) => {
    assert.equal(el.className, className, `class ${className} in ${el.outerHTML}`);
};

const childrenCount = (el, count) => {
    assert.equal(el.children.length, count, `number of children elements in ${el.outerHTML}`);
};

const spinner = span => {
    tagName(span, 'SPAN');
    classList(span, ['fa', 'fa-spinner', 'fa-spin']);
};

const tagName = (el, name) => {
    assert.equal(el.tagName, name, el.outerHTML);
};

const textContent = (el, text) => {
    assert.equal(el.textContent, text, el.outerHTML);
};

const divWeather = divs => {
    assert.isAtLeast(divs.length, 1, 'number of div elements');
    className(divs[0], 'weather');
};

const divDetails = divs => {
    assert.isAtLeast(divs.length, 1, 'number of div elements');
    className(divs[0], 'details');
};

export default {
    classList,
    className,
    childrenCount,
    spinner,
    tagName,
    textContent,
    divWeather,
    divDetails
};
