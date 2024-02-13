// listen on the window for the button presses after the DOM content loads



// needed to initialize these variables before they are used, maybe it doesn't matter in JS but that would be weird 
let badInput = false;
let type = 0;




window.addEventListener('DOMContentLoaded', (e) => {
    
    // first four button elements from the calculator's first row
    const seven = document.querySelector(".seven");

    seven.addEventListener('click', function( event ) { clickedNumber(event.target.innerText) } );

    const eight = document.querySelector(".eight");

    eight.addEventListener('click', function( event ) { clickedNumber(event.target.innerText) } );

    const nine = document.querySelector(".nine");

    nine.addEventListener('click', function( event ) { clickedNumber(event.target.innerText) } );

    const slash = document.querySelector(".slash");

    slash.addEventListener('click', function( event ) { clickedSymbol(event.target.innerText) } );

    // second set of four button elements from the calculator's second row

    const four = document.querySelector(".four");

    four.addEventListener('click', function( event ) { clickedNumber(event.target.innerText) } );

    const five = document.querySelector(".five");

    five.addEventListener('click', function( event ) { clickedNumber(event.target.innerText) } );

    const six = document.querySelector(".six");

    six.addEventListener('click', function( event ) { clickedNumber(event.target.innerText) } );

    const multi = document.querySelector(".multi");

    multi.addEventListener('click', function( event ) { clickedSymbol(event.target.innerText) } );

    // third set of four button elements from the calculator's third row
    const one = document.querySelector(".one");

    one.addEventListener('click', function( event ) { clickedNumber(event.target.innerText) } );

    const two = document.querySelector(".two");

    two.addEventListener('click', function( event ) { clickedNumber(event.target.innerText) } );

    const three = document.querySelector(".three");

    three.addEventListener('click', function( event ) { clickedNumber(event.target.innerText) } );

    const subtract = document.querySelector(".subtract");

    subtract.addEventListener('click', function( event ) { clickedSymbol(event.target.innerText) } );

    
    // fourth set of four button elements from the calculator's fourth row
    const clear = document.querySelector(".clear");

    clear.addEventListener('click', function( event ) { clickedSymbol(event.target.innerText) } );

    const zero = document.querySelector(".zero");

    zero.addEventListener('click', function( event ) { clickedNumber(event.target.innerText) } );

    const decimal = document.querySelector(".decimal");

    decimal.addEventListener('click', function( event ) { clickedSymbol(event.target.innerText) } );

    const add = document.querySelector(".add");

    add.addEventListener('click', function( event ) { clickedSymbol(event.target.innerText) } );


    // last row of the calculator, equals operation
    const equal = document.querySelector(".equal");

    equal.addEventListener('click', function( event ) { clickedSymbol(event.target.innerText) } );

    // last row of the calculator, change sign operation
    const swtichSign = document.querySelector(".changeSign");

    swtichSign.addEventListener('click', function( event ) { clickedSymbol(event.target.innerText) } );


    // in the history section responds to the button to clear history
    const hButton = document.querySelector(".clearHistory");

    hButton.addEventListener('click', function( event ) { clickedHistory(event.target.innerText) } );

    // in the history section responds to the list
    const listItems = document.querySelector(".hItems");

    listItems.addEventListener('click', function( event ) { insertHistoryItem(event.target.innerText) } );

    // in the history section responds to the list and 
    const typed = document.querySelector(".calculationArea");
    typed.addEventListener( 'keydown', e => { 
        // console.log( e );
        if ( e.key === 'Enter' ) {
            console.log( typed.value );

            if ( isNaN( typed.value ) ) {
                badInput = true;
                output = typed.value;
            }
            else {
                type = typed.value;

                output = typed.value;
                console.log( "output", output );
            }
        }

    });

    listItems.addEventListener('click', function( event ) { insertHistoryItem(event.target.innerText) } );
  });

// the current total of the operations
let currVal = 0;
let parsed = currVal;

// the last operator the user wanted to use, since they can click two operators
// back to back and we only want to use the last one
let lastOperator;

// what shows up on the screen in the calculation area
let output = "0";

// since we need to put the entire calculation into the history, have this string track the process for each one
// let calcString = "";

// need a flag to recognize if the user is hitting an operation button back to back 
let lastButtonOp = false;

// need a flag to recognize if the user is hitting the decimal button back to back
let lastButtonDec = false;

// need a flag to recognize if the user is hitting the equals button repeatedly and not to add 0 to the list
let justCalcd = false;

let twoSymbols = false;

// the document query selector for the calculation area on the page
const calcArea = document.querySelector( '.calculationArea' );

// flag for checking if we had a NaN or infinity
let badMath = false;
// let input = calcArea.value;
// console.log( "input", input );
// let parsed = parseInt( input );
// currVal += parsed;



function clickedNumber( number ) {

    // AAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH

    // lets make it perform the '=' stuff under the hood whenever we just got an operation and this is the second number of the thing 
    lastButtonDec = false;

    lastButtonOp = false;
    justCalcd = false;
    badMath = false;
    // input = calcArea.value;
    // output += input;

    // console.log( input );

    // all numbers should have this happen, since there behaviour in this scenario is consistent
    // make sure to just overwrite the 0 if thats all there is in the space
    
    // since we just did a full operation, start a new one
    if ( lastOperator === '=' ) {
        output = number;

        // calcString = "";
        // calcString = number;
        // we just hit a number to start a new calculation after doing some math
        // make sure that the last operator from the previous calculation is no longer 
        // stored
        lastOperator = null;
    }
    else {
        // also reset the calculation area back to 0 after a symbol press so that it never has a zero at the start of a number :)
        if ( output === "0" ) {
            output = number;
            // calcString = number;
        }
        else {
            // calcString += number;
            output += number;
        }
        // if ( lastOperator != null ) {

        //     parsed = parseFloat( output );
        //     completeMath( parsed );
        //     // lastOperator = '=';
        //     output = currVal;
        //     console.log( "parsed" , parsed );
        //     console.log ( " output " , output );
        //     console.log ( "last operatro " , lastOperator );
        // }
    }



    calcArea.value = output;

    // console.log( "area val ", calcArea.value );
}

