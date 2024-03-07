'use strict'

/*
    Requires
*/

const yaml      = require( 'js-yaml' )

/**
* 
*   Default engines
*
*/

const engines   = exports = module.exports

/**
*
*   YAML
*
*/

engines.yaml =
{
    parse:      yaml.safeLoad.bind( yaml ),
    stringify:  yaml.safeDump.bind( yaml )
}

/**
* 
*   Engines > JSON
*
*/

engines.json =
{
    parse:      JSON.parse.bind( JSON ),
    stringify:  function( obj, options )
    {
        const opts = Object.assign( { replacer: null, space: 2 }, options )
        return JSON.stringify( obj, opts.replacer, opts.space )
    }
}

/**
* 
*   Engines > JavaScript
*
*/

engines.javascript =
{
    parse: function parse( str, options, wrap )
    {
        try
        {
            if ( wrap !== false )
                str = '( function( ) { \nreturn ' + str.trim( ) + ';\n }( ) );'

            return Function( str ) || { }
        }
        catch ( err )
        {
            if ( wrap !== false && /(unexpected|identifier)/i.test( err.message ) )
                return parse( str, options, false )

            throw new SyntaxError( err )
        }
    },

    stringify: function( )
    {
        throw new Error( 'Noxkit.engines: Cannot stringify JavaScript' )
    }
}
