/**
 * @fileoverview Disallows Reflux.listenTo in favor of withRefluxStore
 * @author Thai Pangsakulyanont
 * @copyright 2015 Thai Pangsakulyanont. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-reflux-listen-to"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-reflux-listen-to", rule, {

    valid: [
        {
            code: "Reflux.listen(UserStore.store, function () { })"
        }
    ],

    invalid: [
        {
            code: "Reflux.listenTo(UserStore.store, 'onUserStoreChange')",
            errors: [{
            }]
        }
    ]
});
