const classList = (el, classList) => {
    classList.forEach(e => {
        expect(el.classList.contains(e)).toBeTruthy();
    });
};
const className = (el, className) => {
    expect(el.className).toBe(className);
};

const childrenCount = (el, count) => {
    expect(el.children.length).toBe(count);
};

const spinner = span => {
    tagName(span, 'SPAN');
    classList(span, ['fa', 'fa-spinner', 'fa-spin']);
};

const tagName = (el, name) => {
    expect(el.tagName).toBe(name);
};

const textContent = (el, text) => {
    expect(el.textContent).toBe(text);
};

const divWeather = divs => {
    expect(divs.length).toBeGreaterThanOrEqual(1);
    className(divs[0], 'weather');
};

const divDetails = divs => {
    expect(divs.length).toBeGreaterThanOrEqual(1);
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