function clickedSymbol( symbol ) {

    badMath = false;
    switch ( symbol ) {
        // there are six symbols that we currenty have implemented/are implementing rn
        
        // send the math cases over to a function for math
        case '/':

            justCalcd = false;

            if (lastButtonOp ) {
                lastOperator = symbol;
            }
            // if ( output != "0" ) {
            //     doTheMath( symbol );
            // }
            doTheMath( symbol );

            lastButtonOp = true;

            break;

        case 'X':
            justCalcd = false;

            if (lastButtonOp ) {
                lastOperator = symbol;
            }
            // if ( output != "0" ) {
            //     doTheMath( symbol );
            // }
            doTheMath( symbol );
            lastButtonOp = true;

            break;
        
        case '-':
            justCalcd = false;

            if (lastButtonOp ) {
                lastOperator = symbol;
            }
            // if ( output != "0" ) {
            //     doTheMath( symbol );
            // }
            doTheMath( symbol );
            lastButtonOp = true;

            break;

        case 'C':
            justCalcd = false;

            //reset the state of the calculator
            output = "0";
            // calcString = "";
            currVal = 0;
            lastOperator = null;
            parsed = currVal;


            break;

        case '.':
            // since we throw the decimal point ontot the end of numbers it will make them
            // doubles whenever they are parsed out the of the strings 
            
            // // previously was appending a decimal point to the value in the calculation area
            // // even though that was the end of the previous operation
            if ( lastOperator === '=' ) {
                output = "0";
                lastOperator = null;
            }
            if ( !lastButtonDec ) {
                output += symbol;

            }
            // calcString += symbol;
            justCalcd = false;

            lastButtonDec = true;
            break;

        case '+':
            justCalcd = false;

            if (lastButtonOp ) {
                lastOperator = symbol;
            }

            console.log( "here" );
            doTheMath( symbol );
            lastButtonOp = true;

            break;

        case '=':
            // if there was no operation given, just keep the number
            if ( lastOperator === null ) {
                return;
            }
            parsed = parseFloat( output );
            completeMath( parsed );
            lastOperator = '=';
            output = currVal;
            currVal = 0;
            parsed = currVal;



            if ( !justCalcd && !badMath ) {
                addHistory();
            }
            break;

        case '+/-':
            // use for making negative numbers

            // justCalcd = false;

            // if (lastButtonOp ) {
            //     lastOperator = symbol;
            // }
            if ( output != "0" ) {
                doTheMath( symbol );
            }
            // lastButtonOp = true;

            break;


    }
    // console.log( "cleared");
    lastButtonOp = true;

    // console.log( "final output",  output );
    if ( badMath ) {
        calcArea.value = "Error";
    }
    else {
        calcArea.value = output;

    }

}

function doTheMath( symbol ) {

    // need to fix it not using the last operator if given two 
    // console.log( "last" , lastOperator );

    // console.log(symbol);
    parsed = parseFloat( output );

    // console.log( "parsed ", parsed );
    // console.log( " currVal ", currVal );

    if ( symbol === '+/-' ) {
        parsed *= -1;
        output = parsed;
        return;
    }
    // if we have a number to work with
    if ( currVal != 0 ) {
        // console.log( "here " );
        if ( lastOperator === null ) {
            lastOperator = symbol;
            completeMath(parsed);

        }
        else if ( lastButtonOp ) {
            return;
        }
        else {
            completeMath( parsed );
            lastOperator = symbol;
        }
        // lastOperator = symbol;
        // completeMath(parsed);
    }
    else {
        // when the current value is 0
        // console.log( "or here " );

        currVal = parsed;
    }

    lastOperator = symbol;

    // console.log( "end of math " , lastOperator );
    if ( output != "Error" ) {
        output = "0"

    }
}

// needs to be separated from doTheMath so we can also use it when pressing "="
function completeMath( copy ) {
    switch ( lastOperator ) {
        case '/':
            currVal /= copy;

            // console.log( "first" , currVal );
            if ( currVal == "NaN" || currVal == "Infinity" ) {

                badMath = true;
                currVal = 0;

            }
            else {
                addHistory();
            }
            break;
        
        case 'X':
            currVal *= copy;
            if ( currVal == "NaN" || currVal == "Infinity" ) {

                badMath = true;
                currVal = 0;

            }
            else {
                addHistory();
            }
            break;

        case '-':
            currVal -= copy;
            if ( currVal == "NaN" || currVal == "Infinity" ) {

                badMath = true;
                currVal = 0;

            }
            else {
                addHistory();
            }
            break;

        case '+':
            currVal += copy;
            if ( currVal == "NaN" || currVal == "Infinity" ) {

                badMath = true;
                currVal = 0;

            }
            else {
                addHistory();
            }
            break;

        
    }
}


// empty the history list
function clickedHistory() {
    let hList = document.getElementById('historyItems');

    while ( hList.children.length > 0 ) {
        hList.removeChild( hList.lastChild );
    }

    // console.log( "removed all " );
            
}

function addHistory() {
    // now to add to the history after we just did the cool stuf ;)

    let newCalc = document.createElement('li');
    newCalc.innerHTML = currVal;

    document.getElementById('historyItems').appendChild(newCalc);
    justCalcd = true;
}

function insertHistoryItem( input ) {

    console.log( "input" , input );
    output = input;
    calcArea.value = input;
}
