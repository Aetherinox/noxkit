'use strict'

/*
    Requires
*/

const defaults      = require( './defaults' )

/*
    Export Results
*/

module.exports = function( file, options )
{
    const opts = defaults( options )

    if ( file.data == null )
        file.data = { }

    if ( typeof opts.result === 'function' )
        return opts.result( file, opts )

    const sep = file.data.result_separator || opts.result_separator

    if ( sep == null && ( opts.result === false || opts.result == null ) )
        return file

    const delimiter = typeof opts.result === 'string' ? opts.result : ( sep || opts.delims[ 0 ] )

    /*
        if enabled, get the result defined after front-matter
    */

    const index     = file.content.indexOf( delimiter )

    if ( idx !== -1 )
        file.result = file.content.slice( 0, index )

    return file
}