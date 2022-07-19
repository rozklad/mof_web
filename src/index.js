import './style.css';

/**
 * Configuration
 */
const config = {
    velocity: 1.0, // The higher the number, the sooner new content is appended (Defaults to 1.0 = new content is added 1 viewport before reaching scroll limit)

    clarinet: {
        1: {
            min: -400,
            max: 800,
            rotate: 15,
        },
        2: {
            min: -200,
            max: 400,
            rotate: -15,
        },
    },

    blink: {
        max: 2.0,
        min: 0.6,
    },
};

/**
 * Hold selectable elements
 */
const main = document.getElementById('main');
const root = document.querySelector(':root');
const clarinets = {
    1: document.querySelector('.clarinet-1'),
    2: document.querySelector('.clarinet-2'),
};

/**
 * Store the default content of #main element
 */
const content = main.innerHTML;

/**
 * Total of scrollable area
 *
 * @return int
 */
const getScrollableAmount = () => {
    return main.scrollHeight;
};

/**
 * Amount of currently scrolled pixels
 *
 * @return int
 */
const getCurrentScrolledAmount = () => {
    return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};

/**
 * Get current status of remaining scrolling
 *
 * @return int
 */
const getRemainingScrollableAmount = () => {
    const scrollable = getScrollableAmount();
    const scrolled = getCurrentScrolledAmount();
    return scrollable - scrolled;
};

/**
 * Store defaults
 */
const defaultScrollableAmount = getScrollableAmount();

/**
 * Get percentage of scrolled in current stage
 *
 * @return float
 */
const getCurrentStagePercentage = () => {
    const scrolled = getCurrentScrolledAmount();
    const over = scrolled % defaultScrollableAmount;

    return (over / defaultScrollableAmount) * 100;
};

/**
 * Shift clarinets to certain percentage of their predefined state
 *
 * @param {*} index Index of clarinet to pick
 * @param {*} percentage Percentage of transform to be performed
 * @return void
 */
const transformClarinet = (index, percentage) => {
    const diff = config.clarinet[index].max - config.clarinet[index].min;
    const shift = diff * (percentage / 100);

    clarinets[index].style.transform = `rotateX(45deg) rotateZ(${config.clarinet[index].rotate}deg) translateY(${
        config.clarinet[index].min + shift
    }%)`;
};

/**
 * Listen to scroll and conditionally append additional content
 * to create illusion of endless scroll
 */
window.addEventListener('scroll', () => {
    // Check if new content needs to be added
    const remaining = getRemainingScrollableAmount();

    if (remaining < window.outerHeight * config.velocity) {
        // If there is less remaining to scroll than window height, let's append content
        main.innerHTML += content;
    }

    // Adjust position of flying clarinet
    const percentage = getCurrentStagePercentage();

    transformClarinet(1, percentage);
    transformClarinet(2, percentage);
});

/**
 * Change blinking speed every interval
 */
setInterval(() => {
    const speed = (Math.random() * (config.blink.max - config.blink.min) + config.blink.min).toFixed(2);
    root.style.setProperty('--blink', `${speed}s`);
}, parseInt(config.blink.max) * 1000);
