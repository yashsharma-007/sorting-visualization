// Get DOM elements
const canvas = document.getElementById('sortingCanvas');
const ctx = canvas.getContext('2d');
const algorithmSelect = document.getElementById('algorithm');
const arraySizeInput = document.getElementById('arraySize');
const speedInput = document.getElementById('speed');
const generateBtn = document.getElementById('generate');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const complexityDisplay = document.getElementById('complexity');
const comparisonsDisplay = document.getElementById('comparisons');
const swapsDisplay = document.getElementById('swaps');
const timeTakenDisplay = document.getElementById('timeTaken');
const customArrayInput = document.getElementById('customArray');
const useCustomArrayBtn = document.getElementById('useCustomArray');
const bestAlgorithmDisplay = document.getElementById('bestAlgorithmDisplay');
const algorithmTimesDisplay = document.getElementById('algorithmTimesDisplay');

// Variables
let array = [];
let arraySize = parseInt(arraySizeInput.value);
let speed = parseInt(speedInput.value);
let isSorting = false;
let isPaused = false;
let comparisons = 0;
let swaps = 0;
let startTime, endTime;
let algorithmTimes = {}; 
let algo= {};
// Store time taken by each algorithm

// Generate a random array
function generateArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * canvas.height));
    }
    comparisons = 0;
    swaps = 0;
    isPaused = false;
    updateStats();
    drawArray();
}

// Draw the array on the canvas
function drawArray(highlightedIndices = []) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const barWidth = canvas.width / array.length;
    array.forEach((value, index) => {
        ctx.fillStyle = highlightedIndices.includes(index) ? '#ff4949' : '#16a085';
        ctx.fillRect(index * barWidth, canvas.height - value, barWidth, value);
    });
}

// Update statistics display
function updateStats() {
    comparisonsDisplay.textContent = `Comparisons: ${comparisons}`;
    swapsDisplay.textContent = `Swaps: ${swaps}`;
}

// Sleep function for delays
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Highlight selected algorithm
function highlightSelectedAlgorithm() {
    const options = algorithmSelect.options;
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("highlighted");
    }
    options[algorithmSelect.selectedIndex].classList.add("highlighted");
}

// Set complexity display
function setComplexity(complexity) {
    complexityDisplay.textContent = `Time Complexity: ${complexity}`;
}

// Sorting Algorithms
async function bubbleSort() {
    setComplexity('O(n²)');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (isPaused) {
                await sleep(50); // Check for pause
                continue; // Skip the rest of the loop if paused
            }
            comparisons++;
            if (array[j] > array[j + 1]) {
                swaps++;
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray([j, j + 1]);
                updateStats();
                await sleep(101 - speed);
            }
        }
    }
}

async function insertionSort() {
    setComplexity('O(n²)');
    for (let i = 1; i < array.length; i++) {
        if (isPaused) {
            await sleep(50); // Check for pause
            continue; // Skip the rest of the loop if paused
        }
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            comparisons++;
            swaps++;
            array[j + 1] = array[j];
            drawArray([j, j + 1]);
            updateStats();
            await sleep(101 - speed);
            j--;
        }
        array[j + 1] = key;
        drawArray([j + 1]);
        updateStats();
    }
}

async function selectionSort() {
    setComplexity('O(n²)');
    for (let i = 0; i < array.length - 1; i++) {
        if (isPaused) {
            await sleep(50); // Check for pause
            continue; // Skip the rest of the loop if paused
        }
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            comparisons++;
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            swaps++;
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            drawArray([i, minIndex]);
            updateStats();
            await sleep(101 - speed);
        }
    }
}

async function mergeSort() {
    setComplexity('O(n log n)');
    await mergeSortHelper(array);
}

async function mergeSortHelper(arrayToSort) {
    if (arrayToSort.length <= 1) return arrayToSort;

    const mid = Math.floor(arrayToSort.length / 2);
    const left = await mergeSortHelper(arrayToSort.slice(0, mid));
    const right = await mergeSortHelper(arrayToSort.slice(mid));

    const mergedArray = await merge(left, right);
    for (let i = 0; i < mergedArray.length; i++) {
        array[i] = mergedArray[i];
    }
    drawArray();
    return mergedArray;
}

async function merge(left, right) {
    const sortedArray = [];
    while (left.length && right.length) {
        if (isPaused) {
            await sleep(50); // Check for pause
            continue; // Skip the rest of the loop if paused
        }
        comparisons++;
        if (left[0] < right[0]) {
            sortedArray.push(left.shift());
        } else {
            sortedArray.push(right.shift());
        }
        await sleep(101 - speed);
    }
    return [...sortedArray, ...left, ...right];
}

useCustomArrayBtn.addEventListener('click', () => {
    const customArray = customArrayInput.value.split(',').map(Number);
    
    if (customArray.every(num => !isNaN(num))) {
        array = customArray;
        arraySize = customArray.length;
        drawArray();
        comparisons = 0;
        swaps = 0;
        algorithmTimes = {}; // Reset algorithm times for new array
        bestAlgorithmDisplay.textContent = '';
        algorithmTimesDisplay.innerHTML = '';
    } else {
        alert('Please enter a valid array of numbers, separated by commas.');
    }
})

