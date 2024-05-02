const express = require('express');
const multer = require('multer');
const fs = require( 'fs');


// I got the idea to use the fileFilter option from Multer from this stackoverflow post
// https://stackoverflow.com/questions/60408575/how-to-validate-file-extension-with-multer-middleware 
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('File type is not allowed.'), false);
    }
  }
});

const app = express();
const PORT = 80;

// Designate the public folder as serving static resources
app.use(express.static('static'));
app.use(express.urlencoded({extended: true}));

const html_dir = __dirname + '/templates/';

app.get('/', (req, res) => {
  res.sendFile(`${html_dir}form.html`);
});

app.get('/success', (req, res) => {
  res.sendFile(`${html_dir}success.html`);
});

app.get('/send', (req, res) => {
  res.sendFile(`${html_dir}success.html`);
});

app.get('/error', (req, res) => {
  res.sendFile(`${html_dir}error.html`);
});

app.post('/send', upload.single('imgpreview'), (req, res) => {

  // do all the error checking; pawn it off to a helper method for cleaner code
  validation( req, res );
});

function sendSuccess ( request, response ) {
  response.sendFile(html_dir + 'success.html');

}

function sendError ( request, response ) {
  response.sendFile(html_dir + 'error.html');
}

function sendReset ( request, response ) {
  response.sendFile( html_dir + 'form.html' );
}

function validation ( request, response ) {
  // remember to remove the image if the bad user tries something fishy

  let body = request.body;

  // NAMES AND MESSAGE BOX
  if ( body.firstnamesender.length === 0 || body.lastnamesender.length === 0 || body.firstnamerecipient.length === 0 || body.lastnamerecipient.length === 0 || body.messagebox.length < 10 ) {
    sendReset( request, response );
    return;
  }

  // CHECK FOR THE VILLIAN STU ( STUART DENT ) as the recipient
  if ( ( body.firstnamerecipient.toLowerCase() === "stuart" && body.lastnamerecipient.toLowerCase() === "dent" ) || ( body.firstnamerecipient.toLowerCase() === "stu" && body.lastnamerecipient.toLowerCase() === "dent" )) {
    // delete the uploaded image

    // found out about fs from Dr. Dominguez from the "Avatar upload when invalid" post in the discord Clarification channel
    // along with this link on how to use it https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback 
    fs.unlink( request.file.path, (err) => {
      if ( err ) {
        throw err;
      }
      console.log( `${request.file.path} deleted` ); 
    });

    sendError( request, response );
    return;
  }

  // CCV
  if ( body.ccv.length != 3 && body.ccv.length != 4 ) {
    sendReset( request, response );
    return;
  }

  if ( isNaN( parseInt( body.ccv ) ) ) {
    sendReset( request, response );
    return;
  }

  // CARD NUMBER
  if ( body.cardnumber.length != 16 ) {
    sendReset( request, response );
    return;

  }

  const exp3 = new RegExp( "^[0-9]{16}$" );
  if ( !exp3.test( body.cardnumber ) ) {
    sendReset( request, response );
    return;

  }

  // start the value checking 

  // AMOUNT
  if ( isNaN( parseFloat( body.amount ) ) && isNaN( parseInt( body.amount ) ) ) {
    sendReset( request, response );
    return;
  }

  // CARD TYPES
  if ( body.cardtype != "visa" && body.cardtype != "amex" && body.cardtype != "discover" && body.cardtype != "mastercard" ) {
    sendReset( request, response );
    return;
  }


  // EMAIL

  // when the box has not been checked for email, easier to say when not null, since it wont appear in the body
  // unless it was checked
  if ( body.checkboxemail != null ) {
    // check email validity
    const exp = new RegExp( "^.*@.*\.*$");
    if ( body.email.length === 0 || !exp.test( body.email ) ) {
      sendReset( request, response );
      return;

    }
  }

  // PHONE NUMBER

  // sms should match the pattern if the user wants to have it sent that way
  if ( body.checkboxsms != null ) {
    // phone num validity
    const exp2 = new RegExp( "^[0-9]{3}-[0-9]{3}-[0-9]{4}$" );
    if ( body.phone.length === 0 || !exp2.test( body.phone ) ) {
      sendReset( request, response );
      return;

    }
  }

  // TERMS AND CONDITIONS

  // terms and conditions must be checked
  if ( body.termsandconditions === null ) {
    sendReset( request, response );
    return;

  }

  // DATE
  let currentDate = new Date();


  let cardDate = body.date.split('-');

  let cardDateYear = parseInt( cardDate[0], 10 );
  let cardDateMonth = parseInt( cardDate[1], 10 );

  let givenDate = new Date( cardDateYear, cardDateMonth, 0);
  if ( givenDate < currentDate ) {
    sendReset( request, response );
    return;
  }


  // IF WE MADE IT HERE THROUGH ALL THE VALIDATION THEN PROGRES TO SUCCESS :) 
  sendSuccess( request, response );
  console.log( "WE SUCCEED" );
}
// // As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));