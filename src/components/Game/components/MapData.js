class MapData {
    // Number of Cities
    egyptCitiesNum = 21
    usaCitiesNum = 42

    // Neighbours in Egypt map
    egyptCities = [
        [1, 2, 4, 21],
        [0, 2],
        [0, 1, 3, 4],
        [2, 4, 5, 7, 8, 9 , 10],
        [0, 2, 3, 5, 6, 13, 19, 20, 21],
        [3, 4, 6, 11],
        [5, 4, 12, 13],
        [3, 8, 10, 14],
        [3, 7, 11, 14],
        [3, 10, 14],
        [3, 7, 9, 14],
        [5, 8, 12, 14],
        [6, 11, 13, 14, 15],
        [6, 12, 15, 19],
        [7, 8, 9, 10, 11, 12, 15, 16],
        [12, 13, 14, 16, 17, 18, 19],
        [14, 15, 17],
        [15, 16, 18, 20],
        [15, 17, 19, 20],
        [13, 15, 18, 20],
        [4, 18, 19, 21],
        [0, 4, 20],
    ]

    // Neighbours in USA map
    usaCities = [
        [1, 16, 41],
        [0, 2, 39, 41],
        [1, 3, 4, 6, 7, 39],
        [2, 4],
        [2, 3, 5, 6],
        [4, 6, 10],
        [2, 4, 5, 7, 10],
        [2, 6, 9, 8, 10, 39],
        [39, 40, 42, 12, 10, 9, 7],
        [8, 11, 12, 10, 7],
        [5, 6, 7, 8, 9],
        [9, 12, 13, 22],
        [11, 9, 8, 13, 14, 42],
        [35, 24,14, 12, 22, 42, 11],
        [18, 23, 24, 13, 12, 42, 15, 40],
        [16, 18, 19, 14, 41, 40],
        [0, 15, 17, 41],
        [16, 15, 18, 19, 21],
        [19, 23, 14, 15, 17, 21],
        [17, 18, 21, 20, 23],
        [27, 21, 23, 33, 19],
        [17, 18, 19, 20],
        [11, 13, 35],
        [18, 19, 20, 33, 24, 14, 26],
        [13, 14, 23, 25, 26, 36, 35, 34],
        [24, 26, 37, 36],
        [33, 23, 24, 25, 27],
        [20, 26, 28, 33],
        [27, 29, 32],
        [28, 30, 32],
        [39, 31, 32],
        [30, 32],
        [28, 29, 30, 31],
        [27, 20, 23, 26],
        [35, 36, 38, 24],
        [24, 13, 22, 34],
        [24, 25, 34, 38, 37],
        [36, 25],
        [34, 36],
        [1, 2, 7, 8, 40, 41],
        [39, 41, 15, 14, 42, 8],
        [0, 1, 39, 40, 15, 16],
        [8, 40,12,14],
    ]

    
}
 
export default MapData;