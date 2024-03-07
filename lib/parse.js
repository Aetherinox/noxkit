'use strict'

/*
    Requires
*/

const getEngine     = require( './engine' )
const defaults      = require( './defaults' )

/*
    Export Parse
*/

module.exports = function( lang, str, options )
{
    const opts      = defaults( options )
    const engine    = getEngine( lang, opts )

    if ( typeof engine.parse !== 'function' )
        throw new TypeError( 'Noxkit.parse: Expected "' + lang + '.parse" to be a function' )

    return engine.parse( str, opts )
}