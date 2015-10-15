/**
 * @fileoverview Disallow bare modifiers in React classNames.
 * @author Thai Pangsakulyanont
 * @copyright 2015 Thai Pangsakulyanont. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/bem-no-bare-modifier"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("bem-no-bare-modifier", rule, {

    valid: [
        {
            code: "var x = <span className='tw-kitten --meow'></span>",
            filename: 'meoww.js',
            parser: "babel-eslint",
        },
        {
            code: "var x = <span data-irrelevant='--meow'></span>",
            filename: 'meoww.js',
            parser: "babel-eslint",
        },
    ],

    invalid: [
        {
            code: "var x = <span className='--meow'></span>",
            filename: 'meoww.js',
            errors: [{
                message: "BEM modifier must be used in conjunction with block or element."
            }],
            parser: "babel-eslint",
        }
    ]
});
