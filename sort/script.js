const can = document.getElementById('sortingCanvas');
const contx = can.getContext('2d');
const algoSelect = document.getElementById('algorithm');
const arrSizeInput = document.getElementById('arraySize');
const spdInput = document.getElementById('speed');
const genBtn = document.getElementById('generate');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const rstBtn = document.getElementById('reset');
const cmpxDisplay = document.getElementById('complexity');
const cmpDisplay = document.getElementById('comparisons');
const swpDisplay = document.getElementById('swaps');
const tmTakenDisplay = document.getElementById('timeTaken');
const custArrInput = document.getElementById('customArray');
const useCustArrBtn = document.getElementById('useCustomArray');
const bestAlgoDisplay = document.getElementById('bestAlgorithmDisplay');
const algoTmsDisplay = document.getElementById('algorithmTimesDisplay');

let arr = [];
let arrSize = parseInt(arrSizeInput.value);
let spd = parseInt(spdInput.value);
let isSort = false;
let isPause = false;
let cmp = 0;
let swp = 0;
let startTm, endTm;
let algoTms = {};
let algo={};

function genArray() {
    arr = [];
    for (let i = 0; i < arrSize; i++) {
        arr.push(Math.floor(Math.random() * can.height));
    }
    cmp = 0;
    swp = 0;
    isPause = false;
    updStats();
    drwArray();
}

function drwArray(hghlght = []) {
    contx.clearRect(0, 0, can.width, can.height);
    const barW = can.width / arr.length;

    arr.forEach((val, idx) => {
        const grdnt = contx.createLinearGradient(idx * barW, 0, idx * barW, can.height);
        grdnt.addColorStop(0, '#3498db');
        grdnt.addColorStop(0.5, '#9b59b6');
        grdnt.addColorStop(1, '#8e44ad');
        contx.fillStyle = hghlght.includes(idx) ? '#ffce49' : grdnt;
        contx.fillRect(idx * barW, can.height - val, barW, val);
        contx.strokeStyle = '#ecf0f1';
        contx.lineWidth = 2;
        contx.strokeRect(idx * barW, can.height - val, barW, val);
    });
}

function updStats() {
    cmpDisplay.textContent = `Comparisons: ${cmp}`;
    swpDisplay.textContent = `Swaps: ${swp}`;
}

function slp(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hghlghtAlgo() {
    const opts = algoSelect.options;
    for (let i = 0; i < opts.length; i++) {
        opts[i].classList.remove("highlighted");
    }
    opts[algoSelect.selectedIndex].classList.add("highlighted");
}

function setCmpx(cmpx) {
    cmpxDisplay.textContent = `Time Complexity: ${cmpx}`;
}

async function bubbleSort() {
    setCmpx('O(n²)');
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (isPause) {
                await slp(50);
                continue;
            }
            cmp++;
            if (arr[j] > arr[j + 1]) {
                swp++;
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                drwArray([j, j + 1]);
                updStats();
                await slp(101 - spd);
            }
        }
    }
    drwArray([], true);
}

async function insertionSort() {
    setCmpx('O(n²)');
    for (let i = 1; i < arr.length; i++) {
        if (isPause) {
            await slp(50);
            continue;
        }
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            cmp++;
            swp++;
            arr[j + 1] = arr[j];
            drwArray([j, j + 1]);
            updStats();
            await slp(101 - spd);
            j--;
        }
        arr[j + 1] = key;
        drwArray([j + 1]);
        updStats();
    }
}

async function selectionSort() {
    setCmpx('O(n²)');
    for (let i = 0; i < arr.length - 1; i++) {
        if (isPause) {
            await slp(50);
            continue;
        }
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            cmp++;
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            swp++;
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            drwArray([i, minIdx]);
            updStats();
            await slp(101 - spd);
        }
    }
}

async function mergeSort() {
    setCmpx('O(n log n)');
    await mergeSortHelper(arr);
}

async function mergeSortHelper(arrToSort) {
    if (arrToSort.length <= 1) return arrToSort;
    const mid = Math.floor(arrToSort.length / 2);
    const left = await mergeSortHelper(arrToSort.slice(0, mid));
    const right = await mergeSortHelper(arrToSort.slice(mid));
    const mergedArr = await merge(left, right);
    for (let i = 0; i < mergedArr.length; i++) {
        arr[i] = mergedArr[i];
    }
    drwArray();
    return mergedArr;
}

async function merge(left, right) {
    const sortedArr = [];
    while (left.length && right.length) {
        if (isPause) {
            await slp(50);
            continue;
        }
        cmp++;
        if (left[0] < right[0]) {
            sortedArr.push(left.shift());
        } else {
            sortedArr.push(right.shift());
        }
        await slp(101 - spd);
    }
    return [...sortedArr, ...left, ...right];
}

