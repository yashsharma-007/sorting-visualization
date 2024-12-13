# Sorting Visualization

<p align="right">Author: Yash Sharma</p>

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Components and Materials](#components-and-materials)
4. [Software Requirements](#software-requirements)
5. [Setup and Installation](#setup-and-installation)
6. [Code Explanation](#code-explanation)
7. [Running the Project](#running-the-project)
8. [File Structure](#file-structure)
9. [Future Enhancements](#future-enhancements)
10. [License](#license)

---

## Project Overview

Sorting Visualization is an interactive project that demonstrates the working of various sorting algorithms such as Bubble Sort, Merge Sort, and Quick Sort. By visualizing the sorting process in real time, this project helps users understand the underlying logic and efficiency of these algorithms.

---

## Features

- **Real-time Sorting Visualization**: Step-by-step graphical representation of sorting algorithms.
- **Multiple Algorithms**: Supports Bubble Sort, Merge Sort, Quick Sort, and more.
- **User Interaction**:
  - Pause and resume the animation.
  - Control the speed of the visualization.
  - Select the algorithm and dataset size dynamically.
- **Performance Metrics**: Displays the time complexity and number of comparisons for each algorithm.
- **Educational Tool**: Ideal for students and developers to learn sorting algorithms.

---

## Components and Materials

- **Python**: Core language for development.
- **Pygame**: For creating animations and graphical interfaces.
- **Tkinter**: Provides the user interface for interaction.
- **NumPy**: Optional, used for efficient array manipulation.

---

## Software Requirements

- **Python 3.x** (for running the code)
- **Libraries**:
  - Pygame (for graphical visualization)
  - Tkinter (for user interface management)
  - NumPy (optional for array operations)

---

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YashSharma/sorting-visualization.git
   ```

2. Navigate to the project directory:

   ```bash
   cd sorting-visualization
   ```

3. Install the required libraries:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the project:

   ```bash
   python main.py
   ```

---

## Code Explanation

The project consists of three main components:

1. **Sorting Algorithms**: Contains implementations of algorithms such as:
   - Bubble Sort
   - Merge Sort
   - Quick Sort
   Each algorithm is implemented as a function that interacts with the visualization module.

2. **Visualization**:
   - Built using Pygame to display real-time changes in the dataset.
   - Visual elements like bars represent dataset values, which change position during sorting.

3. **User Interface**:
   - Tkinter provides controls for:
     - Selecting algorithms.
     - Adjusting speed and dataset size.
     - Starting, pausing, and resetting the visualization.

---

## Running the Project

To run the project, execute the following command in your terminal:

```bash
python main.py
```

Use the interface to select an algorithm, adjust the dataset size, and control the speed of visualization.

---

## File Structure

```bash
sorting_visualization/
├── assets/                # Contains images and sound files (if any)
│   └── background.png
├── src/                   # Source code for the project
│   ├── main.py            # Main script for running the visualization
│   ├── algorithms.py      # Sorting algorithm implementations
│   └── ui.py              # Tkinter user interface management
├── requirements.txt       # Python libraries for the project
├── README.md              # Project documentation
└── LICENSE                # Project license file
```

---

## Future Enhancements

- **Additional Algorithms**:
  - Implement more algorithms like Heap Sort, Radix Sort, and Counting Sort.
- **Performance Comparison**:
  - Add real-time graphs comparing sorting speeds.
- **Enhanced User Interface**:
  - Provide more customization options, such as color themes and advanced controls.
- **Web-Based Version**:
  - Create a web-based version for broader accessibility.

---

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code.

