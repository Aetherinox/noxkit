declare function Noxkit< In extends Noxkit.Data, Out extends Noxkit.NoxOption< In, Out > >( input: In | { content: In }, options?: Out ): Noxkit.NoxFile< In >

declare namespace Noxkit
{
    type Data = string | Buffer

    interface NoxOption< In extends Data, Out extends NoxOption< In, Out > >
    {
        parser?:            ( ) => void
        result?:            boolean | ( ( input: In, options: Out ) => string )
        result_sep?:        string
        lang?:              string
        delims?:            string | [ string, string ]
        engines?:
        {
            [ index:        string ]:
            | ( ( input:    string ) => object )
            | { parse:      ( input: string ) => object; stringify?: ( data: object ) => string }
        }
    }

    interface NoxFile< In extends Data >
    {
        data:           { [ key: string ]: any }
        content:        string
        result?:        string
        orig:           Buffer | In
        lang:           string
        Noxkit:         string

        stringify( lang: string ): string
    }
  
  /**
   *    Detect the language to use, if one is defined after the
   *    first front-Noxkit delimiter.
   * 
   *    @param      {String}    `string`
   *    @param      {Object}    `options`
   *    @return     {String}    Markdown body content
   */
    
    export function stringify< Out extends NoxOption< string, Out > >
    (
        file:           string | { content: string },
        data:           object,
        options?:       NoxOption< string, Out >
    ): string

  /**
   *    Detect the language to use, if one is defined after the
   *    first front-Noxkit delimiter.
   * 
   *    @param      {String}    `string`
   *    @param      {Object}    `options`
   *    @return     {Object}    Object with `raw` (actual language string), and `name`, the language with whitespace trimmed
   */

    export function lang< Out extends Noxkit.NoxOption< string, Out > >
    (
        str:            string,
        options?:       NoxOption< string, Out >
        
    ): { name:          string; raw: string }
}

export = Noxkit