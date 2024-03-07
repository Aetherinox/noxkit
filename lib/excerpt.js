'use strict';

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

    if ( typeof opts.excerpt === 'function' )
        return opts.excerpt( file, opts )

    const sep = file.data.excerpt_sep || opts.excerpt_sep

    if ( sep == null && ( opts.excerpt === false || opts.excerpt == null ) )
        return file

    const delimiter = typeof opts.excerpt === 'string' ? opts.excerpt : (sep || opts.delims[ 0 ] )

    /*
        if enabled, get the result defined after front-matter
    */

    const index     = file.content.indexOf( delimiter )

    if ( index !== -1 )
        file.excerpt = file.content.slice( 0, index )

    return file
}