async function quickSort(arrayToSort = array) {
    if (arrayToSort.length <= 1) return arrayToSort;

    const pivot = arrayToSort[arrayToSort.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arrayToSort.length - 1; i++) {
        if (isPaused) {
            await sleep(50); // Check for pause
            continue; // Skip the rest of the loop if paused
        }
        comparisons++;
        if (arrayToSort[i] < pivot) {
            left.push(arrayToSort[i]);
        } else {
            right.push(arrayToSort[i]);
        }
    }

    const sortedArray = [...await quickSort(left), pivot, ...await quickSort(right)];
    for (let i = 0; i < sortedArray.length; i++) {
        array[i] = sortedArray[i];
    }
    drawArray();
    return sortedArray;
}

// Run algorithm in the background without visualization
async function runAlgorithmInBackground(algorithm, arrayToSort) {
    switch (algorithm) {
        case 'bubbleSort':
            await bubbleSortNoVisual(arrayToSort);
            break;
        case 'insertionSort':
            await insertionSortNoVisual(arrayToSort);
            break;
        case 'selectionSort':
            await selectionSortNoVisual(arrayToSort);
            break;
        case 'mergeSort':
            await mergeSortNoVisual(arrayToSort);
            break;
        case 'quickSort':
            await quickSortNoVisual(arrayToSort);
            break;
    }
}

// Implement non-visual versions of sorting algorithms (without canvas drawing)
async function bubbleSortNoVisual(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            comparisons++;
            if (arr[j] > arr[j + 1]) {
                swaps++;
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
            comparisons++;
            swaps++;
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

async function selectionSortNoVisual(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            comparisons++;
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            swaps++;
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
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
    const result = [];
    while (left.length && right.length) {
        comparisons++;
        if (left[0] < right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left, right);
}

async function quickSortNoVisual(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        comparisons++;
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...await quickSortNoVisual(left), pivot, ...await quickSortNoVisual(right)];
}

// Determine the best algorithm based on time taken
function determineBestAlgorithm() {
    let bestAlgorithm = null;
    let bestTime = Infinity;
    for (const algorithm in algorithmTimes) {
        if (algorithmTimes[algorithm] < bestTime) {
            bestTime = algorithmTimes[algorithm];
            bestAlgorithm = algorithm;
        }
    }
    return bestAlgorithm;
}

// Display the times for all algorithms
function displayAlgorithmTimes() {
    algorithmTimesDisplay.innerHTML = ''; // Clear previous results
    for (const algorithm in algorithmTimes) {
        const timeElement = document.createElement('p');
        timeElement.textContent = `${algorithm}: ${algorithmTimes[algorithm]}ms`;
        algorithmTimesDisplay.appendChild(timeElement);
    }
}

// Start sorting process
function deepCopyArray(arr) {
    return [...arr]; // Shallow copy works because the array contains primitive values (numbers)
}

// Start sorting process
async function startSorting() {
    if (isSorting) return;
    isSorting = true;
    highlightSelectedAlgorithm();
    const selectedAlgorithm = algorithmSelect.value;

    // Reset array for selected algorithm visualization
    resetArray();

    // Run all algorithms in the background, but without visualization
    for (const algorithm of ['bubbleSort', 'insertionSort', 'selectionSort', 'mergeSort', 'quickSort']) {
        //if (algorithm === selectedAlgorithm) continue; // Skip the selected algorithm for now

        // Create a deep copy of the array for background sorting to avoid altering the main array
        const tempArray = deepCopyArray(array);
        startTime = performance.now();
        await runAlgorithmInBackground(algorithm, tempArray); // Calculate time in the background
        endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        algorithmTimes[algorithm] = timeTaken; // Store the time taken for the algorithm
    }

    // Run the selected algorithm for visualization
    resetArray(); // Ensure visualized algorithm starts with the same array
    startTime = performance.now(); // Record start time
    await window[selectedAlgorithm](); // Only visualize the selected algorithm
    endTime = performance.now(); // Record end time

    const selectedTimeTaken = (endTime - startTime).toFixed(2);
    algo[selectedAlgorithm] = selectedTimeTaken; // Store time for the selected algorithm

    const bestAlgorithm = determineBestAlgorithm(); // Determine the best algorithm based on time
    displayAlgorithmTimes(); // Display times for all algorithms
    bestAlgorithmDisplay.textContent = `Best Algorithm: ${bestAlgorithm}`;
    timeTakenDisplay.textContent = `Time Taken for visualization: ${selectedTimeTaken} ms`; // Display visualized algorithm time

    isSorting = false;
}

// Pause sorting process
function pauseSorting() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

// Reset sorting process
function resetArray() {
    generateArray();
    isPaused = false;
    pauseBtn.textContent = 'Pause';
    bestAlgorithmDisplay.textContent = '';
}

// Event Listeners
generateBtn.addEventListener('click', generateArray);
startBtn.addEventListener('click', startSorting);
pauseBtn.addEventListener('click', pauseSorting);
resetBtn.addEventListener('click', resetArray);
arraySizeInput.addEventListener('input', () => {
    arraySize = parseInt(arraySizeInput.value);
    resetArray();
});
speedInput.addEventListener('input', () => {
    speed = parseInt(speedInput.value);
});
useCustomArrayBtn.addEventListener('click', () => {
    array = customArrayInput.value.split(',').map(Number);
    drawArray();
});
