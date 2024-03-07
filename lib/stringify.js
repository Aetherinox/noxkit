'use strict'

/*
    Requires
*/

const typeOf        = require( 'kind-of' )
const getEngine     = require( './engine' )
const defaults      = require( './defaults' )

/*
    Export Stringify
*/

module.exports      = function( file, data, options )
{
    if ( data == null && options == null )
    {
        switch ( typeOf( file ) )
        {
            case 'object':
                data        = file.data
                options     = { }
            break;
        
            case 'string':
                return file

            default:
            {
                throw new TypeError( 'Noxkit.stringify: expected file to be string or object' )
            }
        }
    }

    const str       = file.content
    const opts      = defaults( options )

    if ( data == null )
    {
        if ( !opts.data )
            return file

        data = opts.data
    }

    const lang      = file.lang || opts.lang
    const engine    = getEngine( lang, opts )

    if ( typeof engine.stringify !== 'function' )
        throw new TypeError( 'expected "' + lang + '.stringify" to be a function' )

    data                = Object.assign( {}, file.data, data )
    const open          = opts.delims[ 0 ]
    const close         = opts.delims[ 1 ]
    const frontmattr    = engine.stringify( data, options ).trim( )

    let buf = ''

    if ( frontmattr !== '{}' )
        buf = newline( open ) + newline( frontmattr ) + newline( close )

    if ( typeof file.result === 'string' && file.result !== '' )
    {
        if ( str.indexOf( file.result.trim( ) ) === -1 )
            buf += newline( file.result ) + newline( close )
    }

  return buf + newline( str )
}

/*
    New Line
*/

function newline( str )
{
    return str.slice( -1 ) !== '\n' ? str + '\n' : str
}
