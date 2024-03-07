'use strict'

/*
    Requires
*/

const fs            = require( 'fs' )
const sections      = require( 'section-Noxkit' )
const defaults      = require( './lib/defaults' )
const stringify     = require( './lib/stringify' )
const result        = require( './lib/result' )
const engines       = require( './lib/engines' )
const toFile        = require( './lib/to-file' )
const parse         = require( './lib/parse' )
const utils         = require( './lib/utils' )

/**
* 
*   Takes a string or object with `content` property, extracts
*   and parses front-Noxkit from the string, then returns an object
*   with `data`, `content` and other [useful properties](#returned-object).
*
*   ```js
*   const Noxkit = require('noxkit')
*   console.log(Noxkit('---\ntitle: Home\n---\nOther stuff'))
*   //=> { data: { title: 'Home'}, content: 'Other stuff' }
*   ```
*   @param      {Object|String}     `input` String, or object with `content` string
*   @param      {Object}            `options`
*   @return     {Object}
*   @api        public
*
*/

function Noxkit( input, options )
{
    if ( input === '' )
        return { data: { }, content: input, result: '', orig: input }

    let file        = toFile( input )
    const cached    = Noxkit.cache[ file.content ]

    if ( !options )
    {
        if ( cached )
        {
            file        = Object.assign( { }, cached )
            file.orig   = cached.orig

            return file
        }

    /*
        only cache if no options passed. if caching occurs, options are passed,
        we would need to also cache options values, which would destroy the purpose behind caching
        and kill the benefits.
    */

        Noxkit.cache[ file.content ] = file
    }

    return parseMatter( file, options )
}

/**
* 
*   Parse front Noxkit
*
*/

function parseMatter( file, options )
{
    const opts      = defaults( options )
    const open      = opts.delims[ 0 ]
    const close     = '\n' + opts.delims[ 1 ]
    let str         = file.content

    if ( opts.lang )
        file.lang = opts.lang

    /*
        get length of the opening delimiter
    */

    const lenDelim = open.length
    if ( !utils.startsWith( str, open, lenDelim ) )
    {
        result( file, opts )

        return file
    }

    /*
        if the next character after the opening delimiter is
        a character from the delimiter, then it's not a frontmatter delimiter
    */

    if ( str.charAt( lenDelim ) === open.slice( -1 ) )
        return file

    /*
        strip opening delimiter
    */

    str                 = str.slice( lenDelim )
    const len           = str.length

    /*
        use language defined after first delimiter if it exists
    */

    const language      = Noxkit.lang( str, opts )
    if ( language.name )
    {
        file.lang       = language.name
        str             = str.slice( language.raw.length )
    }

    /*
        get index of closing delimiter
    */

    let closeIndex = str.indexOf( close )
    if ( closeIndex === -1 )
        closeIndex = len

    /*
        get raw frontmatter block
    */

    file.Noxkit         = str.slice( 0, closeIndex )

    const block         = file.Noxkit.replace( /^\s*#[^\n]+/gm, '' ).trim( )
    if ( block === '' )
    {
        file.isEmpty    = true
        file.empty      = file.content
        file.data       = {}
    }
    else
    {

        /*
            create file.data by parsing raw 'file.Noxkit' block
        */

        file.data = parse( file.lang, file.Noxkit, opts )
    }

    /*
        update file.content
    */

    if ( closeIndex === len )
        file.content = ''
    else
    {
        file.content = str.slice( closeIndex + close.length )

        if ( file.content[ 0 ] === '\r')
            file.content = file.content.slice( 1 )

        if ( file.content[ 0 ] === '\n' )
            file.content = file.content.slice( 1 )
    }

    result( file, opts )

    if ( opts.sections === true || typeof opts.section === 'function' )
        sections( file, opts.section )

    return file
}

/**
* 
*   Expose engines
*
*/

Noxkit.engines = engines

/**
*   Stringify an object to YAML or the specified language, and
*   append it to the given string. By default, only YAML and JSON
*   can be stringified. See the [engines](#engines) section to learn
*   how to stringify other languages.
*
*   ```js
*   console.log( Noxkit.stringify( 'foo bar', { title: 'Test Title' } ) )
*
*   //  results in:
*   //  ---
*   //  title: Test Title
*   //  ---
*   //  foo bar
*   ```
*   @param      {String|Object} `file` The content string to append to stringified front-Noxkit, or a file object with `file.content` string.
*   @param      {Object}        `data` Front Noxkit to stringify.
*   @param      {Object}        `options` [Options](#options) to pass to noxkit and [js-yaml].
*   @return     {String}        Returns a string created by wrapping stringified yaml with delimiters, and appending that to the given string.
*   @api        public
*/

Noxkit.stringify = function( file, data, options )
{
    if ( typeof file === 'string' ) file = Noxkit( file, options )
    return stringify( file, data, options )
}

/**
* 
*   Synchronously read a file from the file system and parse
*   front Noxkit. Returns the same object as the [main function](#Noxkit).
*
*   ```js
*   const file = Noxkit.read('./content/blog-post.md')
*   ```
*   @param      {String}    `filepath` file path of the file to read.
*   @param      {Object}    `options` [Options](#options) to pass to noxkit.
*   @return     {Object}    Returns [an object](#returned-object) with `data` and `content`
*   @api        public
*
*/

Noxkit.read = function( filePath, options )
{
    const str       = fs.readFileSync( filePath, 'utf8' )
    const file      = Noxkit( str, options )
    file.path       = filePath

    return file
}

/**
* 
*   Returns true if the given `string` has front Noxkit.
*
*   @param      {String}    `string`
*   @param      {Object}    `options`
*   @return     {Boolean}   True if front Noxkit exists.
*   @api        public
*
*/

Noxkit.test = function( str, options )
{
    return utils.startsWith( str, defaults( options ).delims[ 0 ] )
}

/**
* 
*   Detect the language to use, if one is defined after the
*   first front-Noxkit delimiter.
*
*   @param      {String}    `string`
*   @param      {Object}    `options`
*   @return     {Object}    Object with `raw` (actual language string), and `name`, the language with whitespace trimmed
*
*/

Noxkit.language = function( str, options )
{
    const opts  = defaults( options )
    const open  = opts.delims[ 0 ]

    if ( Noxkit.test( str ) )
        str = str.slice( open.length )

    const lang = str.slice( 0, str.search( /\r?\n/ ) )
    return {
        raw:    lang,
        name:   lang ? lang.trim( ) : ''
    }
}

/**
* 
*   Expose `Noxkit`
*
*/

Noxkit.cache = { }
Noxkit.clearCache = function( )
{
    Noxkit.cache = { }
}

module.exports = Noxkit