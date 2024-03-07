'use strict'

/*
    Export Engine
*/

module.exports = function( name, options )
{
    let engine = options.engines[ name ] || options.engines[ alias( name ) ]

    if ( typeof engine === 'undefined' )
        throw new Error( 'Noxkit engine "' + name + '" not registered' )

    if ( typeof engine === 'function' )
        engine = { parse: engine }

    return engine
}

/*
    Alias
*/

function alias( name )
{
    switch ( name.toLowerCase( ) )
    {
        case 'js':
        case 'javascript':
            return 'javascript'

        case 'coffee':
        case 'coffeescript':
        case 'cson':
            return 'coffee'
        
        case 'yaml':
        
        case 'yml':
            return 'yaml'

        default:
        {
            return name
        }
    }
}