useCustArrBtn.addEventListener('click', () => {
    const custArr = custArrInput.value.split(',').map(Number);
    if (custArr.every(num => !isNaN(num))) {
        arr = custArr;
        arrSize = custArr.length;
        drwArray();
        cmp = 0;
        swp = 0;
        algoTms = {};
        bestAlgoDisplay.textContent = '';
        algoTmsDisplay.innerHTML = '';
    } else {
        alert('Please enter a valid array of numbers, separated by commas.');
    }
});

async function quickSort(arrToSort = arr) {
    if (arrToSort.length <= 1) return arrToSort;
    const pivot = arrToSort[arrToSort.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arrToSort.length - 1; i++) {
        if (isPause) {
            await slp(50);
            continue;
        }
        cmp++;
        if (arrToSort[i] < pivot) {
            left.push(arrToSort[i]);
        } else {
            right.push(arrToSort[i]);
        }
    }
    const sortedArr = [...await quickSort(left), pivot, ...await quickSort(right)];
    for (let i = 0; i < sortedArr.length; i++) {
        arr[i] = sortedArr[i];
    }
    drwArray();
    return sortedArr;
}

async function runAlgoBg(algo, arrToSort) {
    switch (algo) {
        case 'bubbleSort':
            await bubbleSortNoVisual(arrToSort);
            break;
        case 'insertionSort':
            await insertionSortNoVisual(arrToSort);
            break;
        case 'selectionSort':
            await selectionSortNoVisual(arrToSort);
            break;
        case 'mergeSort':
            await mergeSortNoVisual(arrToSort);
            break;
        case 'quickSort':
            await quickSortNoVisual(arrToSort);
            break;
    }
}

async function bubbleSortNoVisual(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            cmp++;
            if (arr[j] > arr[j + 1]) {
                swp++;
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

async function insertionSortNoVisual(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            cmp++;
            swp++;
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

async function selectionSortNoVisual(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            cmp++;
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            swp++;
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
}

async function mergeSortNoVisual(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = await mergeSortNoVisual(arr.slice(0, mid));
    const right = await mergeSortNoVisual(arr.slice(mid));
    return mergeNoVisual(left, right);
}

async function mergeNoVisual(left, right) {
    const res = [];
    while (left.length && right.length) {
        cmp++;
        if (left[0] < right[0]) {
            res.push(left.shift());
        } else {
            res.push(right.shift());
        }
    }
    return res.concat(left, right);
}

async function quickSortNoVisual(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        cmp++;
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...await quickSortNoVisual(left), pivot, ...await quickSortNoVisual(right)];
}

function bestAlgo() {
    let best = null;
    let bestTm = Infinity;
    for (const algo in algoTms) {
        if (algoTms[algo] < bestTm) {
            bestTm = algoTms[algo];
            best = algo;
        }
    }
    return best;
}

function showAlgoTms() {
    algoTmsDisplay.innerHTML = '';
    for (const algo in algoTms) {
        const timeEl = document.createElement('p');
        timeEl.textContent = `${algo}: ${algoTms[algo]}ms`;
        algoTmsDisplay.appendChild(timeEl);
    }
}

function deepCopy(arr) {
    return [...arr];
}

async function startSort() {
    if (isSort) return;
    isSort = true;
    hghlghtAlgo();
    const selectedAlgo = algoSelect.value;
    rstArray();

    for (const algo of ['bubbleSort', 'insertionSort', 'selectionSort', 'mergeSort', 'quickSort']) {
        const tempArr = deepCopy(arr);
        startTm = performance.now();
        await runAlgoBg(algo, tempArr);
        endTm = performance.now();
        const tmTaken = (endTm - startTm).toFixed(2);
        algoTms[algo] = tmTaken;
    }

    rstArray();
    startTm = performance.now();
    await window[selectedAlgo]();
    endTm = performance.now();

    const selTmTaken = (endTm - startTm).toFixed(2);
    algo[selectedAlgo] = selTmTaken;

    const best = bestAlgo();
    showAlgoTms();
    bestAlgoDisplay.textContent = `Best Algorithm: ${best}`;
    tmTakenDisplay.textContent = `Time Taken: ${selTmTaken} ms`;

    isSort = false;
}

function pauseSort() {
    isPause = !isPause;
    pauseBtn.textContent = isPause ? 'Resume' : 'Pause';
}

function rstArray() {
    genArray();
    isPause = false;
    pauseBtn.textContent = 'Pause';
    bestAlgoDisplay.textContent = '';
}

genBtn.addEventListener('click', genArray);
startBtn.addEventListener('click', startSort);
pauseBtn.addEventListener('click', pauseSort);
rstBtn.addEventListener('click', rstArray);
arrSizeInput.addEventListener('input', () => {
    arrSize = parseInt(arrSizeInput.value);
    rstArray();
});
spdInput.addEventListener('input', () => {
    spd = parseInt(spdInput.value);
});
useCustArrBtn.addEventListener('click', () => {
    arr = custArrInput.value.split(',').map(Number);
    drwArray();
});
