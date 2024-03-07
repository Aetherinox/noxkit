'use strict'

/*
    Requires
*/

const typeOf        = require( 'kind-of' )
const stringify     = require( './stringify' )
const utils         = require( './utils' )

/*
    Export To File

    Normalize the given value to ensure an object is returned with the expected properties.
*/

module.exports = function( file )
{
    if ( typeOf( file ) !== 'object' )
        file = { content: file }

    if ( typeOf( file.data ) !== 'object' )
        file.data = {}

    /*
        if file was passed as an object, ensure "file.content" is set
    */

    if ( file.contents && file.content == null )
        file.content = file.contents

    /*
        set non-enumerable properties on the file object
    */

    utils.define( file, 'orig',         utils.toBuffer( file.content ) )
    utils.define( file, 'lang',         file.lang || '' )
    utils.define( file, 'matter',       file.matter || '' )
    utils.define( file, 'stringify',    function( data, options )
    {
        if ( options && options.lang )
            file.lang = options.lang

        return stringify( file, data, options )
    } )

    /*
        strip BOM and ensure "file.content" is a string
    */

    file.content        = utils.toString( file.content )
    file.isEmpty        = false
    file.result         = ''

    return file
}
