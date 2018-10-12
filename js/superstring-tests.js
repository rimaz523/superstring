//Test Cases for function : getShortestCommonSuperString
QUnit.test("getShortestCommonSuperString : Shortest common superstring will be an empty array when empty array or empty string array is passed", function (assert) {
    var stringSegments = [[], [], []];
    assert.equal(getShortestCommonSuperString(stringSegments)[0].join(""), "", "Passed : Superstring is an empty array when empty arrays are passed");

    var stringSegments = [[""], [""], [""]];
    assert.equal(getShortestCommonSuperString(stringSegments)[0].join(""), "", "Passed : Superstring is an empty array when empty string arrays are passed");
});

QUnit.test("getShortestCommonSuperString : Shortest common superstring will be the passed string if only one string is passed", function (assert) {
    var stringSegments = ["just another string".split("")];
    assert.equal(getShortestCommonSuperString(stringSegments)[0].join(""), "just another string", "Passed : Superstring is the same as the non empty string passed when only one string is passed");

    var stringSegments = ["".split("")];
    assert.equal(getShortestCommonSuperString(stringSegments).join(""), "", "Passed : Superstring is an empty array when array with an empty string is passed");
});

QUnit.test("getShortestCommonSuperString : Shortest common superstring for arbitrary string arrays", function (assert) {
    var stringSegments = [
        "the lazy dog".split(""),
        "the quic".split(""),
        "wn fox".split(""),
        "quick brown fox jumps".split(""),
        "umps over the lazy".split("")
    ];
    assert.equal(getShortestCommonSuperString(stringSegments)[0].join(""), "the quick brown fox jumps over the lazy dog", "Passed : for phrase 'the quick brown fox jumps over the lazy dog' broken down to 5 segments");
    
    var stringSegments = [
        "all is well".split(""),
        "ell that en".split(""),
        "hat end".split(""),
        "t ends well".split("")
    ];
    assert.equal(getShortestCommonSuperString(stringSegments)[0].join(""), "all is well that ends well", "Passed : for phrase 'all is well that ends well' broken down to 4 segments");
    
    var stringSegments = [
        "12345".split(""),
        "345678".split(""),
        "3".split(""),
        "890".split("")
    ];
    assert.equal(getShortestCommonSuperString(stringSegments)[0].join(""), "1234567890", "Passed : for phrase '1234567890' broken down to 4 segments");
    
    var stringSegments = [
        "the lazy dog".split(""),
        "the quic".split(""),
        "wn fox".split(""),
        "quick brown fox jumps".split(""),
        "umps over the lazy".split(""),
        "".split("")
    ];
    assert.equal(getShortestCommonSuperString(stringSegments)[0].join(""), "the quick brown fox jumps over the lazy dog", "Passed : for phrase 'the quick brown fox jumps over the lazy dog' broken down to 6 segments with one empty string array");
    
});


//Test Cases for function : mergeSegments
QUnit.test("mergeSegments : Merged segment will be empty when both segments are empty", function (assert) {
    var firstSegment = [];
    var secondSegment = [];
    var match = [];
    assert.equal(mergeSegments(firstSegment, secondSegment, match).join(""), [].join(""), "Passed : Merged segment will be empty when both segments are empty");
});

QUnit.test("mergeSegments : Merged segment when there is no match between the segments", function (assert) {
    var firstSegment = ["a", "b", "c"];
    var secondSegment = ["d", "e"];
    var match = [];
    assert.equal(mergeSegments(firstSegment, secondSegment, match).join(""), "abcde", "Passed : If there is no match, then the merged segment will the concatenation of the first segment with the second");
});

QUnit.test("mergeSegments : Merged segment when either of the segments are equal to the match", function (assert) {
    var firstSegment = ["a", "b", "c"];
    var secondSegment = ["b", "c"];
    var match = ["b", "c"];
    assert.equal(mergeSegments(firstSegment, secondSegment, match).join(""), "abc", "Passed : If the match has the same length as the second segment, then merged segment will be exactly like the first segment");

    var firstSegment = ["b", "c"];
    var secondSegment = ["a", "b", "c"];
    var match = ["b", "c"];
    assert.equal(mergeSegments(firstSegment, secondSegment, match).join(""), "abc", "Passed : If the match has the same length as the first segment, then merged segment will be exactly like the second segment");
});

