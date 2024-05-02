const crypto = require('crypto');

crypto.randomBytes(32, (err, buff) => {
    if ( err ) {
      throw err;
    }
    console.log(`${buff.length} bytes of random data: ${buff.toString('hex')}`);
  })