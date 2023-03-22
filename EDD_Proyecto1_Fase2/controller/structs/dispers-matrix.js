export class DispersMatrix {
    constructor() {
        this.matrix = [];
        this.rows = 0;
        this.columns = 0;
    }

    // Method: getMatrix
    // Description: Get the matrix
    getMatrix() {
        return this.matrix;
    }

    // Method: setMatrix
    // Description: Set the matrix
    setMatrix(matrix) {
        this.matrix = matrix;
    }

    // Method: getRows
    // Description: Get the number of rows
    getRows() {
        return this.rows;
    }

    // Method: setRows
    // Description: Set the number of rows
    setRows(rows) {
        this.rows = rows;
    }

    // Method: getColumns
    // Description: Get the number of columns
    getColumns() {
        return this.columns;
    }

    // Method: setColumns
    // Description: Set the number of columns
    setColumns(columns) {
        this.columns = columns;
    }

    // Method: createMatrix
    // Description: Create a matrix
    createMatrix(rows, columns) {
        let matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < columns; j++) {
                matrix[i][j] = 0;
            }
        }
        this.matrix = matrix;
        this.rows = rows;
        this.columns = columns;
    }

    // Method: fillMatrix
    // Description: Fill the matrix with random numbers
    fillMatrix() {
        let matrix = this.matrix;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                matrix[i][j] = Math.floor(Math.random() * 100);
            }
        }
        this.matrix = matrix;
    }

    // Method: printMatrix
    // Description: Print the matrix
    printMatrix() {
        let matrix = this.matrix;
        let result = '';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                result += matrix[i][j] + ' ';
            }
            result += '\n';
        }
        return result;
    }

    // Method: printMatrix
    // Description: Print the matrix
    printMatrixHTML() {
        let matrix = this.matrix;
        let result = '';
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                result += matrix[i][j] + ' ';
            }
            result += '<br>';
        }
        return result;
    }
}