QUnit.test("mergeSegments : Merged segment when the two segments partially match", function (assert) {
    var firstSegment = "the quick brown fox".split("");
    var secondSegment = "brown fox jumps".split("");
    var match = "brown fox".split("");
    assert.equal(mergeSegments(firstSegment, secondSegment, match).join(""), "the quick brown fox jumps", "Passed : Superimpose both segments that have a partial overlap at the end of the first segment and start of the second");

    var firstSegment = "brown fox jumps".split("");
    var secondSegment = "the quick brown fox".split("");
    var match = "brown fox".split("");
    assert.equal(mergeSegments(firstSegment, secondSegment, match).join(""), "the quick brown fox jumps", "Passed : Superimpose both segments that have a partial overlap at the start of the first segment and end of the second");
});


//Test Cases for function : superimposePartiallyIntersectingSegments
QUnit.test("superimposePartiallyIntersectingSegments : Superimposed segment will be empty when one or both supposedly intersecting segments are empty", function (assert) {
    var firstSegment = [];
    var secondSegment = [];
    var match = [];
    assert.equal(superimposePartiallyIntersectingSegments(firstSegment, secondSegment, match).join(""), [].join(""), "Passed : Superimposed segment will be an empty array when both arrays are empty");

    var firstSegment = "the lazy dog".split("");
    var secondSegment = [];
    var match = [];
    assert.equal(superimposePartiallyIntersectingSegments(firstSegment, secondSegment, match).join(""), [].join(""), "Passed : Superimposed segment will be an empty array when second array is empty");

    var firstSegment = [];
    var secondSegment = "the lazy dog".split("");
    var match = [];
    assert.equal(superimposePartiallyIntersectingSegments(firstSegment, secondSegment, match).join(""), [].join(""), "Passed : Superimposed segment will be an empty array when first array is empty");
});

QUnit.test("superimposePartiallyIntersectingSegments : Superimposed segment will be empty when start of first segment overlaps with the mid or end of second segment", function (assert) {
    var firstSegment = "the lazy dog".split("");
    var secondSegment = "jumps over the".split("");
    var match = "the".split("");
    assert.equal(superimposePartiallyIntersectingSegments(firstSegment, secondSegment, match).join(""), [].join(""), "Passed : Superimposed segment will be an empty array when start of the first segment overlap from the mid of the second segment");

    var firstSegment = "the lazy dog".split("");
    var secondSegment = "jumps over t".split("");
    var match = ["t"];
    assert.equal(superimposePartiallyIntersectingSegments(firstSegment, secondSegment, match).join(""), [].join(""), "Passed : Superimposed segment will be an empty array when start of the first segment overlap from the end of the second segment");
});

QUnit.test("superimposePartiallyIntersectingSegments : Validate superimposed segment when start of second segment overlaps with the mid or end of first segment", function (assert) {
    var firstSegment = "jumps over the".split("");
    var secondSegment = "the lazy dog".split("");
    var match = "the".split("");
    assert.equal(superimposePartiallyIntersectingSegments(firstSegment, secondSegment, match).join(""), "jumps over the lazy dog", "Passed : Superimposed segment will be a superimposed concatenation of first and second segment when start of the second segment overlaps from the mid of the first segment");

    var firstSegment = "jumps over t".split("");
    var secondSegment = "the lazy dog".split("");
    var match = ["t"];
    assert.equal(superimposePartiallyIntersectingSegments(firstSegment, secondSegment, match).join(""), "jumps over the lazy dog", "Passed : Superimposed segment will be a superimposed concatenation of first and second segment when start of the second segment overlaps from the end of the first segment");

    var firstSegment = "so the quick fox jumps over the lazy dog".split("");
    var secondSegment = "the lazy dog and then runs away".split("");
    var match = "the lazy dog".split("");
    assert.equal(superimposePartiallyIntersectingSegments(firstSegment, secondSegment, match).join(""), "so the quick fox jumps over the lazy dog and then runs away", "Passed : Superimposed segment will ignore the first false match of 'the', then continue on to superimpose the correct matching overlap");
});


