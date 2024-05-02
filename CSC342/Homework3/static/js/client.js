document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    const firstnamesender = document.querySelector('#firstnamesender');
    const lastnamesender = document.querySelector('#lastnamesender');
    const firstnamerecipient = document.querySelector('#firstnamerecipient');
    const lastnamerecipient = document.querySelector('#lastnamerecipient');
    const previewimage = document.querySelector('#imgpreview');
    const message = document.querySelector('#messagebox');

    const emailbox = document.querySelector('#checkemail');
    const smsbox = document.querySelector('#checksms');
    // const notifybox = document.querySelector('#checknotify');

    const email = document.querySelector('#email');
    const phone = document.querySelector('#phonenumber');

    const cardtypes = document.querySelector('#cardtype');

    const cardnum = document.querySelector('#cardnum');

    const date = document.querySelector('#date');
    const ccv = document.querySelector('#ccvinfo');
    const amount = document.querySelector('#moneyinfo');

    const termsandconditions = document.querySelector('#termsandconditions');
    
  
    form.addEventListener("submit", e => {

        error = false;
        // the html is posting the route too fast for the validation here to complete :(
        // e.preventDefault();

        if ( message.value.length < 10 ) {
            alert( "Message length should be at least 10 characters long!\n" );
            error = true;
            e.preventDefault();

        }

        if ( firstnamesender.value.length < 1 || firstnamerecipient < 1 ) {
            alert( "First name field should not be empty!\n" );
            error = true;
            e.preventDefault();

        }

        if ( lastnamesender.value.length < 1 || lastnamerecipient < 1 ) {
            alert( "Last name field should not be empty!\n" );
            error = true;
            e.preventDefault();

        }

        if ( emailbox.checked && email.value.length < 1 ) {
            alert( "Email field cannot be empty when the email is selected to be used for notifying a recipient!\n" );
            error = true;
            e.preventDefault();

        }

        if ( smsbox.checked && phone.value.length < 1 ) {
            alert( "Phone number field cannot be empty when SMS is selected to be used for notifying a recipient!\n" );
            error = true;
            e.preventDefault();

        }
  
        // This would really only happen if the user is evil and tried to change the options for the card type select
        if ( cardtypes.value != "visa" && cardtypes.value != "amex" && cardtypes.value != "discover" && cardtypes.value != "mastercard" ) {
            alert( "Card must be of one of the original four types!\n" );
            console.log( cardtypes.value );
            error = true;
            e.preventDefault();

        }

        if ( cardnum.value.length != 16 ) {
            alert( "Card number must be of format XXXXXXXXXXXXXXXX, where all the X's are numbers! There are 16 numbers.\n" );
            error = true;
            e.preventDefault();

        }

        console.log( date.value );

        let currentDate = new Date();
        
        let cardDate = date.value.split('-');

        let cardDateYear = parseInt( cardDate[0], 10 );
        let cardDateMonth = parseInt( cardDate[1], 10 );

        let givenDate = new Date( cardDateYear, cardDateMonth, 0);
        if ( givenDate < currentDate ) {
            alert( "Card was expired!\n" );
            error = true;
            e.preventDefault();

        }

        if ( ccv.value.length < 3 || ccv.value.length > 4 ) {
            alert( "CCV was over the expected length!\n" );
            error = true;
            e.preventDefault();

        }

        if ( amount.value.length < 1 ) {
            alert( "Amount cannot be empty!\n" );
            error = true;
            e.preventDefault();

        }

        if ( !termsandconditions.checked ) {
            alert( "Terms and conditions must be accepted before continuing!\n" );
            error = true;
            e.preventDefault();

        }


        if ( error ) {
            e.preventDefault();
        }
    });
  
    previewimage.addEventListener( 'change', e => {
        previewImage(e);
    });
      
  
    // console.log(courses.querySelectorAll(":checked"));6
  });


// function taken from the provided tutorialspoint website for previewing an image
// https://www.tutorialspoint.com/preview-an-image-before-it-is-uploaded-in-javascript 
function previewImage(event) {
    var input = event.target;
    var image = document.getElementById('preview');
    if (input.files && input.files[0]) {
       var reader = new FileReader();
       reader.onload = function(e) {
          image.src = e.target.result;
       }
       reader.readAsDataURL(input.files[0]);
    }
}