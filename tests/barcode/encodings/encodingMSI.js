(function() {
    var dataviz = kendo.dataviz,
        encodings = dataviz.encodings,
        encoding,
        checkMod10 = "Modulo10",
        checkModDouble10 = "Modulo10Modulo10",
        checkMod11 = "Modulo11",
        checkMod1110 = "Modulo11Modulo10",
        START = [2,1],
        STOP = [1,2,1],
        characters = [
            [1, 2, 1, 2, 1, 2, 1, 2],
            [1, 2, 1, 2, 1, 2, 2, 1],
            [1, 2, 1, 2, 2, 1, 1, 2],
            [1, 2, 1, 2, 2, 1, 2, 1],
            [1, 2, 2, 1, 1, 2, 1, 2],
            [1, 2, 2, 1, 1, 2, 2, 1],
            [1, 2, 2, 1, 2, 1, 1, 2],
            [1, 2, 2, 1, 2, 1, 2, 1],
            [2, 1, 1, 2, 1, 2, 1, 2],
            [2, 1, 1, 2, 1, 2, 2, 1]
        ];

    function calculateBaseUnit(width, dataLength, checkSumLength, quietZoneLength){
        var startStopLength = 7;
            return width /
                (12 * (dataLength + checkSumLength) + 2 * quietZoneLength + startStopLength);
    }

    function generateResult(value, options){
        var expectedResult = [];
        if(options.quietZoneLength){
            expectedResult.push(options.quietZoneLength);
        }

        expectedResult.push.apply(expectedResult, START);

        for( var i = 0; i < value.length; i++){
            expectedResult.push.apply(expectedResult, characters[value.charAt(i)]);
        }

        if(options.checkValues){
            for(var i = 0; i< options.checkValues.length; i++){
                expectedResult.push.apply(expectedResult, characters[options.checkValues[i]]);
            }
        }

        expectedResult.push.apply(expectedResult, STOP);

        if(options.quietZoneLength){
            expectedResult.push(options.quietZoneLength);
        }

        return expectedResult;
    }

    module("MSI", {
    });

    test("test value 8052 checksum mod10", function(){
        var encoding = new encodings.msimod10(),
            value = "8052",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["3"], quietZoneLength: encoding.options.quietZoneLength});
        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test value 09345 checksum mod10", function(){
        var encoding = new encodings.msimod10(),
            value = "09345",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["0"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test value 0 checksum mod10", function(){
        var encoding = new encodings.msimod10(),
            value = "0",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["0"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });


    test("test value 80523 checksum mod11", function(){
        var encoding = new encodings.msimod11(),
            value = "80523",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["8"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test value 09345 checksum mod11", function(){
        var encoding = new encodings.msimod11(),
            value = "09345",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["9"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test checksum mod11 over 6 digits", function(){
        var encoding = new encodings.msimod11(),
            value = "0123456",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["0"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });


    test("test checksum mod11 over 12 digits", function(){
        var encoding = new encodings.msimod11(),
            value = "0123456789012",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["5"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test value 0 checksum mod11", function(){
        var encoding = new encodings.msimod11(),
            value = "0",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["0"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test value 6 checksum mod11", function(){
        var encoding = new encodings.msimod11(),
            value = "6",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["1","0"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test value 8052 checksum double mod10", function(){
        var encoding = new encodings.msimod1010(),
            value = "8052",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["3", "4"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test value 09345 checksum double mod10", function(){
        var encoding = new encodings.msimod1010(),
            value = "09345",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["0", "5"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });


    test("test value 8052 checksum mod11 mod10", function(){
        var encoding = new encodings.msimod1110(),
            value = "8052",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["7", "5"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test value 09345 checksum mod11 mod10", function(){
        var encoding = new encodings.msimod1110(),
            value = "09345",
            result = encoding.encode(value, 200, 100),
            expectedResult = generateResult(value,
                {checkValues: ["9", "6"], quietZoneLength: encoding.options.quietZoneLength});

        ok(comparePatterns(result.pattern,expectedResult));
    });

    test("test invalid character error", function() {
        var thrownError = false;
        try{
            encoding.encode("01234a12", 300, 100);
        }
        catch (ex){
            thrownError = true;
        }
        ok(thrownError);
    });

    test("test base unit calculation", function(){
        var mod10 = new encodings.msimod10(),
            mod1010 = new encodings.msimod1010(),
            mod1110 = new encodings.msimod1110(),
            value = "09345",
            width = 200,
            precision = 2,
            quietZoneLength = mod10.options.quietZoneLength,
            resultNoCheckSum,
            resultSingleCheckSum,
            resultDoubleCheckSum,
            expectedResultNoCheckSum = fixed(calculateBaseUnit(width, value.length, 0, quietZoneLength), precision),
            expectedResultSingleCheckSum = fixed(calculateBaseUnit(width, value.length, 1, quietZoneLength), precision),
            expectedResultDoubleCheckSum = fixed(calculateBaseUnit(width, value.length, 2, quietZoneLength), precision);

        resultSingleCheckSum = mod10.encode(value, 200, 100).baseUnit,
        equal(fixed(resultSingleCheckSum, precision), expectedResultSingleCheckSum);

        resultDoubleCheckSum = mod1010.encode(value, 200, 100).baseUnit,
        equal(fixed(resultDoubleCheckSum, precision), expectedResultDoubleCheckSum);

        resultDoubleCheckSum = mod1110.encode(value, 200, 100).baseUnit,
        equal(fixed(resultDoubleCheckSum, precision), expectedResultDoubleCheckSum);
    });
})();
