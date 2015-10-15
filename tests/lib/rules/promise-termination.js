/**
 * @fileoverview Ensure that a promise is either returned or ended with done.
 * @author Thai Pangsakulyanont
 * @copyright 2015 Thai Pangsakulyanont. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/promise-termination"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("promise-termination", rule, {

    valid: [
        {
            code: "queryDatabase().then(function () { }).done();",
        },
        {
            code: "function x() { return; }",
        },
        {
            code: "function x() { return queryDatabase().then(function () { }); };",
        },
    ],

    invalid: [
        {
            code: "queryDatabase().then(function () { });",
            errors: [{
                message: "A promise chain should either be returned or ended with `.done()`.",
            }],
        },
        {
            code: "function x() { return queryDatabase().then(function () { }).done(); };",
            errors: [{
                message: "A promise chain ended with `.done()` should not be returned.",
            }],
        },
    ]
});
