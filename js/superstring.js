/**
 * Takes an array of character arrays, computes the shortest superstring between 
 * the arrays and returns an array whose first element is an array of the shortest
 * superstring characters.
 * @param {Array} stringSegments
 * @returns {Array}
 */
function getShortestCommonSuperString(stringSegments) {
    if (stringSegments.length <= 1) {
        return stringSegments;
    }
    var match = [];
    var greedyMatch = [];
    var firstMergeIndex = 0;
    var secondMergeIndex = 1;

    for (var i = 0; i < stringSegments.length; i++) {
        for (var j = 0; j < stringSegments.length; j++) {
            if (i === j) {
                continue;
            }
            match = getOverlappingSegment(stringSegments[i], stringSegments[j]);
            if (match.length > greedyMatch.length) {
                greedyMatch = match;
                firstMergeIndex = i;
                secondMergeIndex = j;
            }
        }
    }

    var firstMergeSegment = stringSegments[firstMergeIndex];
    var secondMergeSegment = stringSegments[secondMergeIndex];
    if (firstMergeIndex > secondMergeIndex) {
        stringSegments.splice(firstMergeIndex, 1);
        stringSegments.splice(secondMergeIndex, 1);
    } else {
        stringSegments.splice(secondMergeIndex, 1);
        stringSegments.splice(firstMergeIndex, 1);
    }
    stringSegments.push(mergeSegments(firstMergeSegment, secondMergeSegment, greedyMatch));
    return getShortestCommonSuperString(stringSegments);
}

/**
 * Merges/Superimposes two segments
 * @param {Array} firstSegment
 * @param {Array} secondSegment
 * @param {Array} match
 * @returns {Array}
 */
function mergeSegments(firstSegment, secondSegment, match) {
    if (match.length === 0) {
        return firstSegment.concat(secondSegment);
    }
    if (firstSegment.length === match.length) {
        return secondSegment;
    }
    if (secondSegment.length === match.length) {
        return firstSegment;
    }

    var mergedSegment = superimposePartiallyIntersectingSegments(firstSegment, secondSegment, match);
    return (mergedSegment.length === 0) ? superimposePartiallyIntersectingSegments(secondSegment, firstSegment, match) : mergedSegment;
}

/**
 * Superimposes partially overlapping/intersecting segments and returns the result
 * @param {Array} firstSegment
 * @param {Array} secondSegment
 * @param {Array} match
 * @returns {Array}
 */
function superimposePartiallyIntersectingSegments(firstSegment, secondSegment, match) {
    var superimposedSegment = [];
    var isSuperImposedSuccessfully = false;
    for (var i = 0; i < firstSegment.length; i++) {
        if (firstSegment[i] !== secondSegment[0]) {
            superimposedSegment.push(firstSegment[i]);
        } else {
            var firstSegmentOverlap = firstSegment.slice(i, i + firstSegment.length);
            var matchOverlapOfFirstSegment = match.slice(0, firstSegmentOverlap.length);
            if (arraysEqual(firstSegmentOverlap, matchOverlapOfFirstSegment)) {
                isSuperImposedSuccessfully = true;
                superimposedSegment = superimposedSegment.concat(secondSegment);
                break;
            } else {
                superimposedSegment.push(firstSegment[i]);
            }
        }
    }
    return isSuperImposedSuccessfully ? superimposedSegment : [];
}

/**
 * Finds the overlapping segment between two segments 
 * @param {Array} firstSegment
 * @param {Array} secondSegment
 * @returns {Array}
 */
function getOverlappingSegment(firstSegment, secondSegment) {
    var overlap = [];
    var consecutiveOverlap = [];
    for (var i = 0; i < firstSegment.length; i++) {
        if (firstSegment[i] === secondSegment[0]) {
            var firstArray = firstSegment.slice(i);
            if (firstArray.length >= secondSegment.length) {
                consecutiveOverlap = getConsecutiveOverlap(firstArray, secondSegment);
            } else {
                consecutiveOverlap = getConsecutiveOverlap(secondSegment, firstArray);
            }
            overlap = (overlap.length < consecutiveOverlap.length) ? consecutiveOverlap : overlap;
        }
    }
    return overlap;
}

/**
 * Validates if to arrays consecutively overlaps from the top till the end of 
 * the shortest array. Returns the overlap if the arrays do consecutively overlap
 * or else returns and empty array
 * @param {Array} largerArray
 * @param {Array} smallerArray
 * @returns {Array}
 */
function getConsecutiveOverlap(largerArray, smallerArray) {
    if (largerArray.length < smallerArray.length) {
        return [];
    }
    for (var i = 0; i < smallerArray.length; i++) {
        if (largerArray[i] !== smallerArray[i]) {
            return [];
        }
    }
    return smallerArray;
}

/**
 * Validates if two arrays have the same set of values
 * @param {Array} firstArray
 * @param {Array} secondArray
 * @returns {Boolean}
 */
function arraysEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) {
        return false;
    }
    for (var i = 0; i < firstArray.length; i++) {
        if (firstArray[i] !== secondArray[i]) {
            return false;
        }
    }
    return true;
}

