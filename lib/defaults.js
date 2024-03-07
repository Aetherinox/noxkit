'use strict'

/*
    Requires
*/

const engines       = require( './engines' )
const utils         = require( './utils' )

/*
    Export Defaults
*/

module.exports = function( options )
{
    const opts = Object.assign( {}, options )

    /*
        make sure delims are an array
    */

    opts.delims = utils.arrayify( opts.delims || opts.delimiters || '---' )

    if ( opts.delims.length === 1 )
        opts.delims.push( opts.delims[ 0 ] )

    opts.lang       = ( opts.lang || opts.language || 'yaml' ).toLowerCase( )
    opts.engines    = Object.assign( {}, engines, opts.parsers, opts.engines )

    return opts
}