//Test Cases for function : getOverlappingSegment
QUnit.test("getOverlappingSegment : Validate overlapping segment when one or both arrays are empty", function (assert) {
    var firstSegment = [];
    var secondSegment = [];
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), [].join(""), "Passed : Overlapping segment will be an empty array when both arrays are empty");

    var firstSegment = "the lazy dog".split("");
    var secondSegment = [];
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), [].join(""), "Passed : Overlapping segment will be an empty array when second array is empty");

    var firstSegment = [];
    var secondSegment = "the lazy dog".split("");
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), [].join(""), "Passed : Overlapping segment will be an empty array when first array is empty");
});

QUnit.test("getOverlappingSegment : Validate overlapping segment when start of first segment overlaps with the second segment", function (assert) {
    var firstSegment = ["q", "u", "i", "c", "k"];
    var secondSegment = ["t", "h", "e", " ", "q", "u"];
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), [].join(""), "Passed : Ignore overlap when start of first segment has the cosecutive overlap with the mid of the second segment");

    var firstSegment = ["u", "i", "c", "k"];
    var secondSegment = ["t", "h", "e", " ", "q", "u"];
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), [].join(""), "Passed : Ignore overlap when start of first segment has a cosecutive overlap with the end of the second segment");

    var firstSegment = ["u", "i", "c", "k"];
    var secondSegment = ["u", "i", "c", "k"];
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), ["u", "i", "c", "k"].join(""), "Passed : Overlap is the first or second segment when start of first segment has a cosecutive overlap with the start of the second segment");

    var firstSegment = "the lazy dog".split("");
    var secondSegment = "the quick brown fox jumps over the lazy dog".split("");
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), [].join(""), "Passed : Overlap is an empty array when start of first segment has an overlap with the start of the second segment, but it is not consecutive all the way");
});

QUnit.test("getOverlappingSegment : Validate overlapping segment when start of second segment overlaps with the first segment", function (assert) {
    var firstSegment = ["t", "h", "e", " ", "q", "u"];
    var secondSegment = ["q", "u", "i", "c", "k"];
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), ["q", "u"].join(""), "Passed : Overlap is valid when start of second segment has a cosecutive overlap with the mid of the first segment");

    var firstSegment = ["t", "h", "e", " ", "q", "u"];
    var secondSegment = ["u", "i", "c", "k"];
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), ["u"].join(""), "Passed : Overlap is valid when start of second segment has a cosecutive overlap with the end of the first segment");

    var firstSegment = "the lazy dog".split("");
    var secondSegment = "lazy".split("");
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), "lazy", "Passed : Overlap is the second segment when the second segment is fully contained within the first segment");

    var firstSegment = "the lazy dog and the lazy all".split("");
    var secondSegment = "lazy".split("");
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), "lazy", "Passed : Overlap is the second segment when the second segment is fully contained within the first segment and repeats more than once");
});

QUnit.test("getOverlappingSegment : Validate overlapping segment when both segments are not empty and don't have any consecutive matches", function (assert) {
    var firstSegment = ["t", "h", "e", " ", "q", "u"];
    var secondSegment = ["b", "r", "o", "w", "n"];
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), [].join(""), "Passed : Overlap is empty when both segments have no matches, though non empty");

    var firstSegment = ["t", "h", "e", "o", "w", " ", "q", "u"];
    var secondSegment = ["b", "r", "o", "w", "n"];
    assert.equal(getOverlappingSegment(firstSegment, secondSegment).join(""), [].join(""), "Passed : Overlap is empty when both segments have a match, but it is not an overlap at either two ends");
});


//Test Cases for function : getConsecutiveOverlap
QUnit.test("getConsecutiveOverlap : Validate consecutive overlap when one or both arrays are empty", function (assert) {
    var firstArray = [];
    var secondArray = [];
    assert.equal(getConsecutiveOverlap(firstArray, secondArray).join(""), [].join(""), "Passed : Overlap will be an empty array when both arrays are empty");

    var firstArray = "the lazy dog".split("");
    var secondArray = [];
    assert.equal(getConsecutiveOverlap(firstArray, secondArray).join(""), [].join(""), "Passed : Overlap will be an empty array when the second array is empty");

    var firstArray = [];
    var secondArray = "the lazy dog".split("");
    assert.equal(getConsecutiveOverlap(firstArray, secondArray).join(""), [].join(""), "Passed : Overlap will be an empty array when the first array is empty");
});

QUnit.test("getConsecutiveOverlap : Ignore consecutive overlap when second array is larger than the first", function (assert) {
    var firstArray = ["a"];
    var secondArray = ["a", "b"];
    assert.equal(getConsecutiveOverlap(firstArray, secondArray).join(""), [].join(""), "Passed : Overlap will be an empty array when second array is larger than the first even if there is a match");
});

QUnit.test("getConsecutiveOverlap : Get consecutive overlap when first array overlaps with the second smaller array", function (assert) {
    var firstArray = ["a", "b", "c"];
    var secondArray = ["a", "b"];
    assert.equal(getConsecutiveOverlap(firstArray, secondArray).join(""), ["a", "b"].join(""), "Passed : Overlap will be the second array when first array is larger than the second and matches all elements in the second array");

    var firstArray = ["a", "d", "a", "b", "c"];
    var secondArray = ["a", "b"];
    assert.equal(getConsecutiveOverlap(firstArray, secondArray).join(""), [].join(""), "Passed : Overlap will be an empty array when first array is larger than the second and matches all elements in the second array but not a consecutive match");

    var firstArray = ["a", "b"];
    var secondArray = ["a", "b"];
    assert.equal(getConsecutiveOverlap(firstArray, secondArray).join(""), secondArray.join(""), "Passed : Overlap will be the second array when first and second arrays are of the same size and match consecutively");
});


//Test Cases for function : arraysEqual
QUnit.test("arraysEqual : Check equality when both arrays are empty", function (assert) {
    var firstArray = [];
    var secondArray = [];
    assert.equal(arraysEqual(firstArray, secondArray), true, "Passed : If both arrays are empty then the arrays are equal");
});

QUnit.test("arraysEqual : Check equality when only one of the two arrays are empty", function (assert) {
    var firstArray = [];
    var secondArray = "the lazy dog".split("");
    assert.equal(arraysEqual(firstArray, secondArray), false, "Passed : If the first array is empty but the second array has elements, then the arrays aren't equal");

    var firstArray = "the lazy dog".split("");
    var secondArray = [];
    assert.equal(arraysEqual(firstArray, secondArray), false, "Passed : If the second array is empty but the first array has elements, then the arrays aren't equal");
});

QUnit.test("arraysEqual : Check equality when the array lengths aren't the same", function (assert) {
    var firstArray = "hello".split("");
    var secondArray = "hell".split("");
    assert.equal(arraysEqual(firstArray, secondArray), false, "Passed : If the first array is bigger than the second, then they aren't equal");

    var firstArray = "hell".split("");
    var secondArray = "hello".split("");
    assert.equal(arraysEqual(firstArray, secondArray), false, "Passed : If the second array is bigger than the first, then they aren't equal");
});

QUnit.test("arraysEqual : Check equality when both arrays have the same elements", function (assert) {
    var firstArray = "the quick brown fox".split("");
    var secondArray = "the quick brown fox".split("");
    assert.equal(arraysEqual(firstArray, secondArray), true, "Passed : If both arrays contain the same characters in order, then they are equal");

    var firstArray = "1234".split("");
    var secondArray = "1234".split("");
    assert.equal(arraysEqual(firstArray, secondArray), true, "Passed : If both arrays contain the same numbers in order, then they are equal");

    var firstArray = "1234bingo!".split("");
    var secondArray = "1234bingo!".split("");
    assert.equal(arraysEqual(firstArray, secondArray), true, "Passed : If both arrays contain the same alphanumeric in order, then they are equal");

    var firstArray = [" "];
    var secondArray = [" "];
    assert.equal(arraysEqual(firstArray, secondArray), true, "Passed : If both arrays contain one empty string character, then they are equal");

    var firstArray = "~!@#$%^&*()_+-=`;:'[]{}\|?/.,><".split("");
    var secondArray = "~!@#$%^&*()_+-=`;:'[]{}\|?/.,><".split("");
    assert.equal(arraysEqual(firstArray, secondArray), true, "Passed : If both arrays contain the same special characters in order, then they are equal");